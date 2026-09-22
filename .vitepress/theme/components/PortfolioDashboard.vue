<template>
  <div class="portfolio-container">
    <!-- 顶部状态栏 -->
    <div class="header-banner">
      <div class="banner-title">
        <h2>实盘资产看板 & 交易复盘</h2>
        <span class="subtitle">美股 ($) · 港股 (HK$) 独立核算 · 跨账户自动汇率折算</span>
      </div>
      <div class="quote-status">
        <span class="status-dot" :class="{ active: isLiveConnected }"></span>
        <span class="status-text">{{ statusText }}</span>
        <button class="refresh-btn" :disabled="isLoadingQuotes" @click="fetchLiveQuotes">
          <span :class="{ spinning: isLoadingQuotes }">🔄</span> 刷新行情
        </button>
      </div>
    </div>

    <!-- 核心数据汇总卡片 (支持多账户分币种) -->
    <div class="metrics-grid">
      <!-- 1. 总资产折算 (USD) -->
      <div class="metric-card primary">
        <div class="card-label">总资产净值 (折USD)</div>
        <div class="card-value">{{ formatCurrency(currentTotalAsset, 'USD') }}</div>
        <div class="card-meta" :class="dailyAssetDiff >= 0 ? 'up' : 'down'">
          今日变动: {{ dailyAssetDiff >= 0 ? '+' : '-' }}{{ formatMoney(dailyAssetDiff) }} ({{ dailyAssetPercent }})
        </div>
        <div class="card-sub">汇率基准: 1 USD ≈ {{ usdHkdRate }} HKD</div>
      </div>

      <!-- 2. Schwab 美元账户 -->
      <div class="metric-card">
        <div class="card-label">
          Schwab 美股账户 <span class="badge usd">USD</span>
        </div>
        <div class="card-value">{{ formatCurrency(latestSnapshot.schwab, 'USD') }}</div>
        <div class="card-meta">
          占比: {{ calcShare(latestSnapshot.schwab) }}% (主力美股指数/ETF)
        </div>
      </div>

      <!-- 3. 长桥美股账户 -->
      <div class="metric-card">
        <div class="card-label">
          长桥美股账户 <span class="badge usd">USD</span>
        </div>
        <div class="card-value">{{ formatCurrency(latestSnapshot.longbridgeUS, 'USD') }}</div>
        <div class="card-meta">
          占比: {{ calcShare(latestSnapshot.longbridgeUS) }}% (美股波段)
        </div>
      </div>

      <!-- 4. 长桥港股账户 (独立HK$) -->
      <div class="metric-card">
        <div class="card-label">
          长桥港股账户 <span class="badge hkd">HKD</span>
        </div>
        <div class="card-value hk-value">{{ formatCurrency(latestSnapshot.longbridgeHK, 'HKD') }}</div>
        <div class="card-meta">
          折合: ≈ {{ formatCurrency(latestSnapshot.longbridgeHK / usdHkdRate, 'USD') }}
          ({{ calcShare(latestSnapshot.longbridgeHK / usdHkdRate) }}%)
        </div>
      </div>

      <!-- 5. 实时持仓浮盈 -->
      <div class="metric-card">
        <div class="card-label">实时持仓浮动盈亏</div>
        <div class="pnl-group">
          <div class="pnl-row" :class="totalUsUnrealizedPnl >= 0 ? 'up' : 'down'">
            <span class="pnl-tag">美股:</span>
            <strong>{{ totalUsUnrealizedPnl >= 0 ? '+' : '' }}{{ formatCurrency(totalUsUnrealizedPnl, 'USD') }}</strong>
          </div>
          <div class="pnl-row" :class="totalHkUnrealizedPnl >= 0 ? 'up' : 'down'">
            <span class="pnl-tag">港股:</span>
            <strong>{{ totalHkUnrealizedPnl >= 0 ? '+' : '' }}{{ formatCurrency(totalHkUnrealizedPnl, 'HKD') }}</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- ECharts 图表区域 -->
    <div class="charts-section">
      <div class="chart-box">
        <div class="chart-header">
          <h3>📈 资产净值走势曲线 (Equity Curve)</h3>
          <span class="chart-tag">港股已按 {{ usdHkdRate }} 汇率折算统一度量</span>
        </div>
        <div ref="lineChartRef" class="chart-canvas"></div>
      </div>

      <div class="chart-box pie-box">
        <div class="chart-header">
          <h3>🥧 账户资产分布</h3>
        </div>
        <div ref="pieChartRef" class="chart-canvas"></div>
      </div>
    </div>

    <!-- 实时持仓监控明细 -->
    <div class="section-box">
      <div class="section-header">
        <h3>📊 活跃持仓实时监控</h3>
        <span class="section-desc">自动拉取最新市价与涨跌幅，自动匹配计价币种（美股 $ / 港股 HK$）</span>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>标的代码</th>
              <th>标的名称</th>
              <th>归属账户</th>
              <th>币种</th>
              <th>持仓股数</th>
              <th>持仓成本</th>
              <th>实时现价</th>
              <th>当日涨跌</th>
              <th>持仓市值</th>
              <th>浮动盈亏</th>
              <th>止损 / 止盈</th>
              <th>操作备忘</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in holdingsDisplay" :key="item.symbol">
              <td class="symbol-col">
                <strong>{{ item.symbol }}</strong>
              </td>
              <td>{{ item.name }}</td>
              <td>
                <span class="account-tag" :class="getAccountClass(item.account)">
                  {{ item.account }}
                </span>
              </td>
              <td>
                <span class="badge" :class="item.currency.toLowerCase()">{{ item.currency }}</span>
              </td>
              <td>{{ item.shares }}</td>
              <td>{{ formatCurrency(item.costPrice, item.currency) }}</td>
              <td class="price-col">
                <span v-if="item.livePrice !== null" :class="item.changePercent >= 0 ? 'up' : 'down'">
                  {{ formatCurrency(item.livePrice, item.currency) }}
                </span>
                <span v-else class="loading-text">加载中...</span>
              </td>
              <td :class="item.changePercent >= 0 ? 'up' : 'down'">
                <span v-if="item.changePercent !== null">
                  {{ item.changePercent >= 0 ? '+' : '' }}{{ item.changePercent.toFixed(2) }}%
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="item.marketValue !== null">
                  {{ formatCurrency(item.marketValue, item.currency) }}
                </span>
                <span v-else>-</span>
              </td>
              <td :class="item.unrealizedPnl >= 0 ? 'up' : 'down'">
                <div v-if="item.unrealizedPnl !== null">
                  <strong>{{ item.unrealizedPnl >= 0 ? '+' : '' }}{{ formatCurrency(item.unrealizedPnl, item.currency) }}</strong>
                  <div class="sub-percent">
                    ({{ item.unrealizedPercent >= 0 ? '+' : '' }}{{ item.unrealizedPercent.toFixed(2) }}%)
                  </div>
                </div>
                <span v-else>-</span>
              </td>
              <td>
                <div class="strategy-targets">
                  <span v-if="item.stopLoss" class="sl-tag">止损 {{ item.stopLoss }}</span>
                  <span v-if="item.targetPrice" class="tp-tag">止盈 {{ item.targetPrice }}</span>
                  <span v-if="!item.stopLoss && !item.targetPrice" class="text-muted">-</span>
                </div>
              </td>
              <td class="note-col">{{ item.note || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 交易记录与每日复盘日志 -->
    <div class="bottom-grid">
      <!-- 最近买卖流水 -->
      <div class="section-box">
        <div class="section-header">
          <h3>⚡ 最近买卖操作流水</h3>
        </div>
        <div class="trades-list">
          <div v-for="(trade, idx) in portfolioData.trades" :key="idx" class="trade-item">
            <div class="trade-top">
              <span class="trade-date">{{ trade.date }}</span>
              <span class="account-tag" :class="getAccountClass(trade.account)">{{ trade.account }}</span>
              <span class="trade-badge" :class="trade.action.toLowerCase()">{{ trade.action }}</span>
              <strong class="trade-symbol">{{ trade.symbol }}</strong>
              <span class="trade-detail">
                {{ formatCurrency(trade.price, trade.currency || 'USD') }} × {{ trade.shares }} 股
              </span>
              <span v-if="trade.realizedPnl !== undefined" class="trade-pnl" :class="trade.realizedPnl >= 0 ? 'up' : 'down'">
                {{ trade.realizedPnl >= 0 ? '+' : '' }}{{ formatCurrency(trade.realizedPnl, trade.currency || 'USD') }}
              </span>
              <span v-if="trade.tag" class="trade-tag">{{ trade.tag }}</span>
            </div>
            <div v-if="trade.note" class="trade-note">💡 {{ trade.note }}</div>
          </div>
        </div>
      </div>

      <!-- 每日复盘打卡与纪律反思 -->
      <div class="section-box">
        <div class="section-header">
          <h3>📝 每日复盘与纪律打卡</h3>
        </div>
        <div class="daily-notes-list">
          <div v-for="(snap, idx) in reverseEquityHistory" :key="idx" class="daily-note-item">
            <div class="daily-note-header">
              <strong class="daily-date">{{ snap.date }}</strong>
              <span class="daily-equity">总资产: {{ formatCurrency(calcSnapshotTotalUSD(snap), 'USD') }}</span>
            </div>
            <div class="daily-accounts-breakdown">
              <span>Schwab: {{ formatCurrency(snap.schwab, 'USD') }}</span>
              <span>长桥美: {{ formatCurrency(snap.longbridgeUS, 'USD') }}</span>
              <span>长桥港: {{ formatCurrency(snap.longbridgeHK, 'HKD') }}</span>
            </div>
            <div class="daily-note-body">
              {{ snap.note || '今日按计划持有，暂无特殊变动。' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { portfolioData, type DailySnapshot, type HoldingPosition } from '../../../finance/portfolio-data'

// 汇率与图表引用
const usdHkdRate = portfolioData.defaultUsdHkdRate || 7.80
const lineChartRef = ref<HTMLDivElement | null>(null)
const pieChartRef = ref<HTMLDivElement | null>(null)
let lineChartInstance: any = null
let pieChartInstance: any = null

const isLiveConnected = ref(false)
const isLoadingQuotes = ref(false)
const statusText = ref('正在连接实时行情...')
const liveQuoteData = ref<Record<string, { price: number; changePercent: number }>>({})

// 货币与金额格式化
const formatMoney = (val: number | undefined | null) => {
  if (val === undefined || val === null || isNaN(val)) return '0.00'
  return Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatCurrency = (val: number | undefined | null, currency: 'USD' | 'HKD' | string = 'USD') => {
  const prefix = currency === 'HKD' ? 'HK$' : '$'
  if (val === undefined || val === null || isNaN(val)) return `${prefix}0.00`
  const formatted = Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return `${prefix}${formatted}`
}

// 账户样式分类
const getAccountClass = (acc: string) => {
  if (acc.includes('港')) return 'account-hk'
  if (acc.includes('美')) return 'account-us'
  return 'account-schwab'
}

// 计算单日快照的总资产折算 (USD)
const calcSnapshotTotalUSD = (snap: DailySnapshot) => {
  if (snap.totalUSD !== undefined) return snap.totalUSD
  const rate = snap.usdHkdRate || usdHkdRate
  const hkInUSD = (snap.longbridgeHK || 0) / rate
  return (snap.schwab || 0) + (snap.longbridgeUS || 0) + hkInUSD
}

// 最新快照
const latestSnapshot = computed(() => {
  const history = portfolioData.equityHistory
  return history[history.length - 1] || { date: '', schwab: 0, longbridgeUS: 0, longbridgeHK: 0 }
})

// 当前总资产 (USD)
const currentTotalAsset = computed(() => calcSnapshotTotalUSD(latestSnapshot.value))

// 计算资产占比
const calcShare = (valInUSD: number) => {
  if (!currentTotalAsset.value || currentTotalAsset.value === 0) return '0.0'
  return ((valInUSD / currentTotalAsset.value) * 100).toFixed(1)
}

// 昨日快照与日变动
const dailyAssetDiff = computed(() => {
  const history = portfolioData.equityHistory
  if (history.length < 2) return 0
  const prev = history[history.length - 2]
  const prevTotal = calcSnapshotTotalUSD(prev)
  return currentTotalAsset.value - prevTotal
})

const dailyAssetPercent = computed(() => {
  const history = portfolioData.equityHistory
  if (history.length < 2) return '0.00%'
  const prev = history[history.length - 2]
  const prevTotal = calcSnapshotTotalUSD(prev)
  if (prevTotal === 0) return '0.00%'
  const pct = (dailyAssetDiff.value / prevTotal) * 100
  return (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%'
})

// 倒序展示每日复盘
const reverseEquityHistory = computed(() => {
  return [...portfolioData.equityHistory].reverse()
})

// 持仓数据与实时行情融合
const holdingsDisplay = computed(() => {
  return portfolioData.holdings.map((h) => {
    const live = liveQuoteData.value[h.apiSymbol]
    const livePrice = live ? live.price : null
    const changePercent = live ? live.changePercent : null
    let marketValue: number | null = null
    let unrealizedPnl: number | null = null
    let unrealizedPercent: number | null = null

    if (livePrice !== null && h.shares > 0) {
      marketValue = livePrice * h.shares
      const cost = h.costPrice * h.shares
      unrealizedPnl = marketValue - cost
      unrealizedPercent = ((livePrice - h.costPrice) / h.costPrice) * 100
    }

    return {
      ...h,
      livePrice,
      changePercent,
      marketValue,
      unrealizedPnl,
      unrealizedPercent
    }
  })
})

// 分别计算美股与港股的持仓浮动盈亏
const totalUsUnrealizedPnl = computed(() => {
  return holdingsDisplay.value
    .filter((h) => h.currency === 'USD')
    .reduce((sum, h) => sum + (h.unrealizedPnl || 0), 0)
})

const totalHkUnrealizedPnl = computed(() => {
  return holdingsDisplay.value
    .filter((h) => h.currency === 'HKD')
    .reduce((sum, h) => sum + (h.unrealizedPnl || 0), 0)
})

// 获取实时行情 (腾讯财经 API，免鉴权，无 CORS 限制)
const fetchLiveQuotes = async () => {
  isLoadingQuotes.value = true
  statusText.value = '正在拉取实时行情...'
  const symbols = portfolioData.holdings.map((h) => h.apiSymbol)

  try {
    const res = await fetch(`https://qt.gtimg.cn/q=${symbols.join(',')}`)
    const buffer = await res.arrayBuffer()
    const decoder = new TextDecoder('gbk')
    const text = decoder.decode(buffer)

    const lines = text.split(';')
    const quoteMap: Record<string, { price: number; changePercent: number }> = {}

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed) return
      const match = trimmed.match(/v_([a-zA-Z0-9_]+)="([^"]+)"/)
      if (match) {
        const symbolKey = match[1]
        const fields = match[2].split('~')
        const price = parseFloat(fields[3])
        const changePercent = parseFloat(fields[32])
        if (!isNaN(price)) {
          quoteMap[symbolKey] = {
            price,
            changePercent: isNaN(changePercent) ? 0 : changePercent
          }
        }
      }
    })

    liveQuoteData.value = quoteMap
    isLiveConnected.value = true
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    statusText.value = `实时行情已同步 (${timeStr})`
  } catch (err) {
    console.error('获取股票行情失败:', err)
    statusText.value = '行情获取异常，请检查网络'
    isLiveConnected.value = false
  } finally {
    isLoadingQuotes.value = false
  }
}

// 初始化 ECharts
const initCharts = async () => {
  const echarts = await import('echarts')

  const isDark = document.documentElement.classList.contains('dark')
  const textColor = isDark ? '#a6b0c3' : '#4b5563'
  const gridLineColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'
  const cardBg = isDark ? '#1e1e22' : '#ffffff'

  // 1. 折线图
  if (lineChartRef.value) {
    lineChartInstance = echarts.init(lineChartRef.value)
    const dates = portfolioData.equityHistory.map((d) => d.date.slice(5)) // MM-DD
    const totalData = portfolioData.equityHistory.map((d) => calcSnapshotTotalUSD(d).toFixed(2))
    const schwabData = portfolioData.equityHistory.map((d) => d.schwab.toFixed(2))
    const longbridgeUsData = portfolioData.equityHistory.map((d) => d.longbridgeUS.toFixed(2))
    const longbridgeHkInUsdData = portfolioData.equityHistory.map((d) => {
      const rate = d.usdHkdRate || usdHkdRate
      return (d.longbridgeHK / rate).toFixed(2)
    })

    const lineOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: cardBg,
        borderColor: isDark ? '#333' : '#e5e7eb',
        textStyle: { color: isDark ? '#fff' : '#111' },
        formatter: (params: any[]) => {
          let html = `<div style="font-weight:bold;margin-bottom:6px;">${params[0].name}</div>`
          params.forEach((item) => {
            let extra = ''
            if (item.seriesName === '长桥港股 (折USD)') {
              const idx = params[0].dataIndex
              const origHk = portfolioData.equityHistory[idx].longbridgeHK
              extra = ` <span style="font-size:0.75rem;opacity:0.8;">(原币: HK$${Number(origHk).toLocaleString('en-US')})</span>`
            }
            html += `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin:2px 0;">
              <span>${item.marker} ${item.seriesName}:</span>
              <strong>$${Number(item.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}${extra}</strong>
            </div>`
          })
          return html
        }
      },
      legend: {
        data: ['总资产 (折USD)', 'Schwab ($)', '长桥美股 ($)', '长桥港股 (折USD)'],
        textStyle: { color: textColor },
        top: 0
      },
      grid: {
        left: '2%',
        right: '3%',
        bottom: '8%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: textColor } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        scale: true,
        name: 'USD ($)',
        nameTextStyle: { color: textColor },
        axisLabel: { color: textColor },
        splitLine: { lineStyle: { color: gridLineColor } }
      },
      series: [
        {
          name: '总资产 (折USD)',
          type: 'line',
          data: totalData,
          smooth: true,
          symbolSize: 7,
          itemStyle: { color: '#3b82f6' },
          lineStyle: { width: 3 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.35)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.02)' }
            ])
          }
        },
        {
          name: 'Schwab ($)',
          type: 'line',
          data: schwabData,
          smooth: true,
          itemStyle: { color: '#10b981' },
          lineStyle: { width: 2, type: 'dashed' }
        },
        {
          name: '长桥美股 ($)',
          type: 'line',
          data: longbridgeUsData,
          smooth: true,
          itemStyle: { color: '#f59e0b' },
          lineStyle: { width: 2, type: 'dashed' }
        },
        {
          name: '长桥港股 (折USD)',
          type: 'line',
          data: longbridgeHkInUsdData,
          smooth: true,
          itemStyle: { color: '#8b5cf6' },
          lineStyle: { width: 2, type: 'dashed' }
        }
      ]
    }
    lineChartInstance.setOption(lineOption)
  }

  // 2. 饼图
  if (pieChartRef.value) {
    pieChartInstance = echarts.init(pieChartRef.value)
    const hkInUsd = latestSnapshot.value.longbridgeHK / (latestSnapshot.value.usdHkdRate || usdHkdRate)
    const pieOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${params.name}: $${Number(params.value).toLocaleString('en-US', { minimumFractionDigits: 2 })} (${params.percent}%)`
      },
      legend: {
        bottom: '2%',
        textStyle: { color: textColor }
      },
      series: [
        {
          name: '账户分布',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: isDark ? '#1a1a1e' : '#fff',
            borderWidth: 2
          },
          label: { show: false },
          data: [
            { value: latestSnapshot.value.schwab, name: 'Schwab 美股', itemStyle: { color: '#10b981' } },
            { value: latestSnapshot.value.longbridgeUS, name: '长桥美股', itemStyle: { color: '#f59e0b' } },
            { value: hkInUsd, name: '长桥港股 (折USD)', itemStyle: { color: '#8b5cf6' } }
          ]
        }
      ]
    }
    pieChartInstance.setOption(pieOption)
  }
}

// 窗口自适应
const handleResize = () => {
  lineChartInstance?.resize()
  pieChartInstance?.resize()
}

onMounted(() => {
  fetchLiveQuotes()
  nextTick(() => {
    initCharts()
    window.addEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  lineChartInstance?.dispose()
  pieChartInstance?.dispose()
})
</script>

<style scoped>
.portfolio-container {
  margin: 1.5rem 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 顶部状态栏 */
.header-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.banner-title h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.banner-title .subtitle {
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
  margin-top: 4px;
  display: block;
}

.quote-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
}

.status-dot.active {
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

.refresh-btn {
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.refresh-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.spinning {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 核心汇总卡片 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.metric-card.primary {
  border-color: rgba(59, 130, 246, 0.4);
  background: linear-gradient(145deg, var(--vp-c-bg-soft), rgba(59, 130, 246, 0.06));
}

.card-label {
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.card-value.hk-value {
  color: #8b5cf6;
}

.card-meta {
  margin-top: 8px;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.card-sub {
  margin-top: 4px;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.pnl-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.pnl-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
}

.pnl-tag {
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
}

/* 标签角标 */
.badge {
  display: inline-block;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.68rem;
  font-weight: 600;
}

.badge.usd {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.badge.hkd {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

/* 红绿配色 */
.up {
  color: #10b981 !important;
  font-weight: 600;
}

.down {
  color: #ef4444 !important;
  font-weight: 600;
}

/* 图表区域 */
.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 900px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

.chart-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.chart-tag {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.chart-canvas {
  width: 100%;
  height: 280px;
}

/* 数据表格区 */
.section-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.section-header {
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.section-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  text-align: left;
}

.data-table th {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border-bottom: 2px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-weight: 600;
  white-space: nowrap;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.symbol-col {
  color: var(--vp-c-brand-1);
}

.account-tag {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.74rem;
  font-weight: 500;
}

.account-schwab {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.account-us {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}

.account-hk {
  background: rgba(139, 92, 246, 0.12);
  color: #8b5cf6;
}

.sub-percent {
  font-size: 0.75rem;
  opacity: 0.85;
}

.strategy-targets {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sl-tag {
  font-size: 0.72rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 1px 4px;
  border-radius: 3px;
}

.tp-tag {
  font-size: 0.72rem;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  padding: 1px 4px;
  border-radius: 3px;
}

.note-col {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  max-width: 180px;
}

/* 底部双列 */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 900px) {
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

.trades-list, .daily-notes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.trade-item {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.trade-top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.85rem;
}

.trade-date {
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
}

.trade-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: bold;
}

.trade-badge.buy {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.trade-badge.sell {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.trade-tag {
  font-size: 0.72rem;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
}

.trade-note {
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.daily-note-item {
  padding: 10px 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.daily-note-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.daily-date {
  color: var(--vp-c-brand-1);
}

.daily-equity {
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 0.84rem;
}

.daily-accounts-breakdown {
  display: flex;
  gap: 12px;
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.daily-note-body {
  font-size: 0.84rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}
</style>

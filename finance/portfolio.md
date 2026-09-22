---
title: 实盘与资产复盘
outline: [2, 3]
---

# 每日实盘与资产复盘看板

> **💡 交易座右铭**：  
> **市场是检验认知的唯一标准。券商记录数字，而我们记录认知、逻辑与纪律。**

---

<!-- 核心实盘看板组件 (支持客户端渲染、动态拉取行情与ECharts交互) -->
<ClientOnly>
  <PortfolioDashboard />
</ClientOnly>

---

## 📖 每日极速记录指南

你无需在这个页面手动绘制表格或手算价格，所有数据均统一收拢在配置文件中：

👉 **数据文件路径**：`finance/portfolio-data.ts`

### 1. 每日资产净值打卡（生成净值曲线）
每天美股/港股收盘后，打开 `finance/portfolio-data.ts`，在 `equityHistory` 数组末尾复制追加一行：

```ts
{
  date: '2026-09-22',          // 日期
  schwab: 135.1,               // Schwab 美股净值 ($)
  longbridgeUS: 220,           // 长桥美股净值 ($)
  longbridgeHK: 111000,        // 长桥港股净值 (HK$) - 系统会自动按 7.8 汇率折算统一度量
  note: '大盘冲高回落，按计划守住底仓，心态平和' // 今日复盘/情绪自评
}
```

### 2. 追踪持仓标的（自动抓取现价与算浮盈）
在 `holdings` 数组中添加或调整当前持有的标的。页面每次打开都会自动从实时行情接口拉取现价：

```ts
{
  symbol: '07747',            // 代码
  apiSymbol: 'hk07747',       // 行情代码: 美股以 us 开头，港股以 hk 开头 (如 usTQQQ, usAAOX, hk07747)
  name: '南方两倍做多三星 ETF',// 中文名
  account: '长桥港股',         // 归属账户: Schwab / 长桥美股 / 长桥港股
  currency: 'HKD',            // 计价币种: USD 或 HKD
  costPrice: 81.0,            // 买入均价
  shares: 100,                // 持股数量 (已清仓填 0)
  stopLoss: 78.5,             // 预设止损
  note: '波段策略'
}
```

### 3. 买卖操作流水（记录已实现盈亏与纪律反思）
在 `trades` 数组中追加买卖流水：

```ts
{
  date: '2026-09-21',
  account: '长桥',
  symbol: 'AAOX',
  action: 'SELL',             // BUY 或 SELL
  price: 11.0,                // 成交价
  shares: 80,                 // 数量
  realizedPnl: 40,            // 本次平仓已实现利润 ($)
  currency: 'USD',
  tag: '分批止盈',             // 标签: 突破买入 / 分批止盈 / 破位止损 / 定投
  note: '达到第一阻力位分批落袋'
}
```

### 4. 自动同步发布
在 VS Code 中修改并保存后，直接在根目录双击运行 **`一键更新并发布.bat`**，你的云端维基就会在 1 分钟内自动部署更新！

/**
 * 实盘与资产复盘数据源
 * 每天在 VS Code 里记录实盘时，只需在此文件追加对应记录即可，页面会自动刷新与计算。
 * 
 * 💡 账户与币种规范：
 * - Schwab: 美元账户，计价单位 $ (USD)
 * - 长桥美股: 美元账户，计价单位 $ (USD)
 * - 长桥港股: 港元账户，计价单位 HK$ (HKD)
 * - 系统会自动按港美联系汇率 (默认 7.80) 将港币折算为美元汇总总资产。
 */

export interface DailySnapshot {
  date: string // 格式: YYYY-MM-DD
  schwab: number // Schwab 美元净值 ($)
  longbridgeUS: number // 长桥美股账户净值 ($)
  longbridgeHK: number // 长桥港股账户净值 (HK$)
  usdHkdRate?: number // 港元兑美元汇率，默认 7.80 (即 1 USD = 7.80 HKD)
  totalUSD?: number // 总资产折算 (USD)，若不填写则系统自动按汇率汇总
  note?: string // 当日复盘随笔 / 纪律打卡
}

export interface HoldingPosition {
  symbol: string // 股票代码，如 TQQQ, AAOX, 07747
  apiSymbol: string // 行情接口代码: 美股加 "us", 港股加 "hk"，如 usTQQQ, usAAOX, hk07747
  name: string // 标的中文名称
  account: 'Schwab' | '长桥美股' | '长桥港股' | string // 所在券商细分账户
  currency: 'USD' | 'HKD' // 计价币种: 美股用 USD($)，港股用 HKD(HK$)
  costPrice: number // 持仓均价
  shares: number // 当前持股数量 (若已清仓可填 0)
  stopLoss?: number // 预设止损价
  targetPrice?: number // 预设止盈价
  note?: string // 交易逻辑与策略备忘
}

export interface TradeRecord {
  date: string // 交易日期 (YYYY-MM-DD)
  account: 'Schwab' | '长桥美股' | '长桥港股' | string
  symbol: string
  name?: string
  action: 'BUY' | 'SELL'
  price: number // 成交价
  shares: number // 成交数量
  realizedPnl?: number // 本次卖出已实现盈亏 (根据 currency 为 $ 或 HK$)
  currency: 'USD' | 'HKD'
  tag?: '突破买入' | '分批止盈' | '破位止损' | '网格交易' | '定投' | '1分线做T' | '冲动单' | string // 策略标签
  note?: string // 操作理由与复盘反思
}

export interface PortfolioData {
  baseCurrency: 'USD'
  defaultUsdHkdRate: number // 默认港美汇率
  equityHistory: DailySnapshot[] // 历史净值打卡
  holdings: HoldingPosition[] // 当前持仓监控
  trades: TradeRecord[] // 买卖操作流水
}

export const portfolioData: PortfolioData = {
  baseCurrency: 'USD',
  defaultUsdHkdRate: 7.80,

  // 1. 每日净值记录（折线图历史走势）
  // 提示：Schwab 和 长桥美股填美元 ($)，长桥港股填港币 (HK$)
  equityHistory: [
    {
      date: '2026-09-14',
      schwab: 127.4,
      longbridgeUS: 800,
      longbridgeHK: 95000,
      note: '纳指建仓持有；长桥港股建仓'
    },
    {
      date: '2026-09-21',
      schwab: 135.1,
      longbridgeUS: 1900, 
      longbridgeHK: 96342.77,
      note: '长桥港股卖出一半07747；长桥美股AAOX日内t80股锁定+$40利润'
    }
  ],

  // 2. 当前持仓标的（支持实时拉取行情）
  holdings: [
    {
      symbol: 'TQQQ',
      apiSymbol: 'usTQQQ',
      name: '3倍做多纳指100 ETF',
      account: 'Schwab',
      currency: 'USD',
      costPrice: 68.205,
      shares: 0, // 当前已减仓观察，可按实际股数修改
      stopLoss: 75.905,
      note: '主升浪持有，移动止损保护'
    },
    {
      symbol: 'AAOX',
      apiSymbol: 'usAAOX',
      name: '2倍做多应用光电 ETF',
      account: '长桥美股',
      currency: 'USD',
      costPrice: 13.718,
      shares: 400, 
      stopLoss: 10.2,
      targetPrice: 15,
      note: '回本减仓波段策略，底仓留守'
    },
    {
      symbol: '07747',
      apiSymbol: 'hk07747',
      name: '南方两倍做多三星 ETF',
      account: '长桥港股',
      currency: 'HKD',
      costPrice: 160.12,
      shares: 100, // 已在 83.6 减半
      note: '83.6 减半，等待下一次回调机会'
    }
  ],

  // 3. 交易操作日志与复盘
  trades: [
    {
      date: '2026-09-21',
      account: '长桥美股',
      symbol: 'AAOX',
      name: '2倍做多应用光电',
      action: 'SELL',
      price: 11.0,
      shares: 80,
      realizedPnl: 40,
      currency: 'USD',
      tag: '分批止盈',
      note: '买入成本 10.5 100股 ，日内拉升位减仓 80 股锁定利润'
    },
    {
      date: '2026-09-21',
      account: '长桥港股',
      symbol: '07747',
      name: '南方两倍做多三星',
      action: 'SELL',
      price: 83.6,
      shares: 100,
      realizedPnl: 374,
      currency: 'HKD',
      tag: '分批止盈',
      note: '成本 79.86，冲高 83.6 全部止盈落袋'
    },
    {
      date: '2026-09-15',
      account: '长桥美股',
      symbol: 'AAOX',
      name: '2倍做多应用光电',
      action: 'BUY',
      price: 10.5,
      shares: 100,
      currency: 'USD',
      tag: '突破买入',
      note: '突破放量关键位建立观察仓'
    },
    {
      date: '2026-08-10',
      account: 'Schwab',
      symbol: 'TQQQ',
      name: '3倍做多纳指100',
      action: 'BUY',
      price: 68.205,
      shares: 1,
      currency: 'USD',
      tag: '定投',
      note: '右侧均线多头排列，分批建仓纳指杠杆'
    }
  ]
}

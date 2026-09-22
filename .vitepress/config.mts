import { defineConfig } from 'vitepress'
import vexGrammar from './vex.json'
import mathjax3 from 'markdown-it-mathjax3'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ben's Wiki",
  description: "My personal knowledge base",
  ignoreDeadLinks: true,
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        awaitWriteFinish: {
          stabilityThreshold: 500,
          pollInterval: 100
        },
        ignored: ['**/node_modules/**', '**/.git/**', '**/*.tmp']
      }
    }
  },
  markdown: {
    // 2. 告诉网站：嘿，我有自定义语言，去这里加载
    languages: [vexGrammar as any],
        theme: {
          name: 'my-custom-dark',
          type: 'dark',
          tokenColors: [
            // 1. 区分颜色：@Time 等变量 -> 亮绿色
            {
              scope: 'variable.other.vex',
              settings: { foreground: '#4EC9B0', fontStyle: 'bold' } 
            },
            // 2. 区分颜色：int, float 等类型 -> 亮蓝色
            {
              scope: 'storage.type.vex',
              settings: { foreground: '#569CD6' } 
            },
            // 3. 区分颜色：if, for 等控制 -> 粉紫色
            {
              scope: 'keyword.control.vex',
              settings: { foreground: '#C586C0' } 
            },
            // 4. 区分颜色：数字 -> 黄色
            {
              scope: 'constant.numeric.vex',
              settings: { foreground: '#DCDCAA' } 
            },
/* --- 2. 新增：通用编程颜色 (让 Python 也亮起来) --- */
        // 关键字 (if, import, def, from, return) -> 粉紫色
        { scope: ['keyword', 'storage.type', 'storage.modifier'], settings: { foreground: '#C586C0' } },
        
        // 字符串 (引号里的文字) -> 橙色
        { scope: 'string', settings: { foreground: '#CE9178' } },
        
        // 函数名 (hou.pwd, print) -> 黄色
        { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#DCDCAA' } },
        
        // 注释 ( # 获取当前 Python ) -> 绿色
        { scope: 'comment', settings: { foreground: '#6A9955', fontStyle: 'italic' } },
        
        // 类名/内置支持类型 -> 青绿色
        { scope: ['entity.name.type', 'support.type', 'support.class'], settings: { foreground: '#4EC9B0' } },
        
        // 数字 -> 浅绿色/黄色
        { scope: 'constant.numeric', settings: { foreground: '#B5CEA8' } }

   
      ]
    },
    config: (md) => {
      md.use(mathjax3)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: [2, 4],
      label: '本页大纲' 
      },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Python', 
        items:[
       {text: 'python',link: '/python/python' },
       {text: 'hda',link: '/python/hda/DoubleJumpClass' },
       {text: 'selfTools',link: '/python/selfTools/smoeSelfTools' },
          ]
      },
      { text: 'Godot Engine', link: '/godot/godotTips' },
      { text: 'UE Engine', link: '/UE/UETips' },
      { 
        text: 'Houdini FX',
        items:[
      { text: 'Houdini FX', link: '/houdini/HoudiniTips' },
      { text: 'Class', link: '/houdini/class/class' },
      { text: 'FinNotes', 
        items:[
        {text: 'GroceryShop',link: '/houdini/FinNotes/GroceryShop' },
        {text: 'Chop',link: '/houdini/FinNotes/Chop/chop' },
        {text: 'flip',link: '/houdini/FinNotes/flip/flip' },
        {text: 'uv',link: '/houdini/FinNotes/Uv/uv' },
        {text: 'rbd',link: '/houdini/FinNotes/rbd/rbd' },
        {text: 'render',link: '/houdini/FinNotes/Rendering/render'},
        {text: 'volume',link: '/houdini/FinNotes/Volume/volume'},
        {text: 'deform',link: '/houdini/FinNotes/deform/deform'},
        {text: 'hair',link: '/houdini/FinNotes/hair/hair'},
        {text: 'Optimise',link: '/houdini/FinNotes/Optimise/Optimise'},
        {text: 'vex',link: '/houdini/FinNotes/vex/vex'},
        {text: 'vellum',link: '/houdini/FinNotes/vellum/vellum'},
        {text: 'slover',link: '/houdini/FinNotes/slover/slover'},
        {text: 'others',link: '/houdini/others/others'},
          ]
        },
      { text: 'Projects', 
        items:[
                {text: 'Projects',link: '/houdini/项目案例/ProjectsAll' },]
        },
      ]
      },
      { text: 'Nuke', link: '/nuke/Nuke' },
      { text: 'ComfyUi', link: '/comfyui/comfyui' },
      { text: '投资笔记', link: '/finance/' },
    ],

    sidebar: {
      '/finance/': [
        {
          text: '投资与金融复盘',
          items: [
            { text: '体系总览', link: '/finance/' },
            { text: '市场宏观与复盘', link: '/finance/market' },
            { text: '个股与行业商业模式', link: '/finance/stock' },
            { text: '财务分析与估值模型', link: '/finance/analysis' }
          ]
        },
        {
          text: '实战记录与总结',
          items: [
            { text: '实盘与资产复盘', link: '/finance/portfolio' },
            { text: 'ETF 策略与配置', link: '/finance/etf' },
          ]
        },        
        {
          text: '课程学习',
          items: [
            { text: '经济机器是怎样运行的Ray Dalio', link: '/finance/经济机器是怎样运行的_知识点总结' },
          ]
        },
        {
          text: '与Ai的对话 / 体系沉淀',
          items: [
            { text: '炒股金融知识学习途径', link: '/finance/炒股金融知识学习途径' },
            { text: '实盘交易记录方法 (看板)', link: '/finance/portfolio' },
            { text: 'QQQ+VOO+SGOV策略与20年回测', link: '/finance/美股稳赢配置策略与20年回测手册' },
          ]
        }
      ],
      '/houdini/': [
        {
          text: 'Houdini FX',
          items: [
            { text: 'Houdini Tips', link: '/houdini/HoudiniTips' },
            { text: 'Class', link: '/houdini/class/class' },
            { 
              text: 'FinNotes',
              collapsed: false,
              items: [
                { text: 'Grocery Shop', link: '/houdini/FinNotes/GroceryShop' },
                { text: 'Chop', link: '/houdini/FinNotes/Chop/chop' },
                { text: 'flip', link: '/houdini/FinNotes/flip/flip' },
                { text: 'uv', link: '/houdini/FinNotes/Uv/uv' },
                { text: 'rbd', link: '/houdini/FinNotes/rbd/rbd' },
                { text: 'render', link: '/houdini/FinNotes/Rendering/render' },
                { text: 'volume', link: '/houdini/FinNotes/Volume/volume' },
                { text: 'deform', link: '/houdini/FinNotes/deform/deform' },
                { text: 'hair', link: '/houdini/FinNotes/hair/hair' },
                { text: 'Optimise', link: '/houdini/FinNotes/Optimise/Optimise' },
                { text: 'vex', link: '/houdini/FinNotes/vex/vex' },
                { text: 'vellum', link: '/houdini/FinNotes/vellum/vellum' },
                { text: 'slover', link: '/houdini/FinNotes/slover/slover' },
                { text: 'others', link: '/houdini/others/others' }
              ]
            },
            { 
              text: 'Projects', 
              collapsed: false,
              items: [
                { text: 'Projects', link: '/houdini/项目案例/ProjectsAll' }
              ]
            }
          ]
        }
      ],
      '/python/': [
        { 
          text: 'Python',
          collapsed: false,
          items: [
            { text: 'python', link: '/python/python' },
            { text: 'hda', link: '/python/hda/DoubleJumpClass' },
            { text: 'selfTools', link: '/python/selfTools/smoeSelfTools' }
          ]
        }
      ],
      '/godot/': [
        {
          text: 'Godot Engine',
          items: [
            { text: 'Godot Tips', link: '/godot/godotTips' }
          ]
        }
      ],
      '/UE/': [
        {
          text: 'UE Engine',
          items: [
            { text: 'UE Tips', link: '/UE/UETips' }
          ]
        }
      ],
      '/nuke/': [
        {
          text: 'Nuke',
          items: [
            { text: 'Nuke', link: '/nuke/Nuke' }
          ]
        }
      ],
      '/comfyui/': [
        {
          text: 'ComfyUI',
          items: [
            { text: 'ComfyUi', link: '/comfyui/comfyui' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'Tools',
          items: [
            { text: 'Mouseplug-in', link: '/tools/Mouseplug-in' }
          ]
        }
      ]
    }, // 这里闭合整个 sidebar 数组

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

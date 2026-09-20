import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

// ⭐ 新增这一行，把刚刚的层级修复样式表导进来！
import './custom.css' 

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.vp-doc img', { background: 'var(--vp-c-bg)' })
    }
    
    onMounted(() => {
      initZoom()
    })
    
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
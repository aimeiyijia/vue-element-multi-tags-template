// import config from '../public/config.json'
import * as utils from '@/utils/utility'
// 插件
import qs from 'qs'
import moment from 'dayjs'
import _ from 'lodash'
import * as echarts from 'echarts'

const plugin = {
  install: (Vue, options) => {
    // 在Vue原型上挂载第三方插件
    Object.defineProperty(Vue.prototype, '$qs', { value: qs })
    Object.defineProperty(Vue.prototype, '$utils', { value: utils })
    Object.defineProperty(Vue.prototype, '$moment', { value: moment })
    Object.defineProperty(Vue.prototype, '_', { value: _ })
    Object.defineProperty(Vue.prototype, '$echarts', { value: echarts })
  }
}

export default plugin

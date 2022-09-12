import 'core-js'
import 'regenerator-runtime/runtime'
import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import ElTableTs from 'el-table-ts'
import 'el-table-ts/dist/el-table-ts.css'

import ElFormPlus from 'el-form-plus'
import 'el-form-plus/dist/el-form-plus.css'

import App from './App'
import store from './store'
import router from './router'

import './plugin'

import axios from 'axios'

import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

Vue.use(Element)
Vue.use(ElTableTs)
Vue.use(ElFormPlus)

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const path = '@/../static/config.json'
axios
  .get(path)
  .then(async(res) => {
    Object.defineProperty(Vue.prototype, '$gConfig', { value: res.data })
    console.log(Vue, '12345')
    new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App)
    })
  })
  .catch((err) => {
    console.log(err, '配置项读取失败')
  })

import Vue from 'vue'
// import whiteList from './whiteList'
// import { MessageBox, Message } from 'element-ui'
import axios from 'axios'

const config = Vue.prototype.$gConfig
const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 60000
})

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use((response) => {
  const res = response.data
  return res
})
export default instance

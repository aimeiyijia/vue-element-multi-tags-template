import Vue from 'vue'
import whiteList from './whiteList'
import router from '@/router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
import { MessageBox, Message } from 'element-ui'
import { goEncrypt } from './encrypt'
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  AxiosAdapter,
  Cancel,
  CancelToken,
  CancelTokenSource,
  Canceler
} from 'axios'

// 已经处于401提示状态，那么就剩余接口就不再提醒
let IS401 = false

const config = Vue.prototype.$gConfig
const instance = axios.create({
  baseURL: config.baseURL,
  timeout: 60000
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { userInfo } = UserModule
    config.headers.UserRole = 'glr'

    if (
      userInfo &&
      Object.prototype.hasOwnProperty.call(userInfo, 'userRoleCode')
    ) {
      config.headers.UserRole = userInfo.userRoleCode
    }

    console.log(config, '请求配置')

    // 需要传固定token的接口
    const fixedTokenUrl = [
      '/home/bondDeclarationListForTourist',
      '/home/sponsorAfficheForTourist',
      '/file/upload',
      '/user/phoneVerify'
    ]

    // 固定token
    for (let i = 0; i < fixedTokenUrl.length; i++) {
      if (config.url?.includes(fixedTokenUrl[i])) {
        config.headers.Authorization = '3cddb9bc53bb42b987cdbae68dfae653'
        const encryptConfig = goEncrypt(config)
        return encryptConfig
      }
    }
    // 白名单接口不效验token
    for (let i = 0; i < whiteList.length; i++) {
      if (config.url?.includes(whiteList[i])) {
        const encryptConfig = goEncrypt(config)
        return encryptConfig
      }
    }
    const baseToken = UserModule.token
    if (baseToken) {
      // 添加token
      config.headers.Authorization = '' + baseToken
    } else if (config.url?.includes('upload')) {
      const dynamicToken = Vue.prototype.$utils.getDynamicToken()
      config.headers.DynamicToken = '' + dynamicToken
    } else {
      if (!IS401) {
        IS401 = true
        // 拦截
        MessageBox.confirm('你尚未登录，请回首页登录', '温馨提示', {
          cancelButtonText: '登录',
          showCancelButton: false,
          closeOnClickModal: false,
          type: 'warning'
        }).finally(() => {
          toLogin()
        })
      }
    }

    if (config.method === 'get') {
      if (config.url && config.url.includes('?')) {
        config.url += '&timing=' + Date.now()
      } else config.url += '?timing=' + Date.now()
    }

    const encryptConfig = goEncrypt(config)
    return encryptConfig
  },
  error => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(response => {
  const res = response.data
  // 401: Token 过期了;
  if (res.code === 401 && !IS401) {
    IS401 = true
    MessageBox.confirm('您已登录失效或在其它地方登录，请重新登录', '温馨提示', {
      confirmButtonText: '登录',
      showCancelButton: false,
      closeOnClickModal: false,
      type: 'warning'
    })
      .then(() => {
        toLogin()
      })
      .catch(() => {
        toLogin()
      })
  } else if (res.code === 400 || res.code === 501) {
    // 参数不全、服务异常
    Message({
      message: response.data.msg,
      type: 'warning'
    })
  } else {
    if (response.config.responseType === 'blob') {
      const headers = response.headers['content-disposition']
      let filename = ''
      if (headers) {
        const filenameStr = headers.split('filename=')[1]
        filename = decodeURI(filenameStr.substring(1, filenameStr.length - 1))
      }
      return { data: response.data, filename: filename }
    }
    return response.data
  }
})
export default instance

function toLogin() {
  const platform = sessionStorage.getItem('platform')
  const { userInfo } = UserModule
  const { userRoleCode } = userInfo
  let path = ''
  if (userRoleCode === 'cbr' || userRoleCode === 'sjy') {
    path = '/judgeEntrance'
  } else if (userRoleCode === 'cooperative' || platform === 'cooperative') {
    path = '/cooperativeLogin'
  } else {
    path = '/frontPage'
  }
  sessionStorage.clear()
  UserModule.ClearUserInfo()
  PermissionModule.ClearMenu()
  router.push({
    path
  })
  IS401 = false
}

import Vue from 'vue'
import http from './http'

interface HTTPRequestConfig {
  (url: string, data?: any, contentType?: string): any
}

const AJ = 'application/json'
const AXC = 'application/x-www-form-urlencoded;charset=UTF-8'

export const $post: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AJ
  return http({
    method: 'post',
    url: url,
    data: data,
    headers: { 'Content-Type': ct }
  })
}

export const $get: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AXC
  data = data || {}
  return http({
    method: 'get',
    url: url,
    params: data,
    headers: {
      'Content-Type': ct
    }
  })
}

export const $delete: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AXC
  data = data || {}
  return http({
    method: 'delete',
    url: url,
    params: data,
    headers: {
      'Content-Type': ct
    }
  })
}
export const $put: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AJ
  data = data || {}
  return http({
    method: 'put',
    url: url,
    data: data,
    headers: { 'Content-Type': ct }
  })
}
export const $getBlob: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AXC
  data = data || {}
  return http({
    method: 'get',
    url: url,
    params: data,
    responseType: 'blob',
    headers: {
      'Content-Type': ct
    }
  })
}

export const $postBlob: HTTPRequestConfig = function(url, data, contentType) {
  const ct = contentType || AJ
  return http({
    method: 'post',
    url: url,
    data: data,
    responseType: 'blob',
    headers: { 'Content-Type': ct }
  })
}

export const $postArraybuffer: HTTPRequestConfig = function(
  url,
  data,
  contentType
) {
  const ct = contentType || AJ
  return http({
    method: 'post',
    url: url,
    data: data,
    responseType: 'arraybuffer',
    headers: { 'Content-Type': ct }
  })
}

// 下载文件
export function $downloadFile(blob) {
  if (!blob) {
    alert('链接为空，请检查！')
    return
  } else {
    blob = Vue.prototype.$gConfig.downloadUrl + blob.substring(0, blob.lastIndexOf('.'))
  }
  window.open(blob)
}

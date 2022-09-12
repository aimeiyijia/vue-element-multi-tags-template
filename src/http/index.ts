import Vue from 'vue'
import http from './http'

const AJ = 'application/json'
const AXC = 'application/x-www-form-urlencoded;charset=UTF-8'

export const $post = function(url, data, contentType) {
  const ct = contentType || AJ
  return http({
    method: 'post',
    url: url,
    data: data,
    headers: { 'Content-Type': ct }
  })
}

export const $get = function(url, data, contentType) {
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

export const $delete = function(url, data, contentType) {
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
export const $put = function(url, data, contentType) {
  const ct = contentType || AJ
  data = data || {}
  return http({
    method: 'put',
    url: url,
    data: data,
    headers: { 'Content-Type': ct }
  })
}
export const $getBlob = function(url, data, contentType) {
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

export const $postBlob = function(url, data, contentType) {
  const ct = contentType || AJ
  return http({
    method: 'post',
    url: url,
    data: data,
    responseType: 'blob',
    headers: { 'Content-Type': ct }
  })
}

export const $postArraybuffer = function(
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

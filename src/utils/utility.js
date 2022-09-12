import Vue from 'vue'
// 下载
export function downloadUseBlob(name, res) {
  const blob = new Blob([res], { type: 'text/html' })
  if (window.URL.createObjectURL(new Blob()).indexOf(location.host) < 0) {
    // 判断是否为IE浏览器
    if (window.navigator.msSaveOrOpenBlob) {
      // IE10+方法
      window.navigator.msSaveOrOpenBlob(blob, name)
    }
  } else {
    const a = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    a.href = href
    a.download = name
    a.target = '_blank'
    document.body.appendChild(a)
    a.click() // 点击下载
    document.body.removeChild(a) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
}

// 文件服务器下载
export function downloadFile(file) {
  const fileName = file.fileName.substring(0, file.fileName.lastIndexOf('.'))
  window.open(
    Vue.prototype.$gConfig.downloadUrl +
      file.filePath +
      '?filename=' +
      encodeURI(fileName)
  )
}

// 图片转base64
export function imgURLToBase64(url) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const img = new Image() // 通过构造函数绘制图片实例
    img.crossOrigin = 'Anonymous' // 处理图片跨域问题，服务器也需允许跨域
    img.src = url
    img.onload = function() {
      // 该加载过程为异步事件，请先确保获取完整图片
      canvas.width = img.width
      canvas.height = img.height
      if (context) {
        context.drawImage(img, 0, 0) // 将图片绘制在canvas中
      }
      const URLData = canvas.toDataURL('image/png')
      resolve(URLData)
      canvas = null
    }
    img.onerror = function() {
      reject(new Error('图片加载失败'))
    }
  })
}

export function countDown(time) {
  const hour = time.split(':')[0]
  const min = time.split(':')[1]
  const sec = time.split(':')[2]
  return (Number(hour * 3600) + Number(min * 60) + Number(sec)) * 1000
}

export function floatMultiply(arg1, arg2) {
  if (arg1 == null || arg2 == null) {
    return null
  }
  let n1 = 1
  let n2 = 1
  let r1, r2 // 小数位数
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  n1 = Number(arg1.toString().replace('.', ''))
  n2 = Number(arg2.toString().replace('.', ''))
  return (n1 * n2) / Math.pow(10, r1 + r2)
}

export function readFile(filePath) {
  // 创建一个新的xhr对象
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    // eslint-disable-next-line
    xhr = new ActiveXObject("Microsoft.XMLHTTP")
  }
  const okStatus = document.location.protocol === 'file' ? 0 : 200
  xhr.open('GET', filePath, false)
  xhr.overrideMimeType('text/html;charset=utf-8')
  xhr.send(null)
  return xhr.status === okStatus ? xhr.responseText : null
}

/**
 * @description 信息脱敏
 * @param { string } str 需要脱敏的字符串
 * @param { number } frontLen 字符串前面保留位数
 * @param { number } endLen 字符串后面保留位数
 * @returns { string } 脱敏后的字符串
 */
export function hideCode(str, frontLen, endLen) {
  if (str.length > frontLen + endLen + 1) {
    endLen = endLen || 0
    const len = str.length - frontLen - endLen
    let xing = ''
    for (let i = 0; i < len; i++) {
      xing += '*'
    }
    return (
      str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
    )
  } else {
    let xing = ''
    for (let i = 0; i < str.length - 1; i++) {
      xing += '*'
    }
    return str.substring(0, 1) + xing
  }
}

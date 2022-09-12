import { Message } from 'element-ui'
import to from 'await-to-js'
import { AxiosResponse } from 'axios'

interface IProcessResponse {
  code: number
  msg: string
  data: AxiosResponse
}

interface IProcessOptions {
  // 是否需要成功标识
  needSuccessTip?: boolean
  // 是否需要原生的响应
  needNativeRep?: boolean
}

// 处理所有后端返回的数据
export async function processReturn(reqFn: Promise<any>, options: IProcessOptions = {}): Promise<any> {
  const { needSuccessTip, needNativeRep } = options
  const [err, res] = await to<IProcessResponse>(reqFn)
  if (err || !res) {
    console.log(err, '接口请求出错')
    return
  }

  const { code, msg, data } = res
  if (code === 200) {
    needSuccessTip && Message.success(msg)
  } else {
    const errTxt = msg || '未知错误'
    Message.error(errTxt)
    return
  }
  return needNativeRep ? res : data
}

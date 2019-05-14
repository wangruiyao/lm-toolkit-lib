import qs from 'qs'
import axios from 'axios'

let handleError = true;
let handleSuccess = {
  message: ''
};
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/externallogic/';
// console.log('当前环境：' + process.env.NODE_ENV + ' baseurl:' + axios.defaults.baseURL);
/* 定义标准的http response格式如下：
 * {code:0, data:{}, message: '错误信息'}
 * code === 0 时为后台正确处理了请求，并且返回了data参数
 * code !== 0 时为后台没有正确处理请求，返回message错误信息告知request中的相关错误
 * 以下为定义的code值
*/
// 响应拦截器
// http 状态码在 200-300 以内不触发error
// 请求成功直接返回了返回数据中的data数据, 过滤其它数据
// 请求失败，返回所有的data数据
axios.interceptors.response.use((response) => {
  const data = response.data;
  return data;
}, (error) => {
  // 这里进行拦截提示
  return Promise.reject(error);
});

// 请求拦截器
axios.interceptors.request.use((config) => {
  return config;
}, function (error) {
  return Promise.reject(error);
});
/*
 *  ajax
 *  url：String 请求地址
 *  data: Object 参数
 *  method: String 方法
 *  type: String 发送给服务器的参数
 *  timestamp: Boolean 是否开启时间戳, 只在get方法中生效
 *  catchError: Boolean 是否开启全局错误弹窗
 *  catchSuccess: Object 是否开启api成功回调弹窗
 */
export default function ajax ({
                                url,
                                data,
                                method = 'get',
                                type = 'form',
                                timestamp = false,
                                catchError = true,
                                catchSuccess = null
                              }) {
  handleError = catchError;
  handleSuccess.message = catchSuccess ? catchSuccess.message : '';
  let config = {
    method: method,
    url: url,
    responseType: 'json',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    }
  };
  if (method === 'get') {
    if (timestamp) {
      config.url += config.url.indexOf('?') > 0 ? '&' : '?';
      config.url += `timestamp=${+new Date()}`;
    }
    Object.assign(config, {
      params: data
    });
  } else {
    if (type === 'form') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      Object.assign(config, {
        data: qs.stringify(data)
      });
    } else if (type === 'json') {
      config.headers['Content-Type'] = 'application/json';
      Object.assign(config, {
        data: data
      });
    } else if (type === 'formData') {
      let formData = new FormData();
      for (let i in data) {
        formData.append(i, data[i]);
      }
      config.headers['Content-Type'] = 'multipart/form-data';
      Object.assign(config, {
        data: formData
      });
    }
  }
  return new Promise((resolve, reject) => {
    axios(config).then((response) => {
      resolve(response);
    }, (error) => {
      reject(error);
    }).catch((error) => {
      reject(error);
    });
  });
}


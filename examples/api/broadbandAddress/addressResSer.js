/*
* 标准地址资源查询
* */

export function addressResSer (params) {    // 获取用户信息api ajax
  return ajax({
    url: '/api/addressResSer',
    method: 'post',
    data: params,
    catchError: true
  });
}
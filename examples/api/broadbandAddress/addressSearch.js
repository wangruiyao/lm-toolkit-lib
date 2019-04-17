/*
* 标准地址查询接口
* */

export function addressSearch (params) {    // 获取用户信息api ajax
  return ajax({
    url: '/api/addressSearch',
    method: 'post',
    data: params,
    catchError: true
  });
}
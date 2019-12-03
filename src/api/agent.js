/*
 * @Author: your name
 * @Date: 2019-12-03 22:17:37
 * @LastEditTime: 2019-12-03 23:49:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \backgroud\src\api\agent.js
 */
import request from '@/utils/request'

// 代理列表
export function getAgentList(params) {
  return request({
    url: '/delegate/delegateList',
    method: 'get',
    params
  })
}

// 代理详情
export function getAgentInfo(params) {
  return request({
    url: '/delegate/delegateInfo',
    method: 'get',
    params
  })
}

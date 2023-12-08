// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** exec GET /api/queue/exec */
export async function execUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.execUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/api/queue/exec', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** get GET /api/queue/get */
export async function getUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/queue/get', {
    method: 'GET',
    ...(options || {}),
  });
}

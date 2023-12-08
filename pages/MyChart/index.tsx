import { listChartByPageUsingPost, listMyChartByPageUsingPost } from '@/services/xnbi/chartController';
import { message, List, Avatar, Card, Input, Result } from 'antd';
import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import type { SearchProps } from '../Search';

const { Search } = Input;

/**
 * 添加图表页面
 * @constructor
 */
const MyChart: React.FC = () => {
  const initSearchParams = {
    pageSize: 8,
    current: 1
  }
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setCharList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const getList = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPost(searchParams);
      if (res.data) {
        setCharList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error("获取图表列表失败");
      }

    } catch (e: any) {
      message.error("获取图表列表失败", e.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, [searchParams]);

  return (
    <div className="my-chart">
      <div className='marginBottom-16'>
        <Search placeholder="请输入图表名称" loading={loading} onSearch={(value: string) => {
          setSearchParams({
            ...initSearchParams,
            name: value
          })
        }} style={{ width: 506 }}
          enterButton />
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize
            })
          },
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total: total
        }}
        loading={loading}
        dataSource={chartList}

        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <Card>
              <List.Item.Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                title={item.name}
                description={"图表类型：" + item.chartType}
              />
              <div style={{ marginBottom: 16 }} />
              <div className='marginBottom-16'>
                <span>{"分析目标：" + item.goal}</span>
              </div>
              <div className='marginBottom-16'>
                <span>{"创建时间：" + item.createTime}</span>
              </div>
              <>
                {
                  item.state === 'succeed' && <>
                    <span>{"分析结果：" + item.genResult}</span>
                    <ReactECharts option={JSON.parse(item.genChart === '服务错误' ? '{}' : item.genChart)} />
                  </>
                }
                {
                  item.state === 'wait' && <><Result
                    status="warning"
                    title="图表待生成"
                    subTitle={item.execMessage ?? '当前图表生成繁忙，请耐心等候'}
                  />
                  </>
                }
                {
                  item.state === 'running' && <><Result
                    status="info"
                    title="图表生成中"
                    subTitle={item.execMessage ?? '图表正在全力生成中'}
                  />
                  </>
                }
                {
                  item.state === 'fail' && <><Result
                    status="error"
                    title="图表生成失败"
                    subTitle={item.execMessage}
                  />
                  </>
                }

              </>

            </Card>
          </List.Item>
        )}
      />


    </div>
  );
};
export default MyChart;

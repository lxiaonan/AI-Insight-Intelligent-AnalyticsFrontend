import { Button, Card, Col, Form, message, Row, Space, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { uploadTextAnalysisUsingPost } from '@/services/xnbi/textController';



/**
 * 文字识别
 * @constructor
 */
const TextAnalysis: React.FC = () => {
  const [textAnalysis, setTextAnalysis] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const fileList: UploadFile[] = [

  ];
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {

    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    setTextAnalysis(undefined);
    try {
      console.log(values);
      const res = await uploadTextAnalysisUsingPost({}, values.file.file.originFileObj);
      console.log(res);

      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        setTextAnalysis(res.data);
      }
    } catch (e: any) {
      console.log(e.message);

      message.error('分析失败，' + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="text-analysis">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="文字识别">
            <Form name="addImage" labelAlign="left" labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
              
              <Form.Item name="file" label="文字识别">
                <Upload name="file" maxCount={1} listType="picture"
                  defaultFileList={[...fileList]}>
                  <Button icon={<UploadOutlined />}>上传 图片(支持jpeg,jpg,png,bmp格式)</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="识别文字:">
            {textAnalysis ?? <div>请先在左侧进行提交</div>}
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default TextAnalysis;

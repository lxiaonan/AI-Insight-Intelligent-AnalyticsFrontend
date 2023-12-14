import { Button, Card, Col, Form, message, Row, Space, Spin, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import TextArea from 'antd/es/input/TextArea';
import { uploadImageAnalysisUsingPost } from '@/services/xnbi/imageController';



/**
 * 图片分析
 * @constructor
 */
const AddImage: React.FC = () => {
  const [imageAnalysis, setImageAnalysis] = useState<string>();
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
    setImageAnalysis(undefined);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      console.log(values);
      const res = await uploadImageAnalysisUsingPost(params, {}, values.file.file.originFileObj);
      console.log(res);

      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        setImageAnalysis(res.data);
      }
    } catch (e: any) {
      console.log(e.message);

      message.error('分析失败，' + e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-image">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="图片分析">
            <Form name="addImage" labelAlign="left" labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
              <Form.Item
                name="goal"
                label="分析目标"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析需求，比如：分析图片，并告知出处" />
              </Form.Item>
              <Form.Item name="file" label="分析的图片">
                <Upload name="file" maxCount={1} listType="picture"
                  defaultFileList={[...fileList]}>
                  <Button icon={<UploadOutlined />}>上传 图片(支持jpeg, jpg, svg,png, webp格式)</Button>
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
          <Card title="分析结论">
            {imageAnalysis ?? <div>请先在左侧进行提交</div>}
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddImage;

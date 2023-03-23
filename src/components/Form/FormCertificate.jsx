import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatDate } from '../../utils/const';
import { FormItemSelectOneAdd } from './FormItemSelectOneAdd';
import { Button, Select, Form, Row, Checkbox, Col } from 'antd';

import { postSchool } from '../../store/schoolSlice';
import { putDataSchool } from '../../store/schoolSlice';
import { postDetailCandidateHistoryCertificate } from '../../store/detailCandidateSlice';
import { fetchDetailCandidateSliceNotLoading } from '../../store/detailCandidateSlice';
import { putDetailCandidateHistory } from '../../store/detailCandidateSlice';
import { deleteHistory } from '../../store/detailCandidateSlice';
import { getSchoolTest } from '../../apis/filterApi';
import { getKeyWithLabel } from '../../utils/const';

const { Option } = Select;
export const FormCertificate = ({
  setModalOpen,
  candidate_id,
  initialValues,
  setInitialValues,
  degree,
  school,
  itemSchool,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [checkDisable, setCheckDisable] = useState(false);

  useEffect(() => {
    form.validateFields(['start_time']);
    form.validateFields(['end_time']);
    if (initialValues.status === 1) {
      setCheckDisable(true);
      form.setFieldValue('status', true);
      form.setFieldValue('end_time', undefined);
    } else {
      setCheckDisable(false);
      form.setFieldValue('status', false);
      form.setFieldValue(
        'end_time',
        Number(formatDate(initialValues?.end_time)?.year) || undefined,
      );
    }

    form.setFieldValue(
      'start_time',
      Number(formatDate(initialValues?.start_time)?.year) || undefined,
    );

    form.setFieldValue('organization', initialValues?.organization);

    form.setFieldValue('title', initialValues?.title || undefined);

    form.setFieldValue('achievement', initialValues?.achievement);
  }, [initialValues]);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const resultFinal = (values) => {
    const final = {
      ...values,
      status: checkDisable ? 1 : -1,
      start_time: values?.start_time ? `${values.start_time}-01-01` : undefined,
      end_time: values?.end_time ? `${values.end_time}-01-01` : undefined,
      type: 3,
      candidate_id: candidate_id,
    };

    for (const key in final) {
      if (final[key] === undefined) {
        delete final[key];
      }
    }
    return final;
  };

  const onFinish = async (values) => {
    if (initialValues.length !== 0) {
      await dispatch(
        putDetailCandidateHistory({
          id: initialValues.id,
          params: resultFinal(values),
        }),
      );
    } else {
      await dispatch(
        postDetailCandidateHistoryCertificate(resultFinal(values)),
      );
    }
    await dispatch(fetchDetailCandidateSliceNotLoading(candidate_id));
    await setModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    console.log('itemSchool failed', itemSchool);
  };

  const handleChangeEndTime = () => {
    form.validateFields(['start_time']);
  };

  const handleChangeStartTime = () => {
    form.validateFields(['end_time']);
  };

  const onChangeCheckbox = (e) => {
    setCheckDisable(e.target.checked);
    if (e.target.checked === true) {
      form.setFieldValue('end_time', undefined);
    }
    form.validateFields(['start_time']);
    form.validateFields(['end_time']);
  };

  const handleDelete = async () => {
    await dispatch(deleteHistory(initialValues.id));
    await setModalOpen(false);
  };

  return (
    <Form
      layout="vertical"
      style={{
        width: '100%',
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={(12, 12)}>
        <Col
          span={12}
          style={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          {initialValues.length === 0 ? (
            <>Add Certificate</>
          ) : (
            <>Edit Certificate</>
          )}
        </Col>
        {initialValues.length !== 0 && (
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button type="primary" danger onClick={handleDelete}>
              Delete
            </Button>
          </Col>
        )}
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Form.Item name="status" valuePropName="checked">
            <Checkbox onChange={onChangeCheckbox}>Current school</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Form.Item
            name="start_time"
            label="Start year"
            rules={[
              () => ({
                validator(_, value) {
                  if (
                    value > form.getFieldValue('end_time') &&
                    form.getFieldValue('end_time')
                  )
                    return Promise.reject(
                      new Error('Start year not higher graduation year'),
                    );

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Start year"
              optionFilterProp="children"
              onChange={handleChangeStartTime}
            >
              {yearsRange.map((option) => {
                return (
                  <Option key={option.key} value={option.key}>
                    {option.key}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="end_time"
            label="Graduation year"
            rules={[
              () => ({
                validator(_, value) {
                  if (
                    value < form.getFieldValue('start_time') &&
                    form.getFieldValue('start_time')
                  )
                    return Promise.reject(
                      new Error('Graduation year not smaller start year'),
                    );

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              disabled={checkDisable}
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Graduation year"
              optionFilterProp="children"
              onChange={handleChangeEndTime}
            >
              {yearsRange.map((option) => {
                return (
                  <Option key={option.key} value={option.key}>
                    {option.key}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <FormItemSelectOneAdd
            name="organization"
            label="School"
            placeholder="Select or add school"
            addItem
            postData={postSchool}
            form={form}
            options={school}
            putData={putDataSchool}
            getData={getSchoolTest}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Form.Item
            label="Degree"
            required
            name="title"
            rules={[
              {
                required: true,
                message: 'Please select degree',
              },
            ]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Select degree"
              optionFilterProp="children"
              onChange={(value, option) => {
                form.setFieldValue('title', getKeyWithLabel(option));
              }}
            >
              {degree?.map((option) => {
                return (
                  <Option
                    key={option.key}
                    value={option.key}
                    label={option.label}
                  >
                    {option.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Form.Item>
            <Button
              onClick={() => {
                setInitialValues([]);
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '10px' }}
            >
              {initialValues.length === 0 ? <>Add</> : <>Save</>}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

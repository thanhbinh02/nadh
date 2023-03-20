import { Button, Select, Form, Row, Checkbox, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormItemSelectOneAdd } from './FormItemSelectOneAdd';
import { postSchool } from '../../store/schoolSlice';
import { putDataSchool } from '../../store/schoolSlice';

import { postMajor } from '../../store/majorSlice';
import { putDataMajor } from '../../store/majorSlice';
import { postDetailCandidateHistoryAcademic } from '../../store/detailCandidateSlice';
import { fetchDetailCandidateSliceNotLoading } from '../../store/detailCandidateSlice';
import { formatDate } from '../../utils/const';
import { putDetailCandidateHistory } from '../../store/detailCandidateSlice';
import { deleteHistory } from '../../store/detailCandidateSlice';
import { getSchoolTest } from '../../apis/filterApi';
import { getMajorTest } from '../../apis/filterApi';

const { Option } = Select;
export const FormEducation = ({
  setModalOpen,
  candidate_id,
  initialValues,
  setInitialValues,
  degree,
  school,
  major,
  itemSchool,
  itemMajor,
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
      form.setFieldValue('status', false);
      form.setFieldValue(
        'end_time',
        Number(formatDate(initialValues?.end_time)?.year) || undefined,
      );
      setCheckDisable(false);
    }
    console.log('checkDisable', checkDisable);
    form.setFieldValue('degree', initialValues?.degree?.key);
    form.setFieldValue(
      'start_time',
      Number(formatDate(initialValues?.start_time)?.year) || undefined,
    );

    form.setFieldValue(
      'organization',
      initialValues?.organization?.label || undefined,
    );

    form.setFieldValue('title', initialValues?.title?.label || undefined);

    form.setFieldValue('achievement', initialValues?.achievement);

    if (initialValues?.organization?.key !== undefined) {
      dispatch(putDataSchool(initialValues?.organization));
    }

    if (initialValues?.title?.key !== undefined) {
      dispatch(putDataMajor(initialValues?.title));
    }
  }, [initialValues]);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const resultFinal = (values) => {
    let start_time = null;
    let end_time = null;
    let title = null;
    let organization = null;

    if (values.start_time !== undefined) {
      start_time = `${values.start_time}-01-01`;
    }
    if (values.end_time !== undefined) {
      end_time = `${values.end_time}-01-01`;
    }
    if (values.organization !== undefined) {
      organization = itemSchool;
    }
    if (values.title !== undefined) {
      title = itemMajor;
    }

    const itemDegree = degree.find((item) => item.key === values?.degree);
    const result = {
      status: checkDisable ? 1 : -1,
      start_time: start_time,
      end_time: end_time,
      organization: organization,
      title: title,
      degree: {
        key: itemDegree?.key,
        label: itemDegree?.label,
      },
      type: 1,
      candidate_id: candidate_id,
    };
    const filteredResult = Object.fromEntries(
      Object.entries(result).filter(([key, value]) => value !== null),
    );
    return filteredResult;
  };

  const onFinish = async (values) => {
    await setModalOpen(false);
    if (initialValues.length !== 0) {
      await dispatch(
        putDetailCandidateHistory({
          id: initialValues.id,
          params: resultFinal(values),
        }),
      );
    } else {
      await dispatch(postDetailCandidateHistoryAcademic(resultFinal(values)));
    }
    await dispatch(fetchDetailCandidateSliceNotLoading(candidate_id));
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
            <>Add Education</>
          ) : (
            <>Edit Education</>
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
                    form.getFieldValue('start_time') &&
                    value !== undefined
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
          <FormItemSelectOneAdd
            name="title"
            label="Major"
            placeholder="Select or add major"
            addItem
            postData={postMajor}
            form={form}
            getData={getMajorTest}
            putData={putDataMajor}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <Form.Item
            label="Degree"
            required
            name="degree"
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
            >
              {degree?.map((option) => {
                return (
                  <Option key={option.key} value={option.key}>
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

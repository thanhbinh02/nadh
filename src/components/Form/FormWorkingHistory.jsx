import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormItemSelectOneAdd } from './FormItemSelectOneAdd';
import { Button, Select, Form, Row, Checkbox, Col } from 'antd';
import { MONTHS } from '../../utils/const';
import { getCompany } from '../../apis/filterApi';
import { postCompany } from '../../store/companySlice';
import { putDataCompany } from '../../store/companySlice';
import { useSelector } from 'react-redux';

import { getPositionTest } from '../../apis/filterApi';
import { postPosition } from '../../store/positionSlice';
import { putDataPosition } from '../../store/positionSlice';
import { postDetailCandidateHistoryWorkingHistory } from '../../store/detailCandidateSlice';
import { fetchDetailCandidateSliceNotLoading } from '../../store/detailCandidateSlice';
import { putDetailCandidateHistory } from '../../store/detailCandidateSlice';
import { deleteHistory } from '../../store/detailCandidateSlice';

const { Option } = Select;
export const FormWorkingHistory = ({
  setModalOpen,
  candidate_id,
  initialValues,
  setInitialValue,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [checkDisable, setCheckDisable] = useState(false);
  const [monthTo, setMonthTo] = useState();
  const [yearTo, setYearTo] = useState();

  const itemCompany = useSelector((state) => state.company.item);
  const itemPosition = useSelector((state) => state.position.item);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  useEffect(() => {
    if (initialValues.length !== 0) {
      if (initialValues?.start_time) {
        const dataStartTime = initialValues?.start_time.split('-');
        if (initialValues?.start_time_month_flag === 1) {
          form.setFieldValue('month_from', dataStartTime[1]);
        } else {
          form.setFieldValue('month_from', undefined);
        }
        form.setFieldValue('year_from', dataStartTime[0]);
      }

      if (initialValues.end_time !== null) {
        form.setFieldValue('status', false);
        setCheckDisable(false);
        const dataEndTime = initialValues?.end_time.split('-');
        if (initialValues?.end_time_month_flag === 1) {
          form.setFieldValue('month_to', dataEndTime[1]);
        } else {
          form.setFieldValue('month_to', undefined);
        }
        form.setFieldValue('year_to', dataEndTime[0]);
      } else {
        form.setFieldValue('status', true);
        setCheckDisable(true);
      }

      form.setFieldValue(
        'organization',
        initialValues?.organization?.label || undefined,
      );

      form.setFieldValue('title', initialValues?.title?.label || undefined);
      // putDataCompany
      if (initialValues?.organization?.key !== undefined) {
        dispatch(putDataCompany(initialValues?.organization));
      }

      if (initialValues?.title?.key !== undefined) {
        dispatch(putDataPosition(initialValues?.title));
      }
    } else {
      form.setFieldValue('status', false);
      setCheckDisable(false);
    }
  }, [initialValues]);

  const resultFinal = (values) => {
    let organization,
      title,
      start_time_month_flag,
      start_time,
      end_time_month_flag,
      end_time;
    if (values.organization !== undefined) {
      organization = itemCompany;
    }
    if (values.title !== undefined) {
      title = itemPosition;
    }
    if (values.month_From !== undefined) {
      start_time_month_flag = 1;
      start_time = `${values.year_from}-${values.month_from}-01`;
    } else {
      start_time_month_flag = -1;
      start_time = `${values.year_from}-01-01`;
    }

    if (values.month_from !== undefined) {
      start_time_month_flag = 1;
      start_time = `${values.year_from}-${values.month_from}-01`;
    } else {
      start_time_month_flag = -1;
      start_time = `${values.year_from}-01-01`;
    }

    if (values.status === false) {
      if (values.month_to !== undefined && values.year_to !== undefined) {
        end_time_month_flag = 1;
        end_time = `${values.year_to}-${values.month_to}-01`;
      } else {
        end_time_month_flag = -1;
        end_time = `${values.year_to}-01-01`;
      }
    } else {
      end_time = null;
    }

    const result = {
      candidate_id: candidate_id,
      start_time: start_time,
      start_time_month_flag: start_time_month_flag,
      end_time: end_time,
      end_time_month_flag: end_time_month_flag,
      organization: organization,
      title: title,
      type: 2,
    };

    const filteredResult = Object.fromEntries(
      Object.entries(result).filter(([key, value]) => value !== undefined),
    );

    return filteredResult;
  };

  const onFinish = async (values) => {
    form.validateFields(['year_to']);

    await setModalOpen(false);
    if (initialValues.length !== 0) {
      await dispatch(
        putDetailCandidateHistory({
          id: initialValues.id,
          params: resultFinal(values),
        }),
      );
    } else {
      await dispatch(
        postDetailCandidateHistoryWorkingHistory(resultFinal(values)),
      );
    }
    await dispatch(fetchDetailCandidateSliceNotLoading(candidate_id));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeCheckbox = (e) => {
    setCheckDisable(e.target.checked);

    if (e.target.checked === true) {
      form.setFieldValue('month_to', undefined);
      form.setFieldValue('year_to', undefined);
    } else {
      form.setFieldValue('month_to', monthTo);
      form.setFieldValue('year_to', yearTo);
    }
    form.validateFields(['year_to']);
  };

  const handleChangeMonthTo = (value) => {
    setMonthTo(value);
    form.validateFields(['year_to']);
  };

  const handleChangeYearTo = (value) => {
    setYearTo(value);
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
            <>Add Working History</>
          ) : (
            <>Edit Working History</>
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
            <Checkbox onChange={onChangeCheckbox}>Current job</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Form.Item label="Start year" required>
            <Row gutter={(12, 12)}>
              <Col span={12}>
                <Form.Item name="month_from">
                  <Select
                    allowClear
                    showSearch
                    style={{ width: '100%', borderRadius: '0px' }}
                    placeholder="Month"
                    optionFilterProp="children"
                    onChange={() => {
                      form.validateFields(['year_from']);
                    }}
                  >
                    {MONTHS.map((option) => {
                      return (
                        <Option key={option.key} value={option.key}>
                          {option.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="year_from"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (
                          value === undefined &&
                          form.getFieldValue('month_from')
                        )
                          return Promise.reject(
                            new Error('Start select start year'),
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
                    placeholder="Year"
                    optionFilterProp="children"
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
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="End year" required>
            <Row gutter={(12, 12)}>
              <Col span={12}>
                <Form.Item name="month_to">
                  <Select
                    allowClear
                    showSearch
                    style={{ width: '100%', borderRadius: '0px' }}
                    placeholder="Month"
                    optionFilterProp="children"
                    onChange={handleChangeMonthTo}
                    disabled={checkDisable}
                  >
                    {MONTHS.map((option) => {
                      return (
                        <Option key={option.key} value={option.key}>
                          {option.label}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="year_to"
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (
                          value === undefined &&
                          form.getFieldValue('month_to') &&
                          form.getFieldValue('status') === false
                        )
                          return Promise.reject(
                            new Error('Start select end year'),
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
                    placeholder="Year"
                    optionFilterProp="children"
                    onChange={handleChangeYearTo}
                    disabled={checkDisable}
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
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <FormItemSelectOneAdd
            name="organization"
            label="Company"
            placeholder="Select or add company"
            addItem
            postData={postCompany}
            form={form}
            putData={putDataCompany}
            getData={getCompany}
            required
            message="Please select company"
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={24}>
          <FormItemSelectOneAdd
            name="title"
            label="Position"
            placeholder="Select or add position"
            addItem
            postData={postPosition}
            form={form}
            putData={putDataPosition}
            getData={getPositionTest}
            required
            message="Please select position"
          />
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
                setModalOpen(false);
                setCheckDisable(false);
                setMonthTo();
                setYearTo();
                form.setFieldValue('month_from', undefined);
                form.setFieldValue('month_to', undefined);
                form.setFieldValue('year_from', undefined);
                form.setFieldValue('year_to', undefined);
                form.setFieldValue('title', undefined);
                form.setFieldValue('organization', undefined);
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
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

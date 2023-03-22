import { Card } from 'antd';
import { Form, Row, Col, InputNumber, Select, Button } from 'antd';
import { FormItemBenefits } from '../Form/FormItemBenefits';
import { BENEFITS } from '../../utils/const';
import { useState } from 'react';
import { changeMoney } from '../../utils/const';

const { Option } = Select;
export const CardRemunerationAndRewards = ({ remuneration }) => {
  const [form] = Form.useForm();
  const [valueSelect, setValueSelect] = useState(remuneration.currency);
  const [reset, setReset] = useState(false);

  const options = [
    { name: 'USD', id: 1 },
    { name: 'VND', id: 2 },
    { name: 'JPY', id: 3 },
    { name: 'EUR', id: 4 },
  ];

  const onFinish = async (values) => {
    console.log('success', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeSelect = (value, option) => {
    const resultCurrentSalary = changeMoney(
      form.getFieldValue('current_salary'),
      Number(valueSelect.id),
      value,
    );
    const expectSalaryTo = changeMoney(
      form.getFieldValue('salary_to'),
      Number(valueSelect.id),
      value,
    );
    const expectSalaryFrom = changeMoney(
      form.getFieldValue('salary_from'),
      Number(valueSelect.id),
      value,
    );

    form.setFieldValue('current_salary', resultCurrentSalary);
    form.setFieldValue('salary_to', expectSalaryTo);
    form.setFieldValue('salary_from', expectSalaryFrom);
    setValueSelect(option);
  };

  const handleChangeSalaryFrom = () => {
    form.validateFields(['salary_from']);
  };

  const handleChangeSalaryTo = () => {
    form.validateFields(['salary_to']);
  };

  const initialValues = {
    current_salary: remuneration?.current_salary,
    currency: remuneration?.currency?.id,

    over_thirteen: remuneration?.benefit?.over_thirteen,
    over_thirteen_text: remuneration?.benefit?.over_thirteen_text,
    lunch_check: remuneration?.benefit?.lunch_check,
    lunch_check_text: remuneration?.benefit?.lunch_check_text,
    car_parking: remuneration?.benefit?.car_parking,
    car_parking_text: remuneration?.benefit?.car_parking_text,
    car_allowance: remuneration?.benefit?.car_allowance,
    car_allowance_text: remuneration?.benefit?.car_allowance_text,
    phone: remuneration?.benefit?.phone,
    phone_text: remuneration?.benefit?.phone_text,
    laptop: remuneration?.benefit?.laptop,
    laptop_text: remuneration?.benefit?.laptop_text,
    share_option: remuneration?.benefit?.share_option,
    share_option_text: remuneration?.benefit?.share_option_text,
    health_cover: remuneration?.benefit?.health_cover,
    health_cover_text: remuneration?.benefit?.health_cover_text,
    pension_scheme: remuneration?.benefit?.pension_scheme,
    no_holiday: remuneration?.benefit?.no_holiday,
    working_hour: remuneration?.benefit?.working_hour,
    overtime_hour: remuneration?.benefit?.overtime_hour,

    notice_days: remuneration?.notice_days,
    salary_from: remuneration?.salary?.from,
    salary_to: remuneration?.salary?.to,
  };

  return (
    <Card
      title="REMUNERATION AND REWARDS"
      bordered={false}
      style={{
        width: '100%',
        marginBottom: '100px',
        marginTop: '30px',
      }}
    >
      <Form
        layout="vertical"
        style={{
          width: '100%',
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <Row style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <Form.Item
              name="current_salary"
              label={`Based salary (${valueSelect.name})`}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                formatter={(value) => {
                  const str = value.toString();
                  const decimalIndex = str.indexOf('.');
                  const decimalPart =
                    decimalIndex >= 0 ? str.slice(decimalIndex) : '';
                  const integerPart =
                    decimalIndex >= 0 ? str.slice(0, decimalIndex) : str;
                  const formattedIntegerPart = integerPart
                    .split('')
                    .reverse()
                    .map((char, index) => {
                      if (index > 0 && index % 3 === 0) {
                        return `${char},`;
                      }
                      return char;
                    })
                    .reverse()
                    .join('');
                  return `${formattedIntegerPart}${decimalPart}`;
                }}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                precision={2}
              ></InputNumber>
            </Form.Item>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Form.Item name="currency">
              <Select
                style={{ width: '76px', borderRadius: '0px' }}
                defaultValue={valueSelect.id}
                onChange={handleChangeSelect}
              >
                {options.map((option) => {
                  return (
                    <Option
                      key={option.id}
                      value={option.id}
                      label={option.name}
                    >
                      {option.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={(12, 12)} style={{ marginBottom: '10px' }}>
          {BENEFITS.map((item) => (
            <FormItemBenefits
              item={item}
              key={item.key}
              benefit={remuneration.benefit}
              form={form}
            />
          ))}
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item label="Pension scheme" name="pension_scheme">
              <InputNumber
                style={{ width: '90%' }}
                formatter={(value = 0) => `${value}%`}
                parser={(value) => value.replace('%', '')}
                defaultValue={0}
                min={0}
              ></InputNumber>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={22}>
                <Form.Item label="Annual leaves" name="no_holiday">
                  <InputNumber min={0} style={{ width: '95%' }}></InputNumber>
                </Form.Item>
              </Col>
              <Col span={2}>
                <p style={{ paddingTop: '36px' }}>day's</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item label="Hours of work/overtime">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <Form.Item name="working_hour">
                    <InputNumber min={0} style={{ width: '95%' }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={12}>hour per day</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form.Item name="overtime_hour">
                <Row>
                  <Col span={12}>
                    <Form.Item name="overtime_hour">
                      <InputNumber
                        min={0}
                        style={{ width: '95%' }}
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                  <Col span={12}>hours per week</Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label="Notice days">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <Form.Item name="notice_days">
                    <InputNumber min={0} style={{ width: '95%' }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ paddingLeft: '8px' }}>
                  hour per day
                </Col>
              </Row>
            </Col>
          </Row>
        </Form.Item>

        <Row>Expected salary</Row>

        <Row>
          <Col span={12}>
            <Form.Item
              name="salary_from"
              label={`From ${valueSelect.name}`}
              rules={[
                () => ({
                  validator(_, value) {
                    if (value && value > form.getFieldValue('salary_to'))
                      return Promise.reject(
                        new Error(
                          'Expected salary from must be smaller than expected salary to',
                        ),
                      );

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                onChange={handleChangeSalaryFrom}
                min={0}
                style={{ width: '95%' }}
                formatter={(value) => {
                  const str = value.toString();
                  const decimalIndex = str.indexOf('.');
                  const decimalPart =
                    decimalIndex >= 0 ? str.slice(decimalIndex) : '';
                  const integerPart =
                    decimalIndex >= 0 ? str.slice(0, decimalIndex) : str;
                  const formattedIntegerPart = integerPart
                    .split('')
                    .reverse()
                    .map((char, index) => {
                      if (index > 0 && index % 3 === 0) {
                        return `${char},`;
                      }
                      return char;
                    })
                    .reverse()
                    .join('');
                  return `${formattedIntegerPart}${decimalPart}`;
                }}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                precision={2}
              ></InputNumber>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="salary_to"
              label={`To ${valueSelect.name}`}
              rules={[
                () => ({
                  validator(_, value) {
                    if (value && value < form.getFieldValue('salary_from'))
                      return Promise.reject(
                        new Error(
                          'Expected salary to must be higher than expected salary from',
                        ),
                      );

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                onChange={handleChangeSalaryTo}
                min={0}
                style={{ width: '95%' }}
                formatter={(value) => {
                  const str = value.toString();
                  const decimalIndex = str.indexOf('.');
                  const decimalPart =
                    decimalIndex >= 0 ? str.slice(decimalIndex) : '';
                  const integerPart =
                    decimalIndex >= 0 ? str.slice(0, decimalIndex) : str;
                  const formattedIntegerPart = integerPart
                    .split('')
                    .reverse()
                    .map((char, index) => {
                      if (index > 0 && index % 3 === 0) {
                        return `${char},`;
                      }
                      return char;
                    })
                    .reverse()
                    .join('');
                  return `${formattedIntegerPart}${decimalPart}`;
                }}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                precision={2}
              ></InputNumber>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: '10px' }}
              >
                Save
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  form.resetFields();
                  setReset(!reset);
                }}
              >
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

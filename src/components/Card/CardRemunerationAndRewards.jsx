import { Card } from 'antd';
import { Form, Row, Col, InputNumber, Select } from 'antd';
import { FormItemBenefits } from '../Form/FormItemBenefits';
import { BENEFITS } from '../../utils/const';
import { useState } from 'react';
import { changeMoney } from '../../utils/const';

const { Option } = Select;
export const CardRemunerationAndRewards = ({ remuneration, form }) => {
  const [valueSelect, setValueSelect] = useState(remuneration.currency);

  const options = [
    { name: 'USD', id: 1 },
    { name: 'VND', id: 2 },
    { name: 'JPY', id: 3 },
    { name: 'EUR', id: 4 },
  ];

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
    form.validateFields(['salary_from']);
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
      <>
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
                      id={option.id}
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
            <Form.Item label="Pension scheme" name="benefit_pension_scheme">
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
                <Form.Item label="Annual leaves" name="benefit_no_holiday">
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
                  <Form.Item name="benefit_working_hour">
                    <InputNumber min={0} style={{ width: '95%' }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={12}>hour per day</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <Form.Item name="benefit_overtime_hour">
                    <InputNumber min={0} style={{ width: '95%' }}></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={12}>hours per week</Col>
              </Row>
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

        <Row style={{ marginTop: '12px' }}>Expected salary</Row>

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
      </>
    </Card>
  );
};

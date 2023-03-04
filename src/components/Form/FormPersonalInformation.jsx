import {
  Select,
  Form,
  Input,
  Row,
  Col,
  Radio,
  InputNumber,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNationality } from '../../store/nationalitySlice';
import { fetchPosition } from '../../store/positionSlice';
import { fetchDegree } from '../../store/degreeSlice';
import FormListEmail from './FormListEmail';
import { PlusOutlined } from '@ant-design/icons';

import {
  priority_status,
  DATES,
  MONTHS,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../utils/const';

const FormPersonalInformation = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const nationality = useSelector((state) => state.nationality.data);
  const position = useSelector((state) => state.position.data);
  const degree = useSelector((state) => state.degree.data);

  useEffect(() => {
    dispatch(fetchNationality());
    dispatch(fetchPosition());
    dispatch(fetchDegree());
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="First Name" required name="first_name">
            <Input placeholder="Please Input First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" required name="last_name">
            <Input placeholder="Please Input Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="Middle Name" name="middle_name">
            <Input placeholder="Please Input Middle Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="priority_status" label="Primary status">
            <Select
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Please Select Priority Status"
              optionFilterProp="children"
            >
              {priority_status.map((option) => {
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

      <Form.Item label="Birthday">
        <Row gutter={(12, 12)}>
          <Col span={4}>
            <Form.Item name="date_birthday">
              <Select
                allowClear
                showSearch
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder="Date"
              >
                {DATES.map((option) => {
                  return (
                    <Option key={option.key} value={option.key}>
                      {option.key}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="month_birthday">
              <Select
                allowClear
                showSearch
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder="Month"
                optionFilterProp="children"
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
          <Col span={4}>
            <Form.Item name="year_birthday">
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

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              {GENDERS.map((gender) => (
                <Radio value={gender.key} key={gender.key}>
                  {gender.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Marital Status" name="martial_status">
            <Radio.Group>
              {MARITAL_STATUS.map((gender) => (
                <Radio value={gender.key} key={gender.key}>
                  {gender.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item name="relocating_willingness" label="Ready to move">
            <Select
              style={{ width: '100%', borderRadius: '0px' }}
              defaultValue={1}
            >
              {READY_TO_MOVE.map((option) => {
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
        <Col span={12}>
          <Form.Item label="Source" name="source">
            <Input placeholder="Please input source" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <Form.Item name="nationality" label="Nationality">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%', borderRadius: '0px' }}
              optionFilterProp="children"
            >
              {nationality.map((option) => {
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

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <Form.Item name="positions" label="Position Applied">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%', borderRadius: '0px' }}
              optionFilterProp="children"
            >
              {position.map((option) => {
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

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <Form.Item name="highest_education" label="Highest Education">
            <Select
              allowClear
              style={{ width: '100%', borderRadius: '0px' }}
              optionFilterProp="children"
            >
              {degree.map((option) => {
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

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="Industry Year of Services" name="industry_years">
            <InputNumber min="0" defaultValue="0" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Year of Management" name="management_years">
            <InputNumber min="0" defaultValue="0" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="No. of Direct Reports" name="direct_reports">
            <InputNumber min="0" defaultValue="0" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)}>
        <Col span={24}>
          <Form.Item label="Email">
            <Form.List name="emails" initialValue={[{}]}>
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ key, name, isListField }) => {
                      return (
                        <FormListEmail
                          key={key}
                          name={name}
                          fieldKey={key}
                          form={form}
                          remove={remove}
                          fields={fields}
                          isListField={isListField}
                        />
                      );
                    })}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
export default FormPersonalInformation;

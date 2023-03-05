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

import { fetchNationality } from '../../../store/nationalitySlice';
import { fetchPosition } from '../../../store/positionSlice';
import { fetchDegree } from '../../../store/degreeSlice';
import { fetchPhoneNumber } from '../../../store/phoneNumberSlice';

import { FormSelectItem } from '../../../components/Form/FormSelectItem';
import { fetchCountries } from '../../../store/locationsSlice';

import { FormItemAddress } from './FormItemAddress';
import { FormItemPhone } from './FormItemPhone';
import { FormItemEmail } from './FormItemEmail';
import { FormItemInputText } from './FormItemInputText';
import { putDataCandidateType } from '../../../store/createCandidateSlice';
import { FormItemOption } from './FormItemOption';
import { FormItemRadio } from './FormItemRadio';
import { FormItemInputNumber } from './FormItemInputnumber';
import { FormItemSelectMultiple } from './FormItemSelectMultiple';

import {
  priority_status,
  DATES,
  MONTHS,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../../utils/const';

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
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const countries = useSelector((state) => state.locations.countries);
  const cities = useSelector((state) => state.locations.cities);
  const districts = useSelector((state) => state.locations.districts);
  const createCandidate = useSelector((state) => state.createCandidate.data);

  useEffect(() => {
    dispatch(fetchNationality());
    dispatch(fetchPosition());
    dispatch(fetchDegree());
    dispatch(fetchPhoneNumber());
    dispatch(fetchCountries({ type: 4 }));
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
    console.log('createCandidate', createCandidate);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    console.log('createCandidate', createCandidate);
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
          <FormItemInputText
            required={require}
            label="First Name"
            name="first_name"
            placeholder="First Name"
            message="Please type first name"
            actionDispatch={putDataCandidateType}
          />
        </Col>
        <Col span={12}>
          <FormItemInputText
            required={require}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            message="Please type last name"
            actionDispatch={putDataCandidateType}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <FormItemInputText
            label="Middle Name"
            name="middle_name"
            placeholder="Middle Name"
            actionDispatch={putDataCandidateType}
          />
        </Col>
        <Col span={12}>
          <FormItemOption
            name="priority_status"
            label="Primary status"
            options={priority_status}
            placeholder="Primary status"
            actionDispatch={putDataCandidateType}
          />
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
          <FormItemRadio
            label="Gender"
            name="gender"
            options={GENDERS}
            actionDispatch={putDataCandidateType}
          />
        </Col>
        <Col span={12}>
          <FormItemRadio
            label="Marital Status"
            name="martial_status"
            options={MARITAL_STATUS}
            actionDispatch={putDataCandidateType}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <FormItemOption
            name="relocating_willingness"
            label="Ready to move"
            options={READY_TO_MOVE}
            actionDispatch={putDataCandidateType}
            defaultValue={1}
          />
        </Col>
        <Col span={12}>
          <FormItemInputText
            label="Source"
            name="source"
            placeholder="Please input source"
            actionDispatch={putDataCandidateType}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <FormItemEmail form={form} />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <FormItemPhone form={form} phoneNumber={phoneNumber} />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <FormItemAddress
            form={form}
            countries={countries}
            cities={cities}
            districts={districts}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <FormItemSelectMultiple
            options={nationality}
            name="nationality"
            label="Nationality"
            actionDispatch={putDataCandidateType}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={24}>
          <FormItemSelectMultiple
            name="positions"
            label="Position Applied"
            options={position}
            actionDispatch={putDataCandidateType}
          />
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
          <FormItemInputNumber
            label="Industry Year of Services"
            name="industry_years"
            actionDispatch={putDataCandidateType}
          />
        </Col>
        <Col span={12}>
          <FormItemInputNumber
            label="Year of Management"
            name="management_years"
            actionDispatch={putDataCandidateType}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <FormItemInputNumber
            label="No. of Direct Reports"
            name="direct_reports"
            actionDispatch={putDataCandidateType}
          />
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

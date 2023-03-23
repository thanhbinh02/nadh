import { Row, Col, Form, Select } from 'antd';

import { FormItemSelectMultipleAdd } from '../FormItem/FormItemSelectMultipleAdd';
import { FormItemAddress } from '../FormItem/FormItemAddress';
import { FormItemBirthday } from '../FormItem/FormItemBirthday';
import { FormItemEmail } from '../FormItem/FormItemEmail';
import { FormItemRadio } from '../FormItem/FormItemRadio';
import { FormItemInput } from '../FormItem/FormItemInput';
import { FormItemOption } from '../FormItem/FormItemOption';
import { FormItemPhone } from '../FormItem/FormItemPhone';

import { getKeyWithLabel } from '../../utils/const';
import { getNationalityTest } from '../../apis/filterApi';
import { postNationality } from '../../store/nationalitySlice';

import {
  priority_status,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../utils/const';

const { Option } = Select;

export const FormPersonalInformation = ({
  form,
  phoneNumber,
  countries,
  degree,
  listCountry,
}) => {
  return (
    <>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInput
            required={require}
            label="First Name"
            name="first_name"
            placeholder="First Name"
            message="Please type first name"
            type="people"
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            required={require}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            message="Please type last name"
            type="people"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInput
            label="Middle Name"
            name="middle_name"
            placeholder="Middle Name"
            type="people"
          />
        </Col>
        <Col span={12}>
          <FormItemOption
            name="priority_status"
            label="Primary status"
            options={priority_status}
            placeholder="Primary status"
            form={form}
          />
        </Col>
      </Row>
      <FormItemBirthday form={form} />
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemRadio label="Gender" name="gender" options={GENDERS} />
        </Col>
        <Col span={12}>
          <FormItemRadio
            label="Marital Status"
            name="martial_status"
            options={MARITAL_STATUS}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemOption
            name="relocating_willingness"
            label="Ready to move"
            options={READY_TO_MOVE}
            form={form}
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            label="Source"
            name="source"
            placeholder="Please input source"
            type="text"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemEmail form={form} />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemPhone form={form} phoneNumber={phoneNumber} />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemAddress
            form={form}
            countries={countries}
            listCountry={listCountry}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemSelectMultipleAdd
            name="nationality"
            label="Nationality"
            placeholder="Select your nationality"
            form={form}
            getData={getNationalityTest}
            postData={postNationality}
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <Form.Item name="highest_education" label="Highest Education">
            <Select
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Select your highest education"
              optionFilterProp="children"
              onChange={(value, option) => {
                form.setFieldValue(
                  'highest_education',
                  getKeyWithLabel(option),
                );
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
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInput
            label="Industry Year of Services"
            name="industry_years"
            type="number"
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            label="Year of Management"
            name="management_years"
            type="number"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInput
            label="No. of Direct Reports"
            name="direct_reports"
            type="number"
          />
        </Col>
      </Row>
    </>
  );
};

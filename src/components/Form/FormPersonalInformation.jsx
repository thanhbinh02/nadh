import { Row, Col, Form, Select } from 'antd';

import { FormItemOption } from '../../Pages/Candidate/Components/FormItemOption';
import { FormItemRadio } from '../../Pages/Candidate/Components/FormItemRadio';
import { FormItemAddress } from '../../Pages/Candidate/Components/FormItemAddress';
import { FormItemPhone } from '../../Pages/Candidate/Components/FormItemPhone';
import { FormItemEmail } from '../../Pages/Candidate/Components/FormItemEmail';
import { FormItemBirthday } from '../../Pages/Candidate/Components/FormItemBirthday';
import { FormItemInput } from '../../Pages/Candidate/Components/FormItemInput';

import {
  priority_status,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../utils/const';

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
          <FormItemOption
            name="highest_education"
            label="Highest Education"
            options={degree}
            placeholder="Select your highest education"
            form={form}
          />
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

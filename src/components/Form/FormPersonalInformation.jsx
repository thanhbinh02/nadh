import { Row, Col } from 'antd';

import { getNationalityTest } from '../../apis/filterApi';
import { postNationality } from '../../store/nationalitySlice';
import { FormItemSelectNationality } from '../../Pages/Candidate/Components/FormItemSelectNationality';

import { FormItemOption } from '../../Pages/Candidate/Components/FormItemOption';
import { FormItemRadio } from '../../Pages/Candidate/Components/FormItemRadio';
import { FormItemAddress } from '../../Pages/Candidate/Components/FormItemAddress';
import { FormItemPhone } from '../../Pages/Candidate/Components/FormItemPhone';
import { FormItemEmail } from '../../Pages/Candidate/Components/FormItemEmail';
import { FormItemHighestEducation } from '../../Pages/Candidate/Components/FormItemHighestEducation';
import { FormItemBirthday } from '../../Pages/Candidate/Components/FormItemBirthday';
import { FormItemSelectNationalityDetail } from '../../Pages/Candidate/Components/FormItemSelectNationalityDetail';
import { FormItemInput } from '../../Pages/Candidate/Components/FormItemInput';

import {
  priority_status,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../utils/const';

export const FormPersonalInformation = ({
  defaultValue,
  form,
  phoneNumber,
  countries,
  cities,
  districts,
  createCandidate,
  keyNationality,
  degree,
  putCandidateType,
  putCandidateEmail,
  setCancel,
  cancel,
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
            actionDispatch={putCandidateType}
          />
        </Col>
      </Row>
      <FormItemBirthday form={form} actionDispatch={putCandidateType} />
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemRadio
            label="Gender"
            name="gender"
            options={GENDERS}
            actionDispatch={putCandidateType}
          />
        </Col>
        <Col span={12}>
          <FormItemRadio
            label="Marital Status"
            name="martial_status"
            options={MARITAL_STATUS}
            actionDispatch={putCandidateType}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemOption
            name="relocating_willingness"
            label="Ready to move"
            options={READY_TO_MOVE}
            actionDispatch={putCandidateType}
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            label="Source"
            name="source"
            placeholder="Please input source"
            actionDispatch={putCandidateType}
            type="text"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemEmail
            form={form}
            defaultValue={defaultValue?.emails}
            putCandidateEmail={putCandidateEmail}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemPhone
            form={form}
            phoneNumber={phoneNumber}
            defaultValue={defaultValue?.phones}
            putCandidateType={putCandidateType}
            cancel={cancel}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemAddress
            form={form}
            countries={countries}
            cities={cities}
            districts={districts}
            actionDispatch={putCandidateType}
            dataNewCandidate={createCandidate.addresses}
            defaultValue={defaultValue?.addresses}
            setCancel={setCancel}
            cancel={cancel}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          {!defaultValue ? (
            <FormItemSelectNationality
              name="nationality"
              label="Nationality"
              actionDispatch={putCandidateType}
              defaultValue={defaultValue?.nationality}
              getData={getNationalityTest}
              postData={postNationality}
              form={form}
              keyNewItem={keyNationality}
              placeholder="Select or add your nationality"
            />
          ) : (
            <FormItemSelectNationalityDetail
              name="nationality"
              label="Nationality"
              actionDispatch={putCandidateType}
              defaultValue={defaultValue?.nationality}
              getData={getNationalityTest}
              postData={postNationality}
              form={form}
              keyNewItem={keyNationality}
              placeholder="Select or add your nationality"
            />
          )}
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemHighestEducation
            name="highest_education"
            label="Highest Education"
            options={degree}
            placeholder="Select your highest education"
            actionDispatch={putCandidateType}
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

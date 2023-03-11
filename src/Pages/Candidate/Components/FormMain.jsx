import { Row, Col } from 'antd';

import { getNationalityTest } from '../../../apis/filterApi';
import { getPositionTest } from '../../../apis/filterApi';
import { postNationality } from '../../../store/nationalitySlice';
import { postPosition } from '../../../store/positionSlice';
import { FormItemSelectNationality } from './FormItemSelectNationality';

import { FormItemOption } from './FormItemOption';
import { FormItemRadio } from './FormItemRadio';
import { FormItemInputNumber } from './FormItemInputnumber';
import { FormItemAddress } from './FormItemAddress';
import { FormItemPhone } from './FormItemPhone';
import { FormItemEmail } from './FormItemEmail';
import { FormItemInputText } from './FormItemInputText';
import { FormItemHighestEducation } from './FormItemHighestEducation';
import { FormItemSelectPosition } from './FormItemSelectPosition';
import { FormItemBirthday } from './FormItemBirthday';

import {
  putDataCandidateType,
  putDataCandidatePositions,
} from '../../../store/createCandidateSlice';

import {
  priority_status,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../../utils/const';

export const FormMain = ({
  defaultValue,
  form,
  phoneNumber,
  countries,
  cities,
  districts,
  createCandidate,
  keyNationality,
  keyPosition,
  degree,
}) => {
  return (
    <>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputText
            required={require}
            label="First Name"
            name="first_name"
            placeholder="First Name"
            message="Please type first name"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.first_name}
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
            defaultValue={defaultValue?.last_name}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputText
            label="Middle Name"
            name="middle_name"
            placeholder="Middle Name"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.middle_name}
          />
        </Col>
        <Col span={12}>
          <FormItemOption
            name="priority_status"
            label="Primary status"
            options={priority_status}
            placeholder="Primary status"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.priority_status}
          />
        </Col>
      </Row>
      <FormItemBirthday
        form={form}
        actionDispatch={putDataCandidateType}
        defaultValue={defaultValue?.dob ? defaultValue?.dob : undefined}
      />
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemRadio
            label="Gender"
            name="gender"
            options={GENDERS}
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.gender}
          />
        </Col>
        <Col span={12}>
          <FormItemRadio
            label="Marital Status"
            name="martial_status"
            options={MARITAL_STATUS}
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.martial_status}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemOption
            name="relocating_willingness"
            label="Ready to move"
            options={READY_TO_MOVE}
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.priority_status}
          />
        </Col>
        <Col span={12}>
          <FormItemInputText
            label="Source"
            name="source"
            placeholder="Please input source"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.source}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemEmail form={form} defaultValue={defaultValue?.emails} />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemPhone
            form={form}
            phoneNumber={phoneNumber}
            defaultValue={defaultValue?.phones}
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
            actionDispatch={putDataCandidateType}
            dataNewCandidate={createCandidate.addresses}
            defaultValue={defaultValue?.addresses}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemSelectNationality
            name="nationality"
            label="Nationality"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.nationality}
            addItem
            getData={getNationalityTest}
            postData={postNationality}
            form={form}
            keyNewItem={keyNationality}
            placeholder="Select or add your nationality"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemSelectPosition
            name="positions"
            label="Position Applied"
            actionDispatch={putDataCandidatePositions}
            defaultValue={defaultValue?.prefer_position?.positions}
            addItem
            getData={getPositionTest}
            postData={postPosition}
            form={form}
            keyNewItem={keyPosition}
            placeholder="Select or add your position applied"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemHighestEducation
            name="highest_education"
            label="Highest Education"
            options={degree}
            placeholder="Select your highest education"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.highest_education?.key}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputNumber
            label="Industry Year of Services"
            name="industry_years"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.industry_years}
          />
        </Col>
        <Col span={12}>
          <FormItemInputNumber
            label="Year of Management"
            name="management_years"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.management_years}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputNumber
            label="No. of Direct Reports"
            name="direct_reports"
            actionDispatch={putDataCandidateType}
            defaultValue={defaultValue?.direct_reports}
          />
        </Col>
      </Row>
    </>
  );
};

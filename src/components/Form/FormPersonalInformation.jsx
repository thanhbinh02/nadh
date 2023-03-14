import { Row, Col } from 'antd';

import { getNationalityTest } from '../../apis/filterApi';
import { getPositionTest } from '../../apis/filterApi';
import { postNationality } from '../../store/nationalitySlice';
import { postPosition } from '../../store/positionSlice';
import { FormItemSelectNationality } from '../../Pages/Candidate/Components/FormItemSelectNationality';

import { FormItemOption } from '../../Pages/Candidate/Components/FormItemOption';
import { FormItemRadio } from '../../Pages/Candidate/Components/FormItemRadio';
import { FormItemInputNumber } from '../../Pages/Candidate/Components/FormItemInputnumber';
import { FormItemAddress } from '../../Pages/Candidate/Components/FormItemAddress';
import { FormItemPhone } from '../../Pages/Candidate/Components/FormItemPhone';
import { FormItemEmail } from '../../Pages/Candidate/Components/FormItemEmail';
import { FormItemInputText } from '../../Pages/Candidate/Components/FormItemInputText';
import { FormItemHighestEducation } from '../../Pages/Candidate/Components/FormItemHighestEducation';
import { FormItemSelectPosition } from '../../Pages/Candidate/Components/FormItemSelectPosition';
import { FormItemBirthday } from '../../Pages/Candidate/Components/FormItemBirthday';
import { FormItemSelectNationalityDetail } from '../../Pages/Candidate/Components/FormItemSelectNationalityDetail';

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
  keyPosition,
  degree,
  putCandidateType,
  putCandidatePositions,
  putCandidateEmail,
  setOpen,
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
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.first_name}
            form={form}
            setOpen={setOpen}
          />
        </Col>
        <Col span={12}>
          <FormItemInputText
            required={require}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
            message="Please type last name"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.last_name}
            form={form}
            setOpen={setOpen}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputText
            label="Middle Name"
            name="middle_name"
            placeholder="Middle Name"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.middle_name}
            form={form}
            setOpen={setOpen}
          />
        </Col>
        <Col span={12}>
          <FormItemOption
            name="priority_status"
            label="Primary status"
            options={priority_status}
            placeholder="Primary status"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.priority_status}
            form={form}
            setOpen={setOpen}
          />
        </Col>
      </Row>
      <FormItemBirthday
        form={form}
        actionDispatch={putCandidateType}
        defaultValue={defaultValue?.dob ? defaultValue?.dob : undefined}
        setOpen={setOpen}
      />
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemRadio
            label="Gender"
            name="gender"
            options={GENDERS}
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.gender}
            form={form}
            setOpen={setOpen}
          />
        </Col>
        <Col span={12}>
          <FormItemRadio
            label="Marital Status"
            name="martial_status"
            options={MARITAL_STATUS}
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.extra?.martial_status}
            form={form}
            setOpen={setOpen}
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
            defaultValue={defaultValue?.relocating_willingness}
            form={form}
            setOpen={setOpen}
          />
        </Col>
        <Col span={12}>
          <FormItemInputText
            label="Source"
            name="source"
            placeholder="Please input source"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.source}
            form={form}
            setOpen={setOpen}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          <FormItemEmail
            form={form}
            defaultValue={defaultValue?.emails}
            putCandidateEmail={putCandidateEmail}
            setOpen={setOpen}
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
            setOpen={setOpen}
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
            setOpen={setOpen}
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
              addItem
              getData={getNationalityTest}
              postData={postNationality}
              form={form}
              keyNewItem={keyNationality}
              placeholder="Select or add your nationality"
            />
          ) : (
            // <FormItemSelectNationalityDetail
            //   name="nationality"
            //   label="Nationality"
            //   actionDispatch={putCandidateType}
            //   defaultValue={defaultValue?.nationality}
            //   addItem
            //   getData={getNationalityTest}
            //   postData={postNationality}
            //   form={form}
            //   keyNewItem={keyNationality}
            //   placeholder="Select or add your nationality"
            //   setOpenSave={setOpen}
            // />
            <div></div>
          )}
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={24}>
          {/* <FormItemSelectPosition
            name="positions"
            label="Position Applied"
            actionDispatch={putCandidatePositions}
            defaultValue={defaultValue?.prefer_position?.positions}
            addItem
            getData={getPositionTest}
            postData={postPosition}
            form={form}
            keyNewItem={keyPosition}
            placeholder="Select or add your position applied"
            setOpen={setOpen}
          /> */}
          {!defaultValue ? (
            <FormItemSelectPosition
              name="positions"
              label="Position Applied"
              actionDispatch={putCandidatePositions}
              defaultValue={defaultValue?.prefer_position?.positions}
              addItem
              getData={getPositionTest}
              postData={postPosition}
              form={form}
              keyNewItem={keyPosition}
              placeholder="Select or add your position applied"
              setOpen={setOpen}
            />
          ) : (
            // <FormItemSelectNationalityDetail
            //   name="nationality"
            //   label="Nationality"
            //   actionDispatch={putCandidateType}
            //   defaultValue={defaultValue?.nationality}
            //   addItem
            //   getData={getNationalityTest}
            //   postData={postNationality}
            //   form={form}
            //   keyNewItem={keyNationality}
            //   placeholder="Select or add your nationality"
            //   setOpenSave={setOpen}
            // />
            <div></div>
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
            defaultValue={defaultValue?.highest_education?.key}
            form={form}
            setOpen={setOpen}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputNumber
            label="Industry Year of Services"
            name="industry_years"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.industry_years}
            form={form}
            setOpen={setOpen}
          />
        </Col>
        <Col span={12}>
          <FormItemInputNumber
            label="Year of Management"
            name="management_years"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.management_years}
            form={form}
            setOpen={setOpen}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={12}>
          <FormItemInputNumber
            label="No. of Direct Reports"
            name="direct_reports"
            actionDispatch={putCandidateType}
            defaultValue={defaultValue?.direct_reports}
            form={form}
            setOpen={setOpen}
          />
        </Col>
      </Row>
    </>
  );
};

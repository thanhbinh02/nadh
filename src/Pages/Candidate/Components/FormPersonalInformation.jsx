import {
  Select,
  Form,
  Input,
  Row,
  Col,
  Radio,
  InputNumber,
  Button,
  Modal,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

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
import {
  putDataCandidateType,
  putDataCandidatePositions,
} from '../../../store/createCandidateSlice';
import { FormItemOption } from './FormItemOption';
import { FormItemRadio } from './FormItemRadio';
import { FormItemInputNumber } from './FormItemInputnumber';
import { CustomButton } from '../../../components/CustomButton/CustomButton';

import { InfoCircleOutlined } from '@ant-design/icons';

import { getNationalityTest } from '../../../apis/filterApi';
import { postNationality } from '../../../store/nationalitySlice';
import { FormItemSelectNationality } from './FormItemSelectNationality';
import { postPosition } from '../../../store/positionSlice';
import { getPositionTest } from '../../../apis/filterApi';

import { FormItemSelectPosition } from './FormItemSelectPosition';
import { FormItemBirthday } from './FormItemBirthday';
import { postNewCandidate } from '../../../store/createCandidateSlice';
import { FormItemHighestEducation } from './FormItemHighestEducation';

import {
  priority_status,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../../utils/const';
const { Option } = Select;
const FormPersonalInformation = ({ setCurrentStep }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState();

  const checkCurrentCandidate = JSON.parse(
    window.localStorage.getItem('candidateDetail'),
  );

  const dispatch = useDispatch();
  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const degree = useSelector((state) => state.degree.data);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const countries = useSelector((state) => state.locations.countries);
  const cities = useSelector((state) => state.locations.cities);
  const districts = useSelector((state) => state.locations.districts);
  const createCandidate = useSelector((state) => state.createCandidate.data);

  const keyNationality = useSelector(
    (state) => state.nationality.keyNationality,
  );

  const keyPosition = useSelector((state) => state.position.keyPosition);

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
    setOpen(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    console.log('createCandidate', createCandidate);
  };

  const handleNextStep = () => {
    setCurrentStep(1);
    window.localStorage.setItem('currentStep', 1);
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(postNewCandidate(createCandidate));

    setTimeout(() => {
      setCurrentStep(Number(window.localStorage.getItem('currentStep')));
    }, 1000);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
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
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.first_name
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
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
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.last_name
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
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
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.middle_name
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
          <Col span={12}>
            <FormItemOption
              name="priority_status"
              label="Primary status"
              options={priority_status}
              placeholder="Primary status"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.priority_status
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        <FormItemBirthday
          form={form}
          actionDispatch={putDataCandidateType}
          defaultValue={
            checkCurrentCandidate ? checkCurrentCandidate.dob : undefined
          }
          check={checkCurrentCandidate ? true : false}
        />

        <Row gutter={(12, 12)}>
          <Col span={12}>
            <FormItemRadio
              label="Gender"
              name="gender"
              options={GENDERS}
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate ? checkCurrentCandidate.gender : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
          <Col span={12}>
            <FormItemRadio
              label="Marital Status"
              name="martial_status"
              options={MARITAL_STATUS}
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.martial_status
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
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
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.priority_status
                  : 1
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
          <Col span={12}>
            <FormItemInputText
              label="Source"
              name="source"
              placeholder="Please input source"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate ? checkCurrentCandidate.source : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={24}>
            <FormItemEmail
              form={form}
              defaultValue={
                checkCurrentCandidate ? checkCurrentCandidate.emails : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={24}>
            <FormItemPhone
              form={form}
              phoneNumber={phoneNumber}
              defaultValue={
                checkCurrentCandidate ? checkCurrentCandidate.phones : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        {/* <Row gutter={(12, 12)}>
          <Col span={24}>
            <FormItemAddress
              form={form}
              countries={countries}
              cities={cities}
              districts={districts}
            />
          </Col>
        </Row> */}
        {/* postPosition */}
        <Row gutter={(12, 12)}>
          <Col span={24}>
            <FormItemSelectNationality
              name="nationality"
              label="Nationality"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate ? checkCurrentCandidate.nationality : []
              }
              check={checkCurrentCandidate ? true : false}
              addItem
              getData={getNationalityTest}
              postData={postNationality}
              form={form}
              keyNewItem={keyNationality}
              placeholder="Select or add your nationality"
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={24}>
            <FormItemSelectPosition
              name="positions"
              label="Position Applied"
              actionDispatch={putDataCandidatePositions}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate?.prefer_position?.positions
                  : []
              }
              check={checkCurrentCandidate ? true : false}
              addItem
              getData={getPositionTest}
              postData={postPosition}
              form={form}
              keyNewItem={keyPosition}
              placeholder="Select or add your position applied"
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={24}>
            <FormItemHighestEducation
              name="highest_education"
              label="Highest Education"
              options={degree}
              placeholder="Select your highest education"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate?.highest_education?.key
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={12}>
            <FormItemInputNumber
              label="Industry Year of Services"
              name="industry_years"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.industry_years
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
          <Col span={12}>
            <FormItemInputNumber
              label="Year of Management"
              name="management_years"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.management_years
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={12}>
            <FormItemInputNumber
              label="No. of Direct Reports"
              name="direct_reports"
              actionDispatch={putDataCandidateType}
              defaultValue={
                checkCurrentCandidate
                  ? checkCurrentCandidate.direct_reports
                  : undefined
              }
              check={checkCurrentCandidate ? true : false}
            />
          </Col>
        </Row>

        <Row gutter={(12, 12)}>
          <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
            {checkCurrentCandidate ? (
              <Button type="primary" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Create And Next
              </Button>
            )}
          </Col>
        </Row>
        {open && (
          <Modal centered open={open} closable={false} footer={null}>
            <Row style={{ textAlign: 'center', margin: '20px' }}>
              <Col span={24}>
                <InfoCircleOutlined
                  style={{ fontSize: '80px', color: '#facea8' }}
                />
              </Col>
              <Col span={24}>
                <h2
                  style={{
                    fontSize: '28px',
                    marginTop: '20px',
                  }}
                >
                  Are you sure you want to create new candidate?
                </h2>
              </Col>
              <Col span={24}>
                <CustomButton agree content={'Yes'} onClick={handleAgree} />
                <CustomButton
                  reject
                  onClick={() => setOpen(false)}
                  content={'No'}
                />
              </Col>
            </Row>
          </Modal>
        )}
      </Form>
    </>
  );
};
export default FormPersonalInformation;

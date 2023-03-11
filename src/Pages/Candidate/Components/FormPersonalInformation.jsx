import { Form, Row, Col, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { fetchNationality } from '../../../store/nationalitySlice';
import { fetchPosition } from '../../../store/positionSlice';
import { fetchDegree } from '../../../store/degreeSlice';
import { fetchPhoneNumber } from '../../../store/phoneNumberSlice';
import { fetchCountries } from '../../../store/locationsSlice';
import { getNationalityTest } from '../../../apis/filterApi';
import { getPositionTest } from '../../../apis/filterApi';
import { postNationality } from '../../../store/nationalitySlice';
import { postPosition } from '../../../store/positionSlice';
import { postNewCandidate } from '../../../store/createCandidateSlice';
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
import { CustomButton } from '../../../components/CustomButton/CustomButton';

import { InfoCircleOutlined } from '@ant-design/icons';

import {
  priority_status,
  GENDERS,
  MARITAL_STATUS,
  READY_TO_MOVE,
} from '../../../utils/const';

const FormPersonalInformation = ({ setCurrentStep }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState();

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
  const postCandidateSuccess = useSelector(
    (state) => state.createCandidate.postCandidateSuccess,
  );

  const keyNationality = useSelector(
    (state) => state.nationality.keyNationality,
  );

  useEffect(() => {
    if (postCandidateSuccess) {
      setCurrentStep(1);
    }
  }, [postCandidateSuccess]);

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
    toast.error('Please recheck your form!', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  const handleAgree = () => {
    setOpen(false);
    dispatch(postNewCandidate(createCandidate));
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
        <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
          <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
            <Button type="primary" htmlType="submit">
              Create candidate
            </Button>
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

import { Steps, Row, Card, Breadcrumb, Form, Col, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CardFinish } from '../../components/Card/CardFinish';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { fetchDegree } from '../../store/degreeSlice';
import { toast } from 'react-toastify';
import { FormPersonalInformation } from '../../components/Form/FormPersonalInformation';
import { postNewCandidate } from '../../store/createCandidateSlice';

const CandidateAdd = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  window.localStorage.removeItem('filterCDD');
  const postCandidateSuccess = useSelector(
    (state) => state.createCandidate.postCandidateSuccess,
  );
  const degree = useSelector((state) => state.degree.data);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const countries = useSelector((state) => state.locations.countries);
  const listCountry = useSelector((state) => state.locations.countries);

  useEffect(() => {
    if (postCandidateSuccess) {
      setCurrentStep(1);
    }
    dispatch(fetchDegree());
    dispatch(fetchPhoneNumber());
    dispatch(fetchCountries({ type: 4 }));
  }, []);

  useEffect(() => {
    if (postCandidateSuccess) {
      setTimeout(() => {
        setCurrentStep(1);
      }, 1200);
    }
  }, [postCandidateSuccess]);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const onFinishFailed = () => {
    toast.error('Create failed', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  const onFinish = (value) => {
    console.log('onFinish', value);
    const {
      emails,
      date_birthday,
      month_birthday,
      year_birthday,
      addresses,
      phones,
      ...rest
    } = value;

    const newAddresses = addresses.filter((item) => item.country !== undefined);
    const newEmail = emails?.map((item) => item.email);
    const newPhone = phones?.map((item) => {
      if (!item.phone_code) {
        return {
          ...item,
          current: -1,
          phone_code: { key: 1280 },
        };
      } else {
        return {
          ...item,
          current: -1,
          phone_code: { key: item.phone_code },
        };
      }
    });
    const final = {
      ...rest,
      addresses: newAddresses,
      emails: newEmail,
      phones: newPhone,
    };

    const valueDispatch = {};

    for (let prop in final) {
      if (final[prop] !== undefined) {
        valueDispatch[prop] = final[prop];
      }
    }

    dispatch(postNewCandidate(valueDispatch));
  };

  return (
    <div style={{ margin: '20px' }}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/candidates">Candidates List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Create Candidate</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div style={{ fontSize: '20px', fontWeight: '600', margin: '10px 0' }}>
        Create Candidate
      </div>
      <Row style={{ margin: '14px' }}>
        <Steps
          current={currentStep}
          items={[
            {
              title: 'Personal Information',
            },
            {
              title: 'Finish',
            },
          ]}
        />
      </Row>
      <Row style={{ width: '100%' }}>
        {Number(currentStep) === 0 && (
          <Card
            title="Personal Information"
            style={{
              width: '100%',
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              autoComplete="off"
              initialValues={[]}
            >
              <FormPersonalInformation
                setCurrentStep={setCurrentStep}
                form={form}
                phoneNumber={phoneNumber}
                countries={countries}
                degree={degree}
                listCountry={listCountry}
              />

              <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
                <Col
                  span={24}
                  style={{ textAlign: 'right', marginTop: '10px' }}
                >
                  <Button type="primary" htmlType="submit">
                    Create candidate
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        )}
        {Number(currentStep) === 1 && (
          <CardFinish setCurrentStep={setCurrentStep} />
        )}
      </Row>
    </div>
  );
};
export default CandidateAdd;

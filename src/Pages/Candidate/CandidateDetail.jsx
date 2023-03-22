import React from 'react';
import { useParams } from 'react-router';
import { Breadcrumb, Row, Col, Button, Spin, Form, Card } from 'antd';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CardOverview } from '../../components/Card/CardOverview';
import FormSkillAndIndustry from './Components/FormSkillAndIndustry';
import { CardWorkingHistory } from '../../components/Card/CardWorkingHistory';
import { CardEducationAndCertificate } from '../../components/Card/CardEducationAndCertificate';
import { CardRemunerationAndRewards } from '../../components/Card/CardRemunerationAndRewards';
import { FormPersonalInformation } from '../../components/Form/FormPersonalInformation';

import {
  candidate_flow_status,
  priority_status,
  formatDate,
} from '../../utils/const';

import { fetchDetailCandidateSlice } from '../../store/detailCandidateSlice';
import { fetchDegree } from '../../store/degreeSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { fetchPosition } from '../../store/positionSlice';
import { fetchCountries } from '../../store/locationsSlice';

export const CandidateDetail = () => {
  const { candidate_id } = useParams();
  window.localStorage.removeItem('filterCDD');
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const listCountry = useSelector((state) => state.locations.countries);
  const degree = useSelector((state) => state.degree.data);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const countries = useSelector((state) => state.locations.countries);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  useEffect(() => {
    dispatch(fetchDetailCandidateSlice(candidate_id));
    dispatch(fetchPosition());
    dispatch(fetchDegree());
    dispatch(fetchPhoneNumber());
    dispatch(fetchCountries({ type: 4 }));
  }, []);

  const changeValueInitialPhoneValue = (array) => {
    const result = array?.map((item) => {
      return {
        current: item.current,
        number: item.number,
        phone_code: item.phone_code.key,
      };
    });
    return result;
  };

  const initialValues = {
    emails: detailCandidate?.emails
      ? detailCandidate?.emails?.map((email) => ({ email }))
      : [],
    overview_text_new: detailCandidate?.overview_text_new,
    first_name: detailCandidate?.first_name,
    last_name: detailCandidate?.last_name,
    middle_name: detailCandidate?.middle_name,
    priority_status: detailCandidate?.priority_status,
    dob: detailCandidate?.dob,
    date_birthday: detailCandidate?.dob
      ? formatDate(detailCandidate?.dob).date
      : null,
    month_birthday: detailCandidate?.dob
      ? formatDate(detailCandidate?.dob).month
      : null,
    year_birthday: detailCandidate?.dob
      ? formatDate(detailCandidate?.dob).year
      : null,
    gender: detailCandidate?.gender,
    martial_status: detailCandidate?.extra?.martial_status,
    relocating_willingness: detailCandidate?.relocating_willingness,
    source: detailCandidate?.source,
    nationality: detailCandidate?.nationality,
    highest_education: detailCandidate?.highest_education?.key,
    industry_years: detailCandidate?.industry_years || 0,
    management_years: detailCandidate?.management_years || 0,
    direct_reports: detailCandidate?.direct_reports || 0,
    phones: changeValueInitialPhoneValue(detailCandidate?.phones),
    addresses: detailCandidate?.addresses?.length
      ? detailCandidate?.addresses
      : [null],
  };

  const flowStatus = candidate_flow_status.find(
    (item) => item.id === detailCandidate?.flow_status,
  );

  const primaryStatus = priority_status.find(
    (item) => item.id === detailCandidate?.priority_status,
  );

  const onFinishFailed = () => {
    toast.error('Please check your form!', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  const handleDispatchSave = (values) => {
    console.log('Values', values);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOnValuesChange = () => {
    setOpen(true);
  };

  return (
    <>
      {detailCandidate.length === 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40vh',
          }}
        >
          <Spin size="large" tip="Loading" />
        </div>
      ) : (
        <>
          <Row
            style={{
              padding: '8px',
              paddingLeft: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Col span={16}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/candidates">Candidates List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span
                    style={{ fontWeight: '500' }}
                  >{`${candidate_id} - ${detailCandidate?.full_name?.toUpperCase()} - ${primaryStatus?.label?.toUpperCase()} - ${flowStatus?.label?.toUpperCase()} `}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={8}>
              <Button style={{ marginRight: '8px' }} type="primary">
                Download File PDF
              </Button>
              <Button type="primary">View PDF</Button>
            </Col>
          </Row>
          <Row
            gutter={(12, 12)}
            style={{
              padding: '8px 30px',
            }}
          >
            <Col span={16}>
              <Form.Provider value={true}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinishFailed={onFinishFailed}
                  onFinish={handleDispatchSave}
                  autoComplete="off"
                  initialValues={initialValues}
                  onValuesChange={handleOnValuesChange}
                >
                  <CardOverview />
                  <Card
                    title="Personal Information"
                    style={{
                      width: '100%',
                    }}
                  >
                    <FormPersonalInformation
                      form={form}
                      phoneNumber={phoneNumber}
                      countries={countries}
                      degree={degree}
                      listCountry={listCountry}
                    />
                  </Card>

                  {open && (
                    <Form.Item>
                      <div className="sticky-row">
                        <Button
                          style={{ marginRight: '12px' }}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                </Form>
                {/* <Card
                  title="Skills And Industry"
                  style={{
                    width: '100%',
                    marginTop: '24px',
                    marginBottom: '50px',
                  }}
                >
                  <FormSkillAndIndustry detailCandidate={detailCandidate} />
                </Card>
                <CardEducationAndCertificate
                  candidate_id={detailCandidate.id}
                />
                <CardWorkingHistory candidate_id={detailCandidate.id} />
                <CardRemunerationAndRewards
                  remuneration={detailCandidate.remuneration}
                /> */}
              </Form.Provider>
            </Col>
            <Col>Thanh Binh</Col>
          </Row>
        </>
      )}
    </>
  );
};

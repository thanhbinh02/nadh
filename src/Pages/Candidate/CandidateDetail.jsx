import React from 'react';
import { useParams } from 'react-router';
import { Breadcrumb, Row, Col, Button, Spin, Form, Card } from 'antd';

import { Link } from 'react-router-dom';
import { fetchDetailCandidateSlice } from '../../store/detailCandidateSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardOverview } from '../../components/Card/CardOverview';
import { CardFormPersonalInformationDetail } from '../../components/Card/CardFormPersonalInformationDetail';
import { useState } from 'react';
import { fetchDegree } from '../../store/degreeSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchNationality } from '../../store/nationalitySlice';
import { fetchPosition } from '../../store/positionSlice';
import { toast } from 'react-toastify';
import FormSkillAndIndustry from './Components/FormSkillAndIndustry';

import {
  putUserCandidateType,
  putUserCandidatePositions,
  putUserCandidateEmail,
  putNewDetailCandidate,
  changeIsPutSuccess,
} from '../../store/detailCandidateSlice';

import { candidate_flow_status } from '../../utils/const';
import { priority_status } from '../../utils/const';

export const CandidateDetail = () => {
  const { candidate_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const loading = useSelector((state) => state.detailCandidate.loading);
  const user = useSelector((state) => state.detailCandidate.user);
  const isPutSuccess = useSelector(
    (state) => state.detailCandidate.isPutSuccess,
  );

  const flowStatus = candidate_flow_status.find(
    (item) => item.id === detailCandidate?.flow_status,
  );

  const primaryStatus = priority_status.find(
    (item) => item.id === detailCandidate?.priority_status,
  );

  useEffect(() => {
    if (isPutSuccess === true) {
      setOpen(false);
      dispatch(changeIsPutSuccess());
    }
  }, [isPutSuccess]);

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  useEffect(() => {
    dispatch(fetchNationality());
    dispatch(fetchPosition());
    dispatch(fetchDegree());
    dispatch(fetchPhoneNumber());
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchDetailCandidateSlice(candidate_id));
  }, []);

  const onFinishFailed = () => {
    toast.error('Please check your form!', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  const handleDispatchSave = () => {
    const result = {};
    for (let prop in user) {
      if (user[prop] !== detailCandidate[prop]) {
        result[prop] = user[prop];
      }
    }
    const newData = {
      id: detailCandidate.id,
      params: result,
    };
    dispatch(putNewDetailCandidate(newData));
  };

  return (
    <>
      {loading ? (
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
              <Form
                form={form}
                layout="vertical"
                onFinishFailed={onFinishFailed}
                onFinish={handleDispatchSave}
                autoComplete="off"
              >
                <CardOverview
                  defaultValue={detailCandidate?.overview_text_new}
                  putCandidateType={putUserCandidateType}
                  form={form}
                  setOpen={setOpen}
                />
                <CardFormPersonalInformationDetail
                  defaultValue={detailCandidate}
                  form={form}
                  putCandidateType={putUserCandidateType}
                  putCandidatePositions={putUserCandidatePositions}
                  putCandidateEmail={putUserCandidateEmail}
                  setOpen={setOpen}
                />
                {open && (
                  <Form.Item>
                    <div className="sticky-row">
                      <Button
                        style={{ marginRight: '12px' }}
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        // onClick={handleDispatchSave}
                        htmlType="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </Form.Item>
                )}
              </Form>
              <Card
                title="Skills And Industry"
                style={{
                  width: '100%',
                  marginTop: '24px',
                  marginBottom: '50px',
                }}
              >
                <FormSkillAndIndustry detailCandidate={detailCandidate} />
              </Card>
            </Col>

            <Col>Thanh Binh</Col>
          </Row>
        </>
      )}
    </>
  );
};

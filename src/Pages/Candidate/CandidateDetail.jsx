import React from 'react';
import { useParams } from 'react-router';
import { Breadcrumb, Row, Col, Button, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { fetchDetailCandidateSlice } from '../../store/detailCandidateSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardOverview } from '../../components/Card/CardOverview';
import { CardSkillsAndIndustry } from '../../components/Card/CardSkillsAndIndustry';

export const CandidateDetail = () => {
  const { candidate_id } = useParams();
  const dispatch = useDispatch();
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const loading = useSelector((state) => state.detailCandidate.loading);

  useEffect(() => {
    dispatch(fetchDetailCandidateSlice(candidate_id));
  }, []);

  return (
    <>
      {' '}
      {loading ? (
        <Spin />
      ) : (
        <>
          <Row
            style={{
              padding: '8px 30px',
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
                  >{`${candidate_id} - ${detailCandidate?.full_name?.toUpperCase()} `}</span>
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
              <CardOverview />
              {/* <CardSkillsAndIndustry
                idCandidate={detailCandidate.id}
                dataDefault={detailCandidate.soft_skills}
              /> */}
            </Col>
            <Col>Thanh Binh</Col>
          </Row>
        </>
      )}
    </>
  );
};

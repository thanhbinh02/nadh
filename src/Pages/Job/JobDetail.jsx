import { useParams } from 'react-router';
import { Breadcrumb, Spin, Row, Col, Form, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchDetailJob } from '../../store/detailJobSlice';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchClients } from '../../store/clientsSlice';
import { fetchIndustries } from '../../store/categoriesSlice';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { putBusinessLineJobsSlice } from '../../store/businessLineSlice';

import { TableActivityLogs } from '../../components/Table/TableActivityLogs';
import { TablePickCandidatesJob } from '../../components/Table/TablePickCandidatesJob';
import { CardJobDescription } from '../../components/Card/CardJobDescription';
import { FormItemBusinessLine } from '../../components/FormItem/FormItemBusinessLine';
import { CardAttachments } from '../../components/Card/CardAttachments';
import { CardComment } from '../../components/Card/CardComment';

export const JobDetail = () => {
  const { job_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const detailJob = useSelector((state) => state.detailJob.data);
  const loadingDetailJob = useSelector((state) => state.detailJob.loading);

  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);
  const files = useSelector((state) => state.file.files);

  useEffect(() => {
    dispatch(fetchDetailJob(job_id));
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchClients({ getAll: true }));
    dispatch(fetchIndustries({ type: 1 }));
  }, []);

  useEffect(() => {
    dispatch(fetchDetailJob(job_id));
  }, [job_id]);

  const handleFinish = (values) => {
    console.log('Value', values);
    console.log('isPutSuccess ');
  };

  return (
    <>
      {detailJob?.job_id !== job_id ? (
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
          {detailJob.length !== 0 && (
            <Row
              style={{
                padding: '10px 34px',
              }}
            >
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/clients">Clients List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {job_id} | {detailJob?.name}
                </Breadcrumb.Item>
              </Breadcrumb>
              <Col span={24}>
                <Form layout="horizontal" onFinish={handleFinish} form={form}>
                  <Card
                    title="Industry"
                    bordered={false}
                    style={{
                      width: '100%',
                      marginTop: '40px',
                    }}
                  >
                    <FormItemBusinessLine
                      data={industries}
                      optionTwo={sectors}
                      optionThree={categories}
                      typeTwo={2}
                      fetchDataItemTwo={fetchSectors}
                      fetchDataItemThree={fetchCategories}
                      typeThree={3}
                      businessLine={detailJob?.business_line}
                      form={form}
                      id={detailJob?.id}
                      actionDispatch={putBusinessLineJobsSlice}
                      type="client"
                    />
                  </Card>

                  <CardJobDescription
                    form={form}
                    job_id={job_id}
                    detailJob={detailJob}
                  />

                  <Row>
                    <Col span={24}>
                      <Card
                        bordered={false}
                        style={{
                          width: '100%',
                          marginTop: '40px',
                        }}
                      >
                        <TablePickCandidatesJob
                          detailJob={detailJob}
                          form={form}
                        />
                      </Card>

                      <CardComment detailJob={detailJob} form={form} />

                      <CardAttachments
                        files={files}
                        obj_uid={detailJob.id}
                        nameObj="job"
                      />

                      <Card
                        title="Activity Logs"
                        bordered={false}
                        style={{
                          width: '100%',
                          marginTop: '40px',
                        }}
                      >
                        <TableActivityLogs data={detailJob?.logs} />
                      </Card>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};

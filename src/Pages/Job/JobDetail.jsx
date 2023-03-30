import { useParams } from 'react-router';
import { Breadcrumb, Spin, Row, Col, Form, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TableActivityLogs } from '../../components/Table/TableActivityLogs';
import { fetchDetailJob } from '../../store/detailJobSlice';
import { CardInfoJob } from '../../components/Card/CardInfoJob';
import moment from 'moment';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchClients } from '../../store/clientsSlice';
import { TablePickCandidatesJob } from '../../components/Table/TablePickCandidatesJob';
import { CardJobDescription } from '../../components/Card/CardJobDescription';
import { fetchIndustries } from '../../store/categoriesSlice';
import { FormItemBusinessLine } from '../../components/FormItem/FormItemBusinessLine';
import { putNewDetailJob } from '../../store/detailJobSlice';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { putBusinessLineJobsSlice } from '../../store/businessLineSlice';
import { CardAttachments } from '../../components/Card/CardAttachments';
import { CommentClient } from '../../components/CommentClient';
import { FormCkeditor } from '../../components/Form/FormCkeditor';
import { CardComment } from '../../components/Card/CardComment';

export const JobDetail = () => {
  const { job_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const detailJob = useSelector((state) => state.detailJob.data);
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

  const handleFinish = (values) => {
    console.log('Value', values);
  };

  return (
    <>
      {detailJob?.length === 0 ? (
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
            <Form
              layout="horizontal"
              onFinish={handleFinish}
              form={form}
              initialValues={
                {
                  // title: detailJob?.title,
                  // department: detailJob?.department,
                  // quantity: detailJob?.quantity,
                  // type: detailJob?.type,
                  // experience_level: detailJob?.experience_level,
                  // status: detailJob?.status,
                  // extend_date: moment(detailJob?.extend_date),
                  // country: detailJob?.location?.country,
                  // city: detailJob?.location?.city,
                }
              }
            >
              {/* <CardInfoJob detailJob={detailJob} form={form} /> */}

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
                    <TablePickCandidatesJob detailJob={detailJob} form={form} />
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
  );
};

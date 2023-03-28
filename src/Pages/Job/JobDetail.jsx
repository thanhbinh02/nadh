import { useParams } from 'react-router';
import { Breadcrumb, Spin, Row, Col, Form, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormItemBusinessLine } from '../../components/FormItem/FormItemBusinessLine';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { putBusinessLineClientSlice } from '../../store/businessLineSlice';
import { TableActivityLogs } from '../../components/Table/TableActivityLogs';
import { TableContactPerson } from '../../components/Table/TableContactPerson';
import { fetchDetailJob } from '../../store/detailJobSlice';
import { CardInfoJob } from '../../components/Card/CardInfoJob';
import moment from 'moment';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchClients } from '../../store/clientsSlice';
import { TablePickCandidatesJob } from '../../components/Table/TablePickCandidatesJob';
import { FormCkeditor } from '../../components/Form/FormCkeditor';
import { SocialWrapper } from '../../components/SocialMedia/SocialWrapper';

export const JobDetail = () => {
  const { job_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const detailJob = useSelector((state) => state.detailJob.data);

  // console.log('DetailJob', detailJob);

  useEffect(() => {
    dispatch(fetchDetailJob(job_id));
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchClients({ getAll: true }));
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
              initialValues={{
                title: detailJob?.title,
                department: detailJob?.department,
                quantity: detailJob?.quantity,
                type: detailJob?.type,
                experience_level: detailJob?.experience_level,
                status: detailJob?.status,
                extend_date: moment(detailJob?.extend_date),
                country: detailJob?.location?.country,
                city: detailJob?.location?.city,
              }}
            >
              <CardInfoJob detailJob={detailJob} form={form} />

              <Row>
                <Col span={24}>
                  <Card
                    bordered={false}
                    style={{
                      width: '100%',
                      marginTop: '40px',
                    }}
                  >
                    <TablePickCandidatesJob />
                  </Card>
                  <Card
                    title="Job Description"
                    bordered={false}
                    style={{
                      width: '100%',
                      marginTop: '40px',
                    }}
                  >
                    <SocialWrapper
                      data={detailJob?.social_media}
                      job_id={job_id}
                    />
                    {/* <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          RESPONSIBILITIES / DAILY DUTIES
                        </p>
                        <FormCkeditor
                          name="responsibility"
                          form={form}
                          data={detailJob?.responsibility}
                        />
                      </Col>
                      <Col span={12}>
                        <p className="text-label-ckeditor">ROLE EXPECTATIONS</p>
                        <FormCkeditor
                          name="expectation"
                          form={form}
                          data={detailJob?.expectation}
                        />
                      </Col>
                    </Row>

                    <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          MEASURES of SUCCESS? KPIs
                        </p>
                        <FormCkeditor
                          name="kpi"
                          form={form}
                          data={detailJob?.kpi}
                        />
                      </Col>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          SELLING POINT of THE ROLE
                        </p>
                        <FormCkeditor
                          name="selling_point"
                          form={form}
                          data={detailJob?.selling_point}
                        />
                      </Col>
                    </Row>

                    <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          DEPARTMENT STRUCTURE
                        </p>
                        <FormCkeditor
                          name="department_structure"
                          form={form}
                          data={detailJob?.department_structure}
                        />
                      </Col>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          COMPETENCIES / BEHAVIOURS
                        </p>
                        <FormCkeditor
                          name="competency"
                          form={form}
                          data={detailJob?.competency}
                        />
                      </Col>
                    </Row>

                    <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          DEVELOPMENT OPPORTUNITIES
                        </p>
                        <FormCkeditor
                          name="development_opportunity"
                          form={form}
                          data={detailJob?.development_opportunity}
                        />
                      </Col>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          SUCCESSFUL FILL RATE
                        </p>
                        <FormCkeditor
                          name="fill_rate"
                          form={form}
                          data={detailJob?.fill_rate}
                        />
                      </Col>
                    </Row>

                    <Row gutter={(12, 12)} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <p className="text-label-ckeditor">
                          RECRUITMENT PROCESS
                        </p>
                        <FormCkeditor
                          name="recruitment_process"
                          form={form}
                          data={detailJob?.recruitment_process}
                        />
                      </Col>
                    </Row> */}
                  </Card>
                  expectation
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

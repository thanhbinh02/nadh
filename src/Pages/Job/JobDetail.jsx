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

export const JobDetail = () => {
  const { job_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const detailJob = useSelector((state) => state.detailJob.data);

  console.log('detailJob', detailJob);

  useEffect(() => {
    dispatch(fetchDetailJob(job_id));
  }, []);

  const handleFinish = (values) => {
    console.log('Value', values);
  };

  return (
    <>
      {detailJob.length === 0 ? (
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
            <Form onFinish={handleFinish} form={form} initialValues={{}}>
              <Row>
                <Col span={24}></Col>
              </Row>

              <Row>
                <Col span={24}>
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

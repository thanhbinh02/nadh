import { useParams } from 'react-router';
import { Breadcrumb, Spin, Row, Col, Form, Button } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailClientSlice } from '../../store/detailClientSlice';
import { Link } from 'react-router-dom';
import { CardInfoClient } from '../../components/Card/CardInfoClient';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchClients } from '../../store/clientsSlice';
import { fetchUsers } from '../../store/usersSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';

export const ClientDetail = () => {
  const { client_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const detailClient = useSelector((state) => state.detailClient.data);

  useEffect(() => {
    dispatch(fetchDetailClientSlice(client_id));
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchClients());
    dispatch(fetchUsers());
    dispatch(fetchPhoneNumber());
  }, []);

  const handleFinish = (values) => {
    console.log('Value', values);
  };

  return (
    <>
      {detailClient.length === 0 ? (
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
              {client_id} | {detailClient.name}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Col span={24}>
            <Form
              onFinish={handleFinish}
              form={form}
              initialValues={{
                name: detailClient?.name,
                address: {
                  country: detailClient?.address?.country,
                  city: detailClient?.address?.city,
                  district: detailClient?.address?.district,
                  address: detailClient?.address?.address,
                },
                email: detailClient?.email,
                status: detailClient?.status,
                code: detailClient?.code,
                parent_company: detailClient?.parent_company,
                type: detailClient?.type,
                cpa: detailClient?.cpa,
                lead_consultants: detailClient?.lead_consultants,
                phone: {
                  number: detailClient?.phone?.number,
                  phone_code: detailClient?.phone?.phone_code?.key,
                },
                fax: {
                  number: detailClient?.fax?.number,
                  phone_code: detailClient?.fax?.phone_code?.key,
                },
                factory_site_0: {
                  country: detailClient?.factory_site[0]?.country,
                  city: detailClient?.factory_site[0]?.city,
                  district: detailClient?.factory_site[0]?.district,
                  address: detailClient?.factory_site[0]?.address,
                },
                factory_site_1: {
                  country: detailClient?.factory_site[1]?.country,
                  city: detailClient?.factory_site[1]?.city,
                  district: detailClient?.factory_site[1]?.district,
                  address: detailClient?.factory_site[1]?.address,
                },
              }}
            >
              <CardInfoClient detailClient={detailClient} form={form} />
              <Button type="primary" htmlType="submit">
                Create Job
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

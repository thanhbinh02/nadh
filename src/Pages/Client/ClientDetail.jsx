import { useParams } from 'react-router';
import { Breadcrumb, Spin, Row, Col, Form, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailClientSlice } from '../../store/detailClientSlice';
import { Link } from 'react-router-dom';
import { CardInfoClient } from '../../components/Card/CardInfoClient';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchClients } from '../../store/clientsSlice';
import { fetchUsers } from '../../store/usersSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { fetchIndustries } from '../../store/categoriesSlice';
import { TableActivityLogs } from '../../components/Table/TableActivityLogs';
import { TableContactPerson } from '../../components/Table/TableContactPerson';
import { changePostFileSuccess } from '../../store/fileSlice';

export const ClientDetail = () => {
  const { client_id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const detailClient = useSelector((state) => state.detailClient.data);
  const loadingClient = useSelector((state) => state.detailClient.loading);

  useEffect(() => {
    dispatch(fetchDetailClientSlice(client_id));
  }, [client_id]);

  useEffect(() => {
    // dispatch(fetchDetailClientSlice(client_id));
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchClients());
    dispatch(fetchUsers());
    dispatch(fetchPhoneNumber());
    dispatch(fetchIndustries({ type: 1 }));
  }, []);

  const handleFinish = (values) => {
    console.log('Value', values);
  };

  return (
    <>
      {loadingClient ? (
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
          {detailClient?.length !== 0 && (
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
                  {client_id} | {detailClient?.name}
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

                  <Row>
                    <Col span={16}>
                      {/* <Card
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
                        businessLine={detailClient?.business_line}
                        form={form}
                        id={detailClient?.id}
                        actionDispatch={putBusinessLineClientSlice}
                        type="client"
                      />
                    </Card> */}

                      <Card
                        bordered={false}
                        style={{
                          width: '100%',
                          marginTop: '40px',
                        }}
                      >
                        <TableContactPerson
                          client_id={detailClient?.id}
                          detailClient={detailClient}
                        />
                      </Card>
                    </Col>
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
                        <TableActivityLogs data={detailClient?.logs} />
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

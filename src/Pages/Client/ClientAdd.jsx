import {
  Row,
  Col,
  Breadcrumb,
  Card,
  Form,
  Input,
  Button,
  Modal,
  Steps,
} from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { FormItemPhoneTax } from '../../components/FormItem/FormItemPhoneTax';
import { fetchUsers } from '../../store/usersSlice';
import { FormItemOption } from '../../components/FormItem/FormItemOption';
import { fetchCountries } from '../../store/locationsSlice';
import { FormAddress } from '../../components/FormItem/FormAddress';
import { getParentCompany } from '../../store/clientsSlice';
import { STATUS_CLIENT, CPA, TYPE_CLIENT } from '../../utils/const';
import { FormIndustry } from '../../components/FormItem/FormIndustry';
import { getLocations } from '../../apis/filterApi';
import {
  fetchIndustries,
  fetchSectors,
  fetchCategories,
} from '../../store/categoriesSlice';
import { toast } from 'react-toastify';
import { postNewClient } from '../../store/createClientSlice';
import { CardFinish } from '../../components/Card/CardFinish';
import { FormCountryCity } from '../../components/Form/FormCountryCity';

const changeValueDispatch = (value) => {
  const {
    address,
    business_line,
    code,
    cpa,
    email,
    fax,
    lead_consultants,
    name,
    parent_id,
    phone,
    status,
    tax_code,
    type,
  } = value;

  const newBusinessLine = business_line?.map((obj) => {
    const resultObj = {};
    if (obj.category) {
      resultObj.category_id = obj.category.key;
    }
    if (obj.industry) {
      resultObj.industry_id = obj.industry.key;
    }
    if (obj.sector) {
      resultObj.sector_id = obj.sector.key;
    }
    return resultObj;
  });

  let newAddress;
  if (address?.country !== undefined) {
    newAddress = Object.entries(address).reduce((acc, [key, val]) => {
      if (val !== undefined) {
        acc[key] = val;
      }
      return acc;
    }, {});
  }

  let newPhone;
  if (phone?.phone_code === undefined) {
    newPhone = { phone_code: { key: '1280' }, number: Number(phone?.number) };
  } else {
    newPhone = {
      phone_code: { key: phone?.phone_code },
      number: Number(phone?.number),
    };
  }

  let newFax;
  if (fax?.phone_code === undefined && fax.number !== undefined) {
    newFax = { phone_code: { key: '1280' }, number: Number(fax?.number) };
  }
  if (fax.phone_code !== undefined && fax.number !== undefined) {
    newFax = {
      phone_code: { key: fax?.phone_code },
      number: Number(fax?.number),
    };
  }

  const final = {
    address: newAddress,
    business_line: newBusinessLine,
    code: code,
    cpa: cpa,
    email: email,
    fax: newFax,
    lead_consultants:
      lead_consultants !== undefined ? [lead_consultants] : undefined,
    name: name,
    phone: newPhone,
    status: status,
    type: type,
    tax_code: tax_code,
    parent_id: parent_id,
  };

  let newClient = {};

  for (let prop in final) {
    if (final[prop] !== undefined && final[prop] !== {}) {
      newClient[prop] = final[prop];
    }
  }
  return newClient;
};

export const ClientAdd = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const clients = useSelector((state) => state.clients.data).map(
    ({ id, name }) => ({
      key: id,
      label: name,
    }),
  );

  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);
  const newClient = useSelector((state) => state.createClient.newClient);
  const isSuccessCreateClient = useSelector(
    (state) => state.createClient.isSuccessCreateClient,
  );

  const users = useSelector((state) => state.users.data).map(
    ({ id, full_name }) => ({
      key: id,
      label: full_name,
    }),
  );

  useEffect(() => {
    dispatch(fetchPhoneNumber());
    dispatch(fetchUsers());
    dispatch(fetchCountries({ type: 4 }));
    dispatch(getParentCompany());
    dispatch(fetchIndustries({ type: 1 }));
  }, []);

  const onFinish = (value) => {
    const data = changeValueDispatch(value);
    console.log('value', value);
    console.log('Data', data);
    // dispatch(postNewClient(data));
  };

  const onFinishFailed = () => {
    toast.error('Create failed! Check your form', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  useEffect(() => {
    if (isSuccessCreateClient) {
      setTimeout(() => {
        setCurrentStep(1);
      }, 1200);
    }
  }, [isSuccessCreateClient]);

  return (
    <div style={{ margin: '20px' }}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/clients">Client List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Create client</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div style={{ fontSize: '20px', fontWeight: '600', margin: '10px 0' }}>
        Create client
      </div>
      <Row style={{ margin: '14px' }}>
        <Steps
          current={currentStep}
          items={[
            {
              title: 'Client Information',
            },
            {
              title: 'Finish',
            },
          ]}
        />
      </Row>

      <Row style={{ width: '100%' }}>
        {Number(currentStep) === 0 && (
          <Form
            layout="vertical"
            style={{
              width: '100%',
            }}
            form={form}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Card
              title="CLIENT INFORMATION"
              bordered={false}
              style={{
                width: '100%',
              }}
            >
              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={12}>
                  <Form.Item
                    label="Trade Name"
                    required
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter trade name!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="PLEASE ENTER TRADE NAME"
                      style={{ width: '100%' }}
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Client's Shortened Name" name="code">
                    <Input
                      placeholder="PLEASE ENTER CODE"
                      style={{ width: '100%' }}
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={12}>
                  <FormItemPhoneTax
                    phoneNumber={phoneNumber}
                    label="Phone"
                    required
                    message="Please enter phone number"
                    name="phone"
                  />
                </Col>
                <Col span={12}>
                  <FormItemPhoneTax
                    phoneNumber={phoneNumber}
                    label="Fax"
                    nameChild="fax"
                    name="fax"
                  />
                </Col>
              </Row>

              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={12}>
                  <FormItemOption
                    options={users}
                    name="lead_consultants"
                    label="Lead consultant*"
                    placeholder="Please select lead consultant"
                    required
                    message="Please select lead consultant"
                  />
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tax_code"
                    label="Tax code"
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Please enter tax code!',
                      },
                    ]}
                  >
                    <Input placeholder="Please enter text code"></Input>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                    ]}
                  >
                    <Input placeholder="ex: email@gmail.com"></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Address">
                    <FormAddress form={form} name="address" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={12}>
                  <FormItemOption
                    options={clients}
                    name="parent_id"
                    label="Parent company"
                    placeholder="Please select parent company"
                  />
                </Col>
                <Col span={12}>
                  <FormItemOption
                    options={STATUS_CLIENT}
                    name="status"
                    label="Status"
                    placeholder="Please select status"
                  />
                </Col>
              </Row>

              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={12}>
                  <FormItemOption
                    options={CPA}
                    name="cpa"
                    label="CPA"
                    placeholder="Please select cpa"
                  />
                </Col>
                <Col span={12}>
                  <FormItemOption
                    options={TYPE_CLIENT}
                    name="type"
                    label="Type"
                    placeholder="Please select type"
                  />
                </Col>
              </Row>

              <Row gutter={(12, 12)} style={{ marginBottom: '18px' }}>
                <Col span={24}>
                  <Form.Item label="Industry" name="business_line">
                    <FormIndustry
                      form={form}
                      industries={industries}
                      sectors={sectors}
                      categories={categories}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">
                    Create Job
                  </Button>
                </Col>
              </Row>
            </Card>
          </Form>
        )}
        {Number(currentStep) === 1 && (
          <CardFinish
            setCurrentStep={setCurrentStep}
            viewDetail={`/client-detail/${newClient.client_id}`}
            createNew="/client-add"
          />
        )}
      </Row>
    </div>
  );
};

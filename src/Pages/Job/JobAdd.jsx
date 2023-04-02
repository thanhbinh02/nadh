import { Row, Col, Breadcrumb, Card, Form, Button, Steps } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { CardFinish } from '../../components/Card/CardFinish';
import { postNewJob } from '../../store/createJobSlice';
import { FormItemSelectOneAdd } from '../../components/FormItem/FormItemSelectOneAdd';
import { getPositionTest } from '../../apis/filterApi';
import { postPosition } from '../../store/positionSlice';
import { getDepartmentTest } from '../../apis/filterApi';
import { postDepartment } from '../../store/departmentSlice';
import { FormItemInput } from '../../components/FormItem/FormItemInput';
import { TYPE_JOB, EXPERIENCE_LEVEL } from '../../utils/const';
import { FormItemOption } from '../../components/FormItem/FormItemOption';
import { fetchClients } from '../../store/clientsSlice';
import { FormItemBirthday } from '../../components/FormItem/FormItemBirthday';
import { FormCountryCity } from '../../components/Form/FormCountryCity';
import { fetchCountries } from '../../store/locationsSlice';
import { fetchUsers } from '../../store/usersSlice';
import { FormItemSelectMultiple } from '../../components/FormItem/FormItemSelectMultiple';
import { FormIndustry } from '../../components/FormItem/FormIndustry';
import { fetchIndustries } from '../../store/categoriesSlice';

const changeValueDispatch = (value) => {
  const {
    business_line,
    client_id,
    department,
    experience_level,
    country,
    city,
    quantity,
    recruiters,
    related_users,
    dob,
    title,
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

  const newLocation = (country, city) => {
    if (city !== undefined && country !== undefined) {
      return {
        country: country,
        city: city,
      };
    }

    if (city === undefined && country !== undefined) {
      return {
        country: country,
      };
    }

    return undefined;
  };

  const newRelatedUsers = (related_users) => {
    if (related_users.length !== 0) {
      const newValue = related_users.map((item) => {
        return item.key;
      });
      return newValue;
    }
    return undefined;
  };

  const final = {
    business_line: newBusinessLine,
    client_id: client_id,
    department: department,
    experience_level: experience_level,
    location: newLocation(country, city),
    quantity: quantity,
    recruiters: [recruiters] || undefined,
    related_users: newRelatedUsers(related_users),
    target_date: dob,
    title: title,
    type: type,
  };

  let newJob = {};

  for (let prop in final) {
    if (final[prop] !== undefined && final[prop] !== {}) {
      newJob[prop] = final[prop];
    }
  }
  return newJob;
};

export const JobAdd = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const newJob = useSelector((state) => state.createJob.newJob);
  const clients = useSelector((state) => state.clients.data);
  const users = useSelector((state) => state.users.data);
  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);

  const isSuccessCreateJob = useSelector(
    (state) => state.createJob.isSuccessCreateJob,
  );

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    dispatch(
      fetchClients({
        status: '9,10,11',
        lead_consultants: JSON.parse(localStorage.getItem('user_sent'))?.id,
        getAll: true,
      }),
    );
    dispatch(fetchUsers());
    dispatch(fetchIndustries({ type: 1 }));
  }, []);

  const onFinish = (value) => {
    dispatch(postNewJob(changeValueDispatch(value)));
  };

  const onFinishFailed = () => {
    toast.error('Create failed! Check your form', {
      autoClose: 1000,
      position: 'top-right',
    });
  };

  useEffect(() => {
    if (isSuccessCreateJob) {
      setTimeout(() => {
        setCurrentStep(1);
      }, 1200);
    }
  }, [isSuccessCreateJob]);

  return (
    <div style={{ margin: '20px' }}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/jobs">Job List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Create job</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div style={{ fontSize: '20px', fontWeight: '600', margin: '10px 0' }}>
        Create Job
      </div>
      <Row style={{ margin: '14px' }}>
        <Steps
          current={currentStep}
          items={[
            {
              title: 'Job Information',
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
              title="JOB INFORMATION"
              bordered={false}
              style={{
                width: '100%',
              }}
            >
              <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                  <FormItemSelectOneAdd
                    name="title"
                    label="Title"
                    placeholder="Select or add title"
                    postData={postPosition}
                    form={form}
                    getData={getPositionTest}
                    required
                    message="Please select title"
                  />
                </Col>
                <Col span={12}>
                  <FormItemSelectOneAdd
                    name="department"
                    label="Department"
                    placeholder="Select or add department"
                    postData={postDepartment}
                    form={form}
                    getData={getDepartmentTest}
                    required
                    message="Please select department"
                  />
                </Col>
              </Row>
              <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                  <FormItemInput
                    label="Quantity"
                    name="quantity"
                    type="number"
                    required={true}
                    message="Please enter quantity"
                  />
                </Col>
                <Col span={12}>
                  <FormItemOption
                    options={TYPE_JOB}
                    name="type"
                    label="Type"
                    placeholder="Please select type"
                    required
                    message="Please select type"
                    allowClear={true}
                  />
                </Col>
              </Row>
              <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                  <FormItemOption
                    options={EXPERIENCE_LEVEL}
                    name="experience_level"
                    label="Experience Level"
                    placeholder="Please select experience level"
                    required
                    message="Please select experience level*"
                    allowClear={true}
                  />
                </Col>
                <Col span={12}>
                  <FormItemOption
                    options={clients.map((client) => {
                      return { key: client.id, label: client?.name };
                    })}
                    name="client_id"
                    label="Client name"
                    placeholder="Please select client name"
                    required
                    message="Please select client name"
                    allowClear={true}
                  />
                </Col>
              </Row>
              <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                  <FormItemBirthday label="Opening Date" form={form} />
                </Col>
                <Col span={12}>
                  <FormCountryCity form={form} label="Location" />
                </Col>
              </Row>
              <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
                <Col span={12}>
                  <FormItemOption
                    options={users.map((client) => {
                      return { key: client.id, label: client?.full_name };
                    })}
                    name="recruiters"
                    label="Search Consultant "
                    placeholder="Please select search consultant"
                    required
                    message="Please select search consultant"
                    allowClear={true}
                  />
                </Col>
                <Col span={12}>
                  <FormItemSelectMultiple
                    options={users.map((client) => {
                      return { key: client.id, label: client?.full_name };
                    })}
                    name="related_users"
                    label="Mapping by"
                    placeholder="Please select mapping by"
                    form={form}
                  />
                </Col>
              </Row>
              <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                  <Form.Item
                    label="Industry"
                    name="business_line"
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Please select Industry',
                      },
                    ]}
                  >
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
            viewDetail={`/job-detail/${newJob.job_id}`}
            createNew="/job-add"
          />
        )}
      </Row>
    </div>
  );
};

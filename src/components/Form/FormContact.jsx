import React, { useEffect } from 'react';
import { Form, Row, Col, Checkbox, Button } from 'antd';
import { FormItemInput } from '../FormItem/FormItemInput';
import { useQuery } from 'react-query';
import { getContactPersonsClient } from '../../apis/clientsApi';
import { postNewContactPersonsSlice } from '../../store/detailClientSlice';
import { useDispatch } from 'react-redux';
import {
  fetchDetailClientSliceNotLoading,
  putContactPersonsSlice,
} from '../../store/detailClientSlice';
import { deleteContact } from '../../store/detailClientSlice';

export const FormContact = ({
  initialValues,
  setModalOpen,
  type,
  client_id,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { data } = useQuery(['contactPerson', initialValues?.id], () => {
    if (type === 'edit') {
      return getContactPersonsClient(initialValues?.id);
    }
  });

  console.log('initialValues', initialValues);

  const onFinish = async (values) => {
    const dataFinal = {
      ...values,
      client_id: client_id.client_id,
      role: 1,
      jobs_count: values?.jobs_count ? values?.jobs_count : null,
      phone_codes: {
        key: '1280',
        label: 'Viet Nam',
        extra: { code: 'VN', dial_code: '+84' },
      },
    };
    console.log('dataFinal', dataFinal);

    let final = {};
    for (let prop in dataFinal) {
      if (dataFinal[prop] !== undefined) {
        final[prop] = dataFinal[prop];
      }
    }

    if (type === 'add') {
      dispatch(postNewContactPersonsSlice(final))
        .unwrap()
        .then(() => {
          dispatch(fetchDetailClientSliceNotLoading(client_id.client_id));
          setModalOpen(false);
        })
        .catch(() => {
          setModalOpen(false);
        });
    } else {
      const newData = {
        id: data?.id,
        params: final,
      };
      console.log('data', data);
      dispatch(putContactPersonsSlice(newData));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('errorInfo', errorInfo);
  };

  useEffect(() => {
    if (type === 'edit' && data) {
      form.setFieldValue('name', data?.name);
      form.setFieldValue('title', data?.title);
      form.setFieldValue('email', data?.email);
      form.setFieldValue('telephone', data?.telephone);
      form.setFieldValue('mobile_phone', data?.mobile_phone);
      form.setFieldValue('fax', data?.fax);
      form.setFieldValue('department', data?.department);
      form.setFieldValue('current', data?.current === 'true' ? true : false);
      form.validateFields(['name', 'email', 'title']);
    } else {
      form.resetFields();
    }
  }, [data, form, initialValues, type]);

  const handleDelete = async () => {
    await dispatch(deleteContact(initialValues.id));
    await setModalOpen(false);
  };

  return (
    <Form
      layout="vertical"
      style={{
        width: '100%',
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={[]}
    >
      <Row gutter={(12, 12)}>
        <Col
          span={12}
          style={{
            textAlign: 'left',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          {initialValues?.length !== 0 ? (
            <>Edit Contact Person</>
          ) : (
            <>Add Contact Person</>
          )}
        </Col>
        {initialValues?.length !== 0 && (
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button type="primary" danger onClick={handleDelete}>
              Delete
            </Button>
          </Col>
        )}
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <FormItemInput
            type="text"
            label="Name"
            required
            message="Please input name"
            placeholder="Please input name"
            name="name"
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            type="text"
            label="Title"
            required
            message="Please input title"
            placeholder="Please input title"
            name="title"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Form.Item
            label="Current Contact"
            name="current"
            valuePropName="checked"
          >
            <Checkbox>Current Contact</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <FormItemInput name="email" type="email" label="Email" required />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <FormItemInput
            type="numberText"
            label="Telephone"
            placeholder="Please input telephone"
            name="telephone"
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            type="numberText"
            label="Mobile Phone"
            placeholder="Please input mobile phone"
            name="mobile_phone"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <FormItemInput
            type="numberText"
            label="Fax"
            placeholder="Please input fax"
            name="fax"
          />
        </Col>
        <Col span={12}>
          <FormItemInput
            type="text"
            label="Department"
            placeholder="Please input department"
            name="department"
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <FormItemInput
            type="text"
            label="Job(s)"
            placeholder="Please input job"
            disabled
            name="jobs_count"
          />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Form.Item>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '10px' }}
            >
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

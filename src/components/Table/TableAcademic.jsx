import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { Table, Row, Col, Button, Modal, Form, Checkbox, Input } from 'antd';
import { useState, useEffect } from 'react';
import { ModalAddEducation } from '../Modal/ModalAddEducation';
import { FormEducation } from '../Form/FormEducation';

export const TableAcademic = ({ data }) => {
  const columns = [
    {
      title: 'Current Schooly',
      dataIndex: 'status_current',
      render: (text) => {
        if (text === 1) {
          return <div>Is current school</div>;
        } else return null;
      },
    },
    {
      title: 'Start Year',
      dataIndex: 'start_time',
      render: (text) => {
        return <div>{text}</div>;
      },
    },

    {
      title: 'Graduation Year',
      dataIndex: 'end_time',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'School',
      dataIndex: 'organization',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Major',
      dataIndex: 'title',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return <BsPencil style={{ color: 'red', cursor: 'pointer' }} />;
      },
    },
  ];
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <Row>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: '600' }}>ACADEMIC</div>
        <Button type="primary" ghost onClick={() => setModal2Open(true)}>
          Add Education
        </Button>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          //   dataSource={data}
          pagination={{
            pageSize: 5,
          }}
        />
      </Col>
      <Modal centered open={modal2Open} closable={false} footer={null}>
        <Row style={{ textAlign: 'left', fontSize: '18px', fontWeight: '600' }}>
          Add Education
        </Row>
        <FormEducation />
      </Modal>
    </Row>
  );
};

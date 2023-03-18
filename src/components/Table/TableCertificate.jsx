import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { Table, Row, Col, Button } from 'antd';

export const TableCertificate = ({ data }) => {
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
        <Button type="primary" ghost>
          Add Certificate
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
    </Row>
  );
};

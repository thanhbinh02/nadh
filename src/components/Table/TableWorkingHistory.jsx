import React from 'react';
import { Table, Row, Col, Button, Modal, Spin } from 'antd';
import { useState } from 'react';
import { FormWorkingHistory } from '../Form/FormWorkingHistory';
import { useSelector } from 'react-redux';
import { BsPencil } from 'react-icons/bs';

export const TableWorkingHistory = ({ candidate_id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useSelector((state) => state.detailCandidate.history).filter(
    (item) => item.type === 2,
  );

  const isLoadingWorkingHistory = useSelector(
    (state) => state.detailCandidate.isLoadingWorkingHistory,
  );

  const columns = [
    {
      title: 'Company',
      dataIndex: 'organization',
      render: (text) => {
        return <div style={{ textTransform: 'uppercase' }}>{text?.label}</div>;
      },
    },
    {
      title: 'Position',
      dataIndex: 'title',
      render: (text) => {
        return <div>{text?.label}</div>;
      },
    },

    {
      title: 'Start Time',
      dataIndex: 'start_time',
      render: (text, record) => {
        const dateParts = text.split('-');
        if (record.start_time_month_flag === 1) {
          const result1 = `${dateParts[1]}-${dateParts[0]}`;
          return <div>{result1}</div>;
        } else {
          const result2 = dateParts[0];
          return <div>{result2}</div>;
        }
      },
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      render: (text, record) => {
        if (text === null) {
          return <div>present</div>;
        } else {
          const dateParts = text.split('-');
          if (record.end_time_month_flag === 1) {
            const result1 = `${dateParts[1]}-${dateParts[0]}`;
            return <div>{result1}</div>;
          } else {
            const result2 = dateParts[0];
            return <div>{result2}</div>;
          }
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <BsPencil
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setModalOpen(true);
              setInitialValues(record);
            }}
          />
        );
      },
    },
  ];

  const newData = history?.map((item, index) => ({
    ...item,
    key: index,
  }));

  return (
    <Row style={{ marginBottom: '10px' }}>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: '600' }}>
          WORKING HISTORY
        </div>
        <Button
          type="primary"
          ghost
          onClick={() => {
            setModalOpen(true);
            setInitialValues([]);
          }}
        >
          Add Working History
        </Button>
      </Col>
      <Col span={24}>
        {isLoadingWorkingHistory ? (
          <Spin tip="Loading...">
            <Table
              columns={columns}
              scroll={{ x: '50vw' }}
              pagination={{
                pageSize: 5,
                current: currentPage,
              }}
              dataSource={newData}
            />
          </Spin>
        ) : (
          <Table
            columns={columns}
            scroll={{ x: '50vw' }}
            pagination={{
              pageSize: 5,
              current: currentPage,
              onChange: (page) => {
                setCurrentPage(page);
              },
            }}
            dataSource={newData}
          />
        )}
      </Col>

      <Modal
        centered
        open={modalOpen}
        closable={false}
        footer={null}
        className="modal-add-education"
      >
        <FormWorkingHistory
          setModalOpen={setModalOpen}
          candidate_id={candidate_id}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </Modal>
    </Row>
  );
};

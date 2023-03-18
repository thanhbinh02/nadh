import React, { useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import { Table, Row, Col, Button, Modal, Spin } from 'antd';
import { useState } from 'react';
import { FormEducation } from '../Form/FormEducation';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/const';

export const TableAcademic = ({ candidate_id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useSelector((state) => state.detailCandidate.history).filter(
    (item) => item.type === 1,
  );

  const isLoadingAcademic = useSelector(
    (state) => state.detailCandidate.isLoadingAcademic,
  );

  const columns = [
    {
      title: 'Current School',
      dataIndex: 'status',
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
        return <div>{formatDate(text)?.year}</div>;
      },
    },

    {
      title: 'Graduation Year',
      dataIndex: 'end_time',
      render: (text) => {
        return <div>{formatDate(text)?.year}</div>;
      },
    },
    {
      title: 'School',
      dataIndex: 'organization',
      render: (text) => {
        return <div>{text?.label}</div>;
      },
    },
    {
      title: 'Major',
      dataIndex: 'title',
      render: (text) => {
        return <div>{text?.label}</div>;
      },
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      render: (text) => {
        return <div>{text?.label}</div>;
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

  return (
    <>
      {history && (
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
            <Button
              type="primary"
              ghost
              onClick={() => {
                setModalOpen(true);
                setInitialValues([]);
              }}
            >
              Add Education
            </Button>
          </Col>
          <Col span={24}>
            {isLoadingAcademic ? (
              <Spin tip="Loading...">
                <Table
                  columns={columns}
                  pagination={{
                    pageSize: 5,
                    current: currentPage,
                  }}
                  dataSource={history}
                />
              </Spin>
            ) : (
              <Table
                columns={columns}
                pagination={{
                  pageSize: 5,
                  current: currentPage,
                  onChange: (page) => {
                    setCurrentPage(page);
                  },
                }}
                dataSource={history}
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
            <Row
              style={{
                textAlign: 'left',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              Add Education
            </Row>
            <FormEducation
              setModalOpen={setModalOpen}
              candidate_id={candidate_id}
              initialValues={initialValues}
              modalOpen={modalOpen}
              setInitialValues={setInitialValues}
            />
          </Modal>
        </Row>
      )}
    </>
  );
};

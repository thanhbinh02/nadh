import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { Table, Row, Col, Button, Modal, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../utils/const';
import { fetchSchool } from '../../store/schoolSlice';
import { fetchDegreeCertificate } from '../../store/degreeSlice';
import { FormCertificate } from '../Form/FormCertificate';

export const TableCertificate = ({ candidate_id }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const degree = useSelector((state) => state.degree.dataCertificate);
  const school = useSelector((state) => state.school.data);
  const itemSchool = useSelector((state) => state.school.item);

  useEffect(() => {
    dispatch(fetchDegreeCertificate());
    dispatch(fetchSchool());
  }, []);

  const history = useSelector((state) => state.detailCandidate.history).filter(
    (item) => item.type === 3,
  );

  const isLoadingCertificate = useSelector(
    (state) => state.detailCandidate.isLoadingCertificate,
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
      title: 'Degree',
      dataIndex: 'title',
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

  const newData = history?.map((item, index) => ({
    ...item,
    key: index,
  }));

  return (
    <>
      {newData && (
        <Row>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              CERTIFICATE
            </div>
            <Button
              type="primary"
              ghost
              onClick={() => {
                setModalOpen(true);
                setInitialValues([]);
              }}
            >
              Add Certificate
            </Button>
          </Col>
          <Col span={24}>
            {isLoadingCertificate ? (
              <Spin tip="Loading...">
                <Table
                  scroll={{ x: '80vw' }}
                  columns={columns}
                  pagination={{
                    pageSize: 5,
                    current: currentPage,
                  }}
                  dataSource={newData}
                />
              </Spin>
            ) : (
              <Table
                scroll={{ x: '80vw' }}
                columns={columns}
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
            <FormCertificate
              setModalOpen={setModalOpen}
              candidate_id={candidate_id}
              initialValues={initialValues}
              modalOpen={modalOpen}
              setInitialValues={setInitialValues}
              degree={degree}
              school={school}
              itemSchool={itemSchool}
              type={3}
            />
          </Modal>
        </Row>
      )}
    </>
  );
};

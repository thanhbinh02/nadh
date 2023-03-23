import { useEffect, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Col, Button, Modal, Spin } from 'antd';

import { FormEducation } from '../Form/FormEducation';
import { formatDate } from '../../utils/const';

import { fetchDegree } from '../../store/degreeSlice';
import { fetchSchool } from '../../store/schoolSlice';
import { fetchMajor } from '../../store/majorSlice';

export const TableAcademic = ({ candidate_id }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const degree = useSelector((state) => state.degree.data);
  const school = useSelector((state) => state.school.data);
  const major = useSelector((state) => state.school.data);
  const itemSchool = useSelector((state) => state.school.item);
  const itemMajor = useSelector((state) => state.major.item);

  useEffect(() => {
    dispatch(fetchDegree());
    dispatch(fetchSchool());
    dispatch(fetchMajor());
  }, []);

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

  const newData = history?.map((item, index) => ({
    ...item,
    key: index,
  }));

  return (
    <>
      {newData && (
        <Row style={{ marginBottom: '10px' }}>
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
              {initialValues.length === 0 ? (
                <>Add Education</>
              ) : (
                <>Edit Education</>
              )}
            </Button>
          </Col>
          <Col span={24}>
            {isLoadingAcademic ? (
              <Spin tip="Loading...">
                <Table
                  scroll={{ x: '60vw' }}
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
                scroll={{ x: '60vw' }}
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
            <FormEducation
              setModalOpen={setModalOpen}
              candidate_id={candidate_id}
              initialValues={initialValues}
              modalOpen={modalOpen}
              setInitialValues={setInitialValues}
              degree={degree}
              school={school}
              major={major}
              itemSchool={itemSchool}
              itemMajor={itemMajor}
            />
          </Modal>
        </Row>
      )}
    </>
  );
};

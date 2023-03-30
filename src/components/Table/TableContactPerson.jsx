import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Row, Col, Button, Modal, Spin } from 'antd';
import { BsPencil } from 'react-icons/bs';
import { FormContact } from '../Form/FormContact';
import { MdNotInterested } from 'react-icons/md';

export const TableContactPerson = ({ client_id, detailClient }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisabled, setIsDisabled] = useState(
    detailClient?.status === 12 ? true : false,
  );

  console.log('detailClient', detailClient?.status);
  console.log('isDisabled', isDisabled);

  useEffect(() => {
    if (detailClient?.status === 12) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [detailClient]);

  const contactPerson = useSelector(
    (state) => state.detailClient.contactPerson,
  );

  const isLoadingContactPerson = useSelector(
    (state) => state.detailClient.isLoadingContactPerson,
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Current Contact',
      dataIndex: 'current',
      render: (text) => {
        if (text === 'true') {
          return <div>Current contact</div>;
        }
      },
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile_phone',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Job(s)',
      dataIndex: 'jobs_count',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <>
            {isDisabled ? (
              <MdNotInterested
                style={{ cursor: 'not-allowed', color: 'red' }}
              />
            ) : (
              <BsPencil
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setModalOpen(true);
                  setInitialValues(record);
                  // dispatch(fetchDetailContactPersonsClient(record.id));
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  const newData = contactPerson?.map((item, index) => ({
    ...item,
    key: item?.id,
  }));

  return (
    <Row style={{ marginBottom: '10px' }}>
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <Row style={{ fontSize: '18px', fontWeight: '500' }}>
          Contact Person
        </Row>
        <Button
          type="primary"
          ghost
          onClick={() => {
            setModalOpen(true);
            setInitialValues([]);
          }}
          disabled={isDisabled}
          // disabled={true}
        >
          New Contact
        </Button>
      </Col>
      <Col span={24}>
        {isLoadingContactPerson ? (
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
        open={modalOpen}
        closable={false}
        footer={null}
        className="modal-add-education"
      >
        <FormContact
          initialValues={initialValues}
          setModalOpen={setModalOpen}
          type={initialValues.length === 0 ? 'add' : 'edit'}
          setInitialValues={setInitialValues}
          client_id={client_id}
        />
      </Modal>
    </Row>
  );
};

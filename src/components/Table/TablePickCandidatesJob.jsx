import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Row, Col, Button, Modal, Spin, Drawer } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { candidate_flow_status } from '../../utils/const';
import { DrawerCandidateDetail } from '../DrawerCandidateDetail';

function getStatusLabels(array, status) {
  if (status.length !== 0) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
      if (status.includes(array[i].id)) {
        result += array[i].label + ' -> ';
      }
    }
    return result.slice(0, -4);
  }
}

export const TablePickCandidatesJob = () => {
  const [openDraw, setOpenDraw] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [valueDrawer, setValueDrawer] = useState([]);

  const candidate_flows = useSelector(
    (state) => state.detailJob.candidate_flows,
  );

  const isLoadingContactPerson = useSelector(
    (state) => state.detailClient.isLoadingContactPerson,
  );

  const findStatus = (text) => {
    return candidate_flow_status.find((item) => item.id === text)?.label;
  };

  const columns = [
    {
      title: 'Candidate ID',
      dataIndex: 'candidate_id',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Highest Degree',
      dataIndex: 'highest_education',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Recent Position',
      dataIndex: 'histories',
      render: (text) => {
        return <div>{text?.map((item) => item.title.label).join(', ')}</div>;
      },
    },
    {
      title: 'Previous Status',
      dataIndex: 'previous_status',
      render: (text) => {
        return <div>{getStatusLabels(candidate_flow_status, text)}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <AiOutlineEye
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDraw(true);
              setValueDrawer(record);
              // dispatch(fetchDetailContactPersonsClient(record.id));
            }}
          />
        );
      },
    },
  ];

  const newData = candidate_flows?.map((item, index) => ({
    key: item?.id,
    candidate_id: item?.candidate?.candidate_id,
    full_name: item?.candidate?.full_name,
    highest_education: item?.candidate?.highest_education?.label,
    histories: item?.candidate?.histories,
    previous_status: item?.previous_status,
    status: findStatus(item?.status),
    createdAt: item?.createdAt,
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
        }}
      >
        <Row style={{ fontSize: '18px', fontWeight: '500' }}>
          Candidates List
        </Row>
        <Button type="primary" ghost onClick={() => {}}>
          Pick Candidates
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

      <DrawerCandidateDetail
        valueDrawer={valueDrawer}
        openDraw={openDraw}
        setOpenDraw={setOpenDraw}
      />
    </Row>
  );
};

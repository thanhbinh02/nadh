import React from 'react';
import { Row, Col, Drawer } from 'antd';
import { useEffect } from 'react';
import { candidate_flow_status } from '../utils/const';
import { changeTime } from '../utils/const';

export const DrawerCandidateDetail = ({
  openDraw,
  setOpenDraw,
  valueDrawer,
}) => {
  const onClose = () => {
    setOpenDraw(false);
  };

  useEffect(() => {}, [valueDrawer]);

  return (
    <Drawer
      title="Candidate Detail"
      placement="right"
      closable={false}
      onClose={onClose}
      open={openDraw}
      key="right"
      width={450}
    >
      <Row style={{ marginBottom: '16px' }}>
        <Col span={8} style={{ fontWeight: '500' }}>
          ID
        </Col>
        <Col span={16}>{valueDrawer?.candidate_id}</Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col span={8} style={{ fontWeight: '500' }}>
          Full name
        </Col>
        <Col span={16}> {valueDrawer?.full_name}</Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col span={8} style={{ fontWeight: '500' }}>
          Create at
        </Col>
        <Col span={16}>{changeTime(valueDrawer?.createdAt)}</Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col span={8} style={{ fontWeight: '500' }}>
          Status
        </Col>
        <Col span={16}>{valueDrawer?.status}</Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col span={8} style={{ fontWeight: '500' }}>
          Highest Education
        </Col>
        <Col span={16}>{valueDrawer?.highest_education}</Col>
      </Row>
      <Row style={{ marginBottom: '16px' }}>
        <Col span={8} style={{ fontWeight: '500' }}>
          Current Job
        </Col>
        <Col span={16}>
          {valueDrawer?.histories?.map((item) => item.title.label).join(', ')}
        </Col>
      </Row>
    </Drawer>
  );
};

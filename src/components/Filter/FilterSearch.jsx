import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const FilterSearch = ({ children }) => {
  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button size="small" style={{ width: '100%', borderRadius: '0px' }}>
            Reset
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="small"
            style={{ width: '100%', borderRadius: '0px' }}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </Col>
        <Col span={24}> {children}</Col>
      </Row>
    </Card>
  );
};

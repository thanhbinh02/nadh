import React from 'react';
import { Button, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ButtonReset } from '../CustomButton/ButtonReset';

export const FilterResetSearch = ({ onClick, disable }) => {
  return (
    <>
      <Col span={12}>
        <ButtonReset />
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          size="small"
          style={{ width: '100%', borderRadius: '0px' }}
          icon={<SearchOutlined />}
          onClick={onClick}
          disable={disable}
        >
          Search
        </Button>
      </Col>
    </>
  );
};

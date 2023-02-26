import React from 'react';
import { Row, Col } from 'antd';
import { logo } from '../../assets/images';
import { DropDownInfo } from './DropDownInfo';

export const Header = () => {
  return (
    <Row
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '55px',
        background: 'linear-gradient(98deg,#4286f4,#00ce7f 60%)',
      }}
    >
      <Col style={{ marginLeft: '30px' }}>
        <img
          src={logo.image}
          width={90}
          alt=""
          style={{ objectFit: 'cover' }}
        />
      </Col>
      <Col style={{ marginRight: '30px' }}>
        <DropDownInfo />
      </Col>
    </Row>
  );
};

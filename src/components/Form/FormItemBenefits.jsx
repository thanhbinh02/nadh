import React, { useEffect } from 'react';
import { Form, Col, Radio, Row, Input } from 'antd';
import { useState } from 'react';

export const FormItemBenefits = ({ item, form }) => {
  const [value, setValue] = useState(form.getFieldValue(item.name_radio));

  if (form.getFieldValue(item.name_radio) === 1 && value === -1) {
    setValue(1);
  }

  if (form.getFieldValue(item.name_radio) === -1 && value === 1) {
    setValue(-1);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {}, [value]);

  return (
    <Col span={12} style={{ marginBottom: '12px' }}>
      <Row>
        <Col span={8}>
          <Form.Item label={item.label} style={{ marginBottom: '4px' }}>
            <Row>
              <Form.Item name={item.name_radio}>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Yes</Radio>
                  <Radio value={-1}>No</Radio>
                </Radio.Group>
              </Form.Item>
            </Row>
          </Form.Item>
        </Col>
        <Col span={16} style={{ marginTop: '28px' }}>
          {value === 1 && (
            <Form.Item name={item.name_text}>
              <Input placeholder="Note"></Input>
            </Form.Item>
          )}
        </Col>
      </Row>
    </Col>
  );
};

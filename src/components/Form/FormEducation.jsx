import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Input,
  Select,
  Space,
  Form,
  Row,
  Checkbox,
  Col,
} from 'antd';
import { useRef, useState } from 'react';

let index = 0;

const { Option } = Select;
export const FormEducation = ({ setModalOpen, degree, school }) => {
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Form
      layout="vertical"
      style={{
        width: '100%',
      }}
    >
      <Row gutter={(12, 12)} style={{ marginBottom: '14px' }}>
        <Col span={24}>
          <Form.Item>
            <Checkbox>Current school</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '14px' }}>
        <Col span={12}>
          <Form.Item name="start_time" label="Start year">
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Start year"
              optionFilterProp="children"
            >
              {yearsRange.map((option) => {
                return (
                  <Option key={option.key} value={option.key}>
                    {option.key}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="end_time" label="Graduation year">
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Graduation year"
              optionFilterProp="children"
            >
              {yearsRange.map((option) => {
                return (
                  <Option key={option.key} value={option.key}>
                    {option.key}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={(12, 12)} style={{ marginBottom: '14px' }}>
        <Col span={24}>
          <Form.Item label="School">
            <Select
              style={{
                width: '100%',
              }}
              placeholder="Select or Add School"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <Space
                    style={{
                      padding: '0 8px 4px',
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '14px' }}>
        <Col span={24}>
          <Form.Item label="Major">
            <Select
              style={{
                width: '100%',
              }}
              placeholder="Select or Add Major"
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <Space
                    style={{
                      padding: '0 8px 4px',
                    }}
                  >
                    <Input
                      placeholder="Please enter item"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add item
                    </Button>
                  </Space>
                </>
              )}
              options={items.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '14px' }}>
        <Col span={24}>
          <Form.Item label="Degree" required>
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Select degree"
              optionFilterProp="children"
            >
              {degree?.map((option) => {
                return (
                  <Option key={option.key} value={option.key}>
                    {option.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            onClick={() => setModalOpen(false)}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={() => setModalOpen(false)}>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

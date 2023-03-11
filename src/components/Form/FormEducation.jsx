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

export const FormEducation = ({ setModalOpen }) => {
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <>
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item>
              <Checkbox>Current school</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Start year">
              <Input placeholder="Start year" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Graduation year">
              <Input placeholder="Graduation year" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="School">
              <Select
                style={{
                  width: 300,
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
          <Col span={24}>
            <Form.Item label="Major">
              <Select
                style={{
                  width: 300,
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
          <Col span={24}>
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

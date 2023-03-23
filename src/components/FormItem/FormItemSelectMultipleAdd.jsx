import { Form, Select, Space, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

const { Option } = Select;

export const FormItemSelectMultipleAdd = ({
  name,
  label,
  placeholder,
  postData,
  form,
  getData,
  required,
  message,
}) => {
  const dispatch = useDispatch();
  const [contentModal, setContentModal] = useState();
  const { data } = useQuery([name, contentModal], () => getData(contentModal));

  const handleOpenModalAdd = () => {
    dispatch(postData(contentModal));
    setContentModal();
  };

  const handleChange = (value, option) => {
    const newValue = option.map((item) => {
      const { label, key } = item;
      return { labe: label, key: Number(key) };
    });
    form.setFieldValue(name, newValue);
  };

  const handleSearch = (value) => {
    if (value !== '' && value !== undefined) {
      setContentModal(value);
    }
  };

  const handleFocus = () => {
    setContentModal();
  };

  return (
    <>
      <Form.Item
        name={name}
        label={label}
        required={required}
        rules={
          required
            ? [
                {
                  required: true,
                  message: message,
                },
              ]
            : ''
        }
      >
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: '100%', borderRadius: '0px' }}
          optionFilterProp="children"
          onChange={handleChange}
          placeholder={placeholder}
          onSearch={handleSearch}
          onFocus={handleFocus}
          dropdownRender={(menu) => {
            return (
              <>
                {menu}
                <>
                  {contentModal !== undefined && (
                    <Space>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        style={{ width: '100%', alignItems: 'flex-start' }}
                        onMouseDown={handleOpenModalAdd}
                      >
                        Add item
                      </Button>
                    </Space>
                  )}
                </>
              </>
            );
          }}
        >
          {data?.data.map((option) => {
            return (
              <Option key={option.key} value={option.key} label={option.label}>
                {option.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );
};

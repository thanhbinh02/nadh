import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Form, Select, Space, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { getKeyWithLabel } from '../../utils/const';

const { Option } = Select;

export const FormItemSelectOneAdd = ({
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
    form.setFieldValue(name, undefined);
    setContentModal();
  };

  const handleChange = (value, option) => {
    if (value !== undefined) {
      form.setFieldValue(name, getKeyWithLabel(option));
    }

    setContentModal(undefined);
  };

  const handleSearch = (value) => {
    if (value !== '' && value !== undefined) {
      setContentModal(value);
    }
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
          showSearch
          allowClear
          style={{ width: '100%', borderRadius: '0px' }}
          optionFilterProp="children"
          onChange={handleChange}
          placeholder={placeholder}
          onSearch={handleSearch}
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
              <Option
                key={option.key}
                value={option.label}
                label={option.label}
              >
                {option.label}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );
};

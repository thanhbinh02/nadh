import React from 'react';
import { Form, Select, Row, Col } from 'antd';
import { useState } from 'react';
import { fetchCities } from '../../store/locationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getKeyWithLabel } from '../../utils/const';
const { Option } = Select;

export const FormCountryCity = ({ form }) => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const handleClearCountry = () => {
    form.setFieldValue('city', undefined);
    form.setFieldValue('country', undefined);
  };
  const cities = useSelector((state) => state.locations.cities);
  const countries = useSelector((state) => state.locations.countries);

  const handleCountryChange = (value, option) => {
    setCheck(!check);
    if (option) {
      dispatch(fetchCities({ type: 1, parent_id: Number(option.key) }));
    }
    if (value !== undefined) {
      form.setFieldValue('city', undefined);
      form.setFieldValue('country', getKeyWithLabel(option));
    }
  };

  const handleCityChange = (value, option) => {
    setCheck(!check);
    if (value !== undefined) {
      form.setFieldValue('city', getKeyWithLabel(option));
    }
  };

  return (
    <Form.Item label="Location">
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item name="country" style={{ marginBottom: '8px' }}>
            <Select
              onClear={handleClearCountry}
              allowClear
              placeholder="Select country"
              showSearch
              onChange={(value, option) => {
                handleCountryChange(value, option);
              }}
              optionFilterProp="children"
            >
              {countries.map((item) => (
                <Option value={item.key} key={item.key} label={item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="city"
            dependencies={['city']}
            style={{ marginBottom: '0px' }}
          >
            <Select
              disabled={!form.getFieldValue('country')}
              showSearch
              placeholder="Select city"
              allowClear
              optionFilterProp="children"
              onChange={(value, option) => {
                handleCityChange(value, option);
              }}
            >
              {cities &&
                cities?.map((item) => (
                  <Option value={item.key} key={item.key} label={item.label}>
                    {item.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

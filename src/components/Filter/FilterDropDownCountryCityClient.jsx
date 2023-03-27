import { Form, Select, Card, Button, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

import { fetchCities } from '../../store/locationsSlice';
import { getKeyWithLabel } from '../../utils/const';
import { FilterResetSearch } from './FilterResetSearch';

const { Option } = Select;

const FilterDropDownCountryCityClient = ({
  fetchData,
  country,
  city,
  keyPage,
  getTags,
  changeDataDispatch,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const cities = useSelector((state) => state.locations.cities);
  const countries = useSelector((state) => state.locations.countries);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (country !== undefined) {
      form.setFieldValue('country', country);
      form.setFieldValue('city', city);
      dispatch(fetchCities({ type: 1, parent_id: Number(country) }));
    }
  }, [country, city]);

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

  const handleClearCountry = () => {
    form.setFieldValue('city', undefined);
    form.setFieldValue('country', undefined);
  };

  const handleReset = () => {
    form.resetFields();
    handleClearCountry();
    const filterSaveLocalStorage = JSON.parse(localStorage.getItem(keyPage));
    const { city, country, location, ...rest } = filterSaveLocalStorage;
    dispatch(fetchData(rest));
    dispatch(getTags(rest));
  };

  const onFinish = () => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));

    if (form.getFieldValue('country')) {
      const newData = {
        ...dataSaveLocal,
        location: {
          country: form.getFieldValue('country'),
          city: form.getFieldValue('city'),
        },
        page: 1,
      };

      const final = JSON.parse(
        JSON.stringify(newData, (key, value) => {
          if (value === null) {
            return undefined;
          }
          return value;
        }),
      );

      dispatch(fetchData(changeDataDispatch(final)));
      dispatch(getTags(final));
    }
  };

  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
    >
      <Form
        wrapperCol={{
          span: 24,
        }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={[8, 8]}>
          <FilterResetSearch
            param="location"
            onClick={onFinish}
            keyPage={keyPage}
            fetchData={fetchData}
            getTags={getTags}
            changeDataDispatch={changeDataDispatch}
          />
          <Col span={24}>
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
      </Form>
    </Card>
  );
};
export default FilterDropDownCountryCityClient;

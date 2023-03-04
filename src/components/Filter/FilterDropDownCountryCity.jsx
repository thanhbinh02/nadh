import { Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCities } from '../../store/locationsSlice';
import { fetchCandidates } from '../../store/candidatesSlice';
import { getTagsCandidates } from '../../store/tagsCandidatesSlice';

const { Option } = Select;
const FilterDropDownCountryCity = ({ data, country, city }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [listCity, setListCity] = useState(false);
  const cities = useSelector((state) => state.locations.cities);

  useEffect(() => {
    form.setFieldValue('country', country);
    form.setFieldValue('city', city);
    dispatch(fetchCities({ type: 1, parent_id: Number(country) }));
  }, [country, city]);

  const handleCountryChange = (value, option) => {
    if (option) {
      dispatch(fetchCities({ type: 1, parent_id: Number(option.key) }));
      setListCity(!listCity);
    }
  };

  const handleClearCountry = () => {
    setListCity(!listCity);
  };

  const handleReset = () => {
    form.resetFields();
    handleClearCountry();
  };

  const newData = (last_data) =>
    last_data.map((item) => {
      const { extra, ...rest } = item;
      return rest;
    });

  const onFinish = () => {
    const countryKey = form.getFieldValue('country');
    const countryResult = newData(data).find((item) => item.key === countryKey);

    if (cities.length !== 0) {
      const cityKey = form.getFieldValue('city');
      const cityResult = newData(cities).find((item) => item.key === cityKey);

      if (cityResult !== undefined) {
        const result = {
          country: countryResult,
          city: cityResult,
        };

        const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
        const locationSaveLocal = dataSaveLocal.location;
        const newData = {
          ...dataSaveLocal,
          country: result.country.key,
          city: result.city.key,
          location: {
            ...locationSaveLocal,
            countryCity: {
              country: result.country.label,
              city: result.city.label,
            },
          },
          page: 1,
        };

        dispatch(fetchCandidates(newData));
        dispatch(getTagsCandidates(newData));
      } else {
        const result = {
          country: countryResult,
        };

        const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
        const locationSaveLocal = dataSaveLocal.location;
        const newData = {
          ...dataSaveLocal,
          country: result.country.key,
          location: {
            ...locationSaveLocal,
            countryCity: {
              country: result.country.label,
            },
          },
          page: 1,
        };
        dispatch(fetchCandidates(newData));
        dispatch(getTagsCandidates(newData));
      }
    } else {
      const result = {
        country: countryResult,
      };

      const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
      const locationSaveLocal = dataSaveLocal.location;
      const newData = {
        ...dataSaveLocal,
        country: result.country.key,
        location: {
          ...locationSaveLocal,
          countryCity: {
            country: result.country.label,
          },
        },
        page: 1,
      };

      dispatch(fetchCandidates(newData));
      dispatch(getTagsCandidates(newData));
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
          <Col span={12}>
            <Button
              size="small"
              style={{ width: '100%', borderRadius: '0px' }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              size="small"
              style={{ width: '100%', borderRadius: '0px' }}
              icon={<SearchOutlined />}
              disabled={!form.getFieldValue('country')}
              htmlType="submit"
            >
              Search
            </Button>
          </Col>
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
                {data.map((item) => (
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
export default FilterDropDownCountryCity;

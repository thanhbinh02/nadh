import { Form, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchCities } from '../../store/locationsSlice';

const { Option } = Select;
const FilterDropDownCountryCity = ({ data }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [listCity, setListCity] = useState(false);

  const cities = useSelector((state) => state.locations.cities);

  const handleCountryChange = (value, option) => {
    if (option) {
      dispatch(fetchCities({ type: 1, parent_id: Number(option.key) }));
      setListCity(true);
    }
  };

  const handleClearCountry = () => {
    setListCity(false);
  };

  const handleReset = () => {
    form.resetFields();
    handleClearCountry();
  };

  const onFinish = (values) => {
    console.log('values', values);
  };

  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
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
          <Form
            wrapperCol={{
              span: 24,
            }}
            layout="horizontal"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item name="country" style={{ marginBottom: '8px' }}>
              <Select
                onClear={handleClearCountry}
                allowClear
                placeholder="Select country"
                showSearch
                onChange={(value, option) => {
                  handleCountryChange(value, option);
                }}
              >
                {data.map((item) => (
                  <Option value={item.label} key={item.key}>
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
              >
                {cities &&
                  cities?.map((item) => (
                    <Option value={item.name} key={item.key} compare={item.key}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
export default FilterDropDownCountryCity;

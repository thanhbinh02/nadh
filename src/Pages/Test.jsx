import { Form, Select } from 'antd';
import { useState } from 'react';
import { fetchCities } from '../store/locationsSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const Test = ({ data }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState('default');
  // const [listCity, setListCity] = useState();

  // const [cities, setCities] = useState(
  //   useSelector((state) => state.locations.cities),
  // );

  const cities = useSelector((state) => state.locations.cities);

  console.log('cities', cities);

  console.log('form', form.getFieldValue('cities'));

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleCountryChange = (value, option) => {
    if (option) {
      dispatch(fetchCities({ type: 1, parent_id: Number(option.key) }));
    }
  };

  const handleClearCountry = () => {
    dispatch(fetchCities({ type: 1, parent_id: 'a' }));
  };

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
      form={form}
    >
      <Form.Item name="country">
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
      <Form.Item name="city">
        <Select
          disabled={!cities}
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
  );
};
export default Test;

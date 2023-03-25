import { useState } from 'react';
import { Form, Select, Row, Col, Input } from 'antd';
import { getKeyWithLabel } from '../../utils/const';
import { useSelector } from 'react-redux';
import { getLocations } from '../../apis/filterApi';

const { Option } = Select;

export const FormAddress = ({ form, name }) => {
  const listCountry = useSelector((state) => state.locations.countries);
  const [listCity, seListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [disabledInput, setDisabledInput] = useState(
    form.getFieldValue([name, 'country']) ? false : true,
  );
  const [check, setCheck] = useState(true);

  const fetchDataCity = async (params) => {
    const result = await getLocations({
      params,
    });
    seListCity(result.data);
  };

  const fetchDataListDistrict = async (params) => {
    const result = await getLocations({
      params,
    });
    setListDistrict(result.data);
  };

  const handleCountryChange = (value, option) => {
    if (value !== undefined) {
      fetchDataCity({ type: 1, parent_id: value });
      form.setFieldValue([name, 'country'], getKeyWithLabel(option));
      form.setFieldValue([name, 'city'], undefined);
      form.setFieldValue([name, 'district'], undefined);
      setDisabledInput(false);
    } else {
      setDisabledInput(true);
    }
  };

  const handleCityChange = (value, option) => {
    if (value !== undefined) {
      fetchDataListDistrict({ type: 2, parent_id: value });
      form.setFieldValue([name, 'city'], getKeyWithLabel(option));
      form.setFieldValue([name, 'district'], undefined);
    }
  };

  const handleDistrictChange = (value, option) => {
    if (value !== undefined) {
      form.setFieldValue([name, 'district'], getKeyWithLabel(option));
    }
  };

  const handleClearCountry = () => {
    setDisabledInput(true);

    form.setFieldValue([name, 'city'], undefined);
    form.setFieldValue([name, 'district'], undefined);
    form.setFieldValue([name, 'address'], undefined);
  };

  const handleClearCity = () => {
    setCheck(!check);
    form.setFieldValue([name, 'city'], undefined);
    form.setFieldValue([name, 'district'], undefined);
  };

  const onDropdownCity = (open, country) => {
    if (open && country?.key) {
      fetchDataCity({ type: 1, parent_id: country?.key });
    }
  };

  const onDropdownDistrict = (open, city) => {
    if (open && city?.key) {
      fetchDataListDistrict({ type: 2, parent_id: city?.key });
    }
  };

  return (
    <Row gutter={(12, 12)}>
      <Col span={8}>
        <Form.Item name={[name, 'country']}>
          <Select
            allowClear
            className="w-full"
            justify="start"
            align="start"
            showSearch
            placeholder="country"
            optionFilterProp="children"
            onChange={(value, option) => handleCountryChange(value, option)}
            onClear={() => handleClearCountry()}
          >
            {listCountry?.map((item) => (
              <Option value={item.key} key={item.key} label={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item dependencies={[name, 'country']} name={[name, 'city']}>
          <Select
            allowClear
            className="w-full"
            justify="start"
            align="start"
            showSearch
            placeholder="city"
            onChange={(value, option) => handleCityChange(value, option)}
            disabled={!form.getFieldValue([name, 'country'])}
            onDropdownVisibleChange={(open) =>
              onDropdownCity(open, form.getFieldValue([name, 'country']))
            }
            onClear={() => handleClearCity()}
          >
            {listCity !== undefined &&
              listCity?.map((item, index) => (
                <Option value={item.key} key={item.key} label={item.label}>
                  {item.label}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item dependencies={[name, 'city']} name={[name, 'district']}>
          <Select
            allowClear
            className="w-full"
            justify="start"
            align="start"
            showSearch
            placeholder="District"
            disabled={!form.getFieldValue([name, 'city'])}
            onDropdownVisibleChange={(open) =>
              onDropdownDistrict(open, form.getFieldValue([name, 'city']))
            }
            onChange={(value, option) => handleDistrictChange(value, option)}
          >
            {listDistrict !== undefined &&
              listDistrict.map((item) => (
                <Option value={item.key} key={item.key} label={item.label}>
                  {item.label}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={24} style={{ marginTop: '12px' }}>
        <Form.Item name={[name, 'address']}>
          <Input
            placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
            disabled={disabledInput}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

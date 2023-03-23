import React, { useState } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Select, Row, Col, Input } from 'antd';
import { getLocations } from '../../apis/filterApi';
import { getKeyWithLabel } from '../../utils/const';

const { Option } = Select;

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');
  str = str.replace(/ + /g, ' ');
  str = str.trim();

  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
}

const filterOption = (inputValue, option) => {
  return (
    removeVietnameseTones(option.children.toLowerCase()).indexOf(
      removeVietnameseTones(inputValue.toLowerCase()),
    ) !== -1
  );
};

const FormListAddress = ({
  name,
  form,
  remove,
  fields,
  isListField,
  listCountry,
}) => {
  const [listCity, seListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [disabledInput, setDisabledInput] = useState(
    form.getFieldValue(['addresses', name, 'country']) ? false : true,
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

  const handleCountryChange = (value, option, name) => {
    if (value !== undefined) {
      fetchDataCity({ type: 1, parent_id: value });
      form.setFieldValue(
        ['addresses', name, 'country'],
        getKeyWithLabel(option),
      );
      form.setFieldValue(['addresses', name, 'district'], undefined);
      form.setFieldValue(['addresses', name, 'city'], undefined);
    }
  };

  const handleCityChange = (value, option, name) => {
    if (value !== undefined) {
      fetchDataListDistrict({ type: 2, parent_id: value });
      form.setFieldValue(['addresses', name, 'city'], getKeyWithLabel(option));
      form.setFieldValue(['addresses', name, 'district'], undefined);
    }
  };

  const handleDistrictChange = (value, option, name) => {
    if (value !== undefined) {
      form.setFieldValue(
        ['addresses', name, 'district'],
        getKeyWithLabel(option),
      );
    }
  };

  const handleRemove = () => {
    remove(name);
  };

  const handleClearCountry = (name) => {
    setCheck(!check);
    form.setFieldValue(['addresses', name, 'address'], undefined);
    form.setFieldValue(['addresses', name, 'city'], undefined);
    form.setFieldValue(['addresses', name, 'district'], undefined);
    setDisabledInput(true);
  };

  const handleClearCity = (name) => {
    setCheck(!check);
    form.setFieldValue(['addresses', name, 'city'], undefined);
    form.setFieldValue(['addresses', name, 'district'], undefined);
    setDisabledInput(true);
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
    <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
      <Col span={21}>
        <Row gutter={(12, 12)}>
          <Col span={8}>
            <Form.Item isListField={isListField} name={[name, 'country']}>
              <Select
                allowClear
                className="w-full"
                justify="start"
                align="start"
                showSearch
                filterOption={filterOption}
                placeholder="country"
                optionFilterProp="children"
                onChange={(value, option) =>
                  handleCountryChange(value, option, name)
                }
                onClear={() => handleClearCountry(name)}
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
            <Form.Item
              isListField={isListField}
              dependencies={['country']}
              name={[name, 'city']}
            >
              <Select
                allowClear
                className="w-full"
                justify="start"
                align="start"
                showSearch
                filterOption={filterOption}
                placeholder="city"
                onChange={(value, option) =>
                  handleCityChange(value, option, name)
                }
                disabled={!form.getFieldValue(['addresses', name, 'country'])}
                onDropdownVisibleChange={(open) =>
                  onDropdownCity(
                    open,
                    form.getFieldValue(['addresses', name, 'country']),
                  )
                }
                onClear={() => handleClearCity(name)}
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
            <Form.Item
              isListField={isListField}
              dependencies={['city']}
              name={[name, 'district']}
            >
              <Select
                allowClear
                className="w-full"
                justify="start"
                align="start"
                showSearch
                filterOption={filterOption}
                placeholder="District"
                disabled={!form.getFieldValue(['addresses', name, 'city'])}
                onDropdownVisibleChange={(open) =>
                  onDropdownDistrict(
                    open,
                    form.getFieldValue(['addresses', name, 'city']),
                  )
                }
                onChange={(value, option) =>
                  handleDistrictChange(value, option, name)
                }
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
      </Col>
      <Col span={3}>
        <>
          {fields.length > 1 && (
            <MinusCircleOutlined
              onClick={handleRemove}
              style={{ color: 'red' }}
            />
          )}
        </>
      </Col>
    </Row>
  );
};

export default FormListAddress;

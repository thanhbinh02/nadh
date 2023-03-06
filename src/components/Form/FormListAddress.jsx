import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Select, Row, Col, Input } from 'antd';
import { getLocations } from '../../apis/filterApi';
import { useDispatch } from 'react-redux';
import { putDataCandidateAddresses } from '../../store/createCandidateSlice';
import { useSelector } from 'react-redux';

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

const FormListAddress = ({ name, form, remove, fields, isListField }) => {
  const [listCountry, setListCountry] = useState([]);
  const [listCity, seListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const dispatch = useDispatch();
  const dataCreateCandidates = useSelector(
    (state) => state.createCandidate.data,
  );

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

  useEffect(() => {
    const fetchDataCountry = async (params) => {
      const result = await getLocations({
        params,
      });
      setListCountry(result.data);
    };
    fetchDataCountry({ type: 4 });
  }, []);

  const handleCountryChange = (value, option, name) => {
    fetchDataCity({ type: 1, parent_id: value });
    form.setFieldValue(['addresses', name, 'district'], undefined);
    form.setFieldValue(['addresses', name, 'ward'], undefined);
    let currentAddresses = dataCreateCandidates.addresses;

    console.log('option', option);

    if (currentAddresses.length === 0) {
      const newData = [
        {
          country: {
            key: option.key,
            label: option.children,
          },
          city: null,
          district: null,
          address: null,
        },
      ];
      dispatch(putDataCandidateAddresses(newData));
    } else if (name + 1 > currentAddresses.length) {
      const newObject = {
        country: {
          key: option.key,
          label: option.children,
        },
        city: null,
        district: null,
        address: null,
      };

      let newData = [...currentAddresses, newObject];
      dispatch(putDataCandidateAddresses(newData));
    }
  };

  const handleCityChange = (value, option, name) => {
    fetchDataListDistrict({ type: 2, parent_id: value });
    form.setFieldValue(['addresses', name, 'ward'], undefined);
    let currentAddresses = dataCreateCandidates.addresses;

    const updatedObj = { key: option?.key, label: option?.children };

    let newArray = [...currentAddresses];

    newArray[name] = {
      ...newArray[name],
      city: updatedObj,
    };
    console.log('name', name);
    console.log('newArray', newArray);
  };

  const handleRemove = () => {
    remove(name);
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
              >
                {listCountry?.map((item) => (
                  <Option value={item.key} key={item.key} label={item.key}>
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
              >
                {listCity !== undefined &&
                  listCity?.map((item, index) => (
                    <Option value={item.key} key={item.key} label={item.key}>
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
              >
                {listDistrict !== undefined &&
                  listDistrict.map((item) => (
                    <Option value={item.key} key={item.key} label={item.key}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} style={{ marginTop: '12px' }}>
            <Form.Item name={[name, 'address']}>
              <Input placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower" />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={3}>
        {fields.length > 1 && <MinusCircleOutlined onClick={handleRemove} />}
      </Col>
    </Row>
  );
};

export default FormListAddress;

const a = [
  {
    country: { key: 123, label: 'thanhbinh123' },
    city: null,
    address: null,
  },
  {
    country: { key: 456, label: 'thanhbinh456' },
    city: { key: 76, label: 'thanhbinh78' },
    address: null,
  },
  {
    country: { key: 789, label: 'thanhbinh456' },
    city: null,
    address: null,
  },
];

const b = {
  index: 1,
  country: { key: 789, label: 'thanhbinh456' },
};

const c = [
  {
    country: { key: 123, label: 'thanhbinh123' },
    city: null,
    address: null,
  },
  {
    country: { key: 789, label: 'thanhbinh456' },
    city: { key: 76, label: 'thanhbinh78' },
    address: null,
  },
  {
    country: { key: 789, label: 'thanhbinh456' },
    city: null,
    address: null,
  },
];

const d = {
  index: 2,
  address: { key: 789, label: 'thanhbinh456' },
};

const e = [
  {
    country: { key: 123, label: 'thanhbinh123' },
    city: null,
    address: null,
  },
  {
    country: { key: 456, label: 'thanhbinh456' },
    city: { key: 76, label: 'thanhbinh78' },
    address: null,
  },
  {
    country: { key: 789, label: 'thanhbinh456' },
    city: null,
    address: { key: 789, label: 'thanhbinh456' },
  },
];

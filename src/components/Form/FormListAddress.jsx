import React, { useState, useEffect } from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Select, Row, Col, Input } from 'antd';
import { getLocations } from '../../apis/filterApi';
import { useDispatch } from 'react-redux';

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
  actionDispatch,
  dataNewCandidate,
  check,
  defaultValue,
  setCancel,
  cancel,
}) => {
  const dispatch = useDispatch();

  const [listCountry, setListCountry] = useState([]);
  const [listCity, seListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [disabledInput, setDisabledInput] = useState(true);

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

    if (dataNewCandidate) {
      for (let i = 0; i < dataNewCandidate.length; i++) {
        if (dataNewCandidate[name]?.country?.label !== undefined) {
          setDisabledInput(false);
        }
      }
    }

    if (dataNewCandidate) {
      if (dataNewCandidate[name]?.country?.key) {
        fetchDataCity({
          type: 1,
          parent_id: dataNewCandidate[name]?.country?.key,
        });
        form.setFieldValue(
          ['addresses', name, 'country'],
          dataNewCandidate[name]?.country?.key,
        );
      }

      if (dataNewCandidate[name]?.city?.key) {
        fetchDataListDistrict({
          type: 2,
          parent_id: dataNewCandidate[name]?.city?.key,
        });
        form.setFieldValue(
          ['addresses', name, 'city'],
          dataNewCandidate[name]?.city?.key,
        );
      }
    }
  }, []);

  useEffect(() => {
    if (cancel) {
      console.log('zoday 2');
      if (defaultValue) {
        for (let i = 0; i < defaultValue.length; i++) {
          if (defaultValue[name]?.country?.label !== undefined) {
            setDisabledInput(false);
          }
        }
      }

      if (defaultValue) {
        if (defaultValue[name]?.country?.key) {
          fetchDataCity({
            type: 1,
            parent_id: defaultValue[name]?.country?.key,
          });
          form.setFieldValue(
            ['addresses', name, 'country'],
            defaultValue[name]?.country?.label,
          );
        }

        if (defaultValue[name]?.city?.key) {
          fetchDataListDistrict({
            type: 2,
            parent_id: defaultValue[name]?.city?.key,
          });
          form.setFieldValue(
            ['addresses', name, 'city'],
            defaultValue[name]?.city?.label,
          );
        }
      }
    }
  }, [cancel]);

  const handleCountryChange = (value, option, name) => {
    if (cancel) {
      setCancel(false);
    }

    fetchDataCity({ type: 1, parent_id: value });
    form.setFieldValue(['addresses', name, 'district'], undefined);
    form.setFieldValue(['addresses', name, 'city'], undefined);

    if (value !== undefined) {
      setDisabledInput(false);

      const newData = {
        country: {
          key: option?.key,
          label: option.children,
        },
        city: undefined,
        district: undefined,
        address: undefined,
      };

      let newDataFinal = [];

      if (dataNewCandidate.length === 0) {
        newDataFinal = [newData];
      } else {
        for (let i = 0; i < dataNewCandidate.length; i++) {
          if (i !== name) {
            newDataFinal.push(dataNewCandidate[i]);
          } else {
            newDataFinal.push(newData);
          }
        }
      }

      dispatch(actionDispatch({ value: newDataFinal, label: 'addresses' }));
    }
  };

  const handleCityChange = (value, option, name) => {
    if (cancel) {
      setCancel(false);
    }

    fetchDataListDistrict({ type: 2, parent_id: value });
    form.setFieldValue(['addresses', name, 'district'], undefined);

    if (value !== undefined) {
      const updatedObj = Object.assign({}, dataNewCandidate[name], {
        city: {
          key: Number(option?.key),
          label: option?.children,
        },
      });

      const newData = [];

      for (let i = 0; i < dataNewCandidate.length; i++) {
        if (i !== name) {
          newData.push(dataNewCandidate[i]);
        } else {
          newData.push(updatedObj);
        }
      }

      dispatch(actionDispatch({ value: newData, label: 'addresses' }));
    }
  };

  const handleDistrictChange = (value, option, name) => {
    if (cancel) {
      setCancel(false);
    }

    if (value !== undefined) {
      const updatedObj = Object.assign({}, dataNewCandidate[name], {
        district: {
          key: Number(option?.key),
          label: option?.children,
        },
      });

      const newData = [];
      for (let i = 0; i < dataNewCandidate.length; i++) {
        if (i !== name) {
          newData.push(dataNewCandidate[i]);
        } else {
          newData.push(updatedObj);
        }
      }
      dispatch(actionDispatch({ value: newData, label: 'addresses' }));
    }
  };

  const handleRemove = () => {
    if (cancel) {
      setCancel(false);
    }

    const newData = [];

    for (let i = 0; i < dataNewCandidate.length; i++) {
      if (i !== name) {
        newData.push(dataNewCandidate[i]);
      }
    }

    dispatch(actionDispatch({ value: newData, label: 'addresses' }));
    remove(name);
  };

  const handleClearCountry = (name) => {
    if (cancel) {
      setCancel(false);
    }

    const newData = [];
    for (let i = 0; i < dataNewCandidate.length; i++) {
      if (i !== name) {
        newData.push(dataNewCandidate[i]);
      } else {
        newData.push({
          country: undefined,
          city: undefined,
          district: undefined,
          address: undefined,
        });
      }
    }

    form.setFieldValue(['addresses', name, 'address'], undefined);
    dispatch(actionDispatch({ value: newData, label: 'addresses' }));
  };

  const handleClearCity = (name) => {
    const updatedObj = Object.assign({}, dataNewCandidate[name], {
      district: undefined,
      city: undefined,
    });

    const newData = [];
    for (let i = 0; i < dataNewCandidate.length; i++) {
      if (i !== name) {
        newData.push(dataNewCandidate[i]);
      } else {
        newData.push(updatedObj);
      }
    }
    dispatch(actionDispatch({ value: newData, label: 'addresses' }));
  };

  const handleClearDistrict = (name) => {
    if (cancel) {
      setCancel(false);
    }

    const updatedObj = Object.assign({}, dataNewCandidate[name], {
      district: undefined,
    });

    const newData = [];
    for (let i = 0; i < dataNewCandidate.length; i++) {
      if (i !== name) {
        newData.push(dataNewCandidate[i]);
      } else {
        newData.push(updatedObj);
      }
    }
    dispatch(actionDispatch({ value: newData, label: 'addresses' }));
  };

  const handleChangeInputAddress = (e) => {
    if (cancel) {
      setCancel(false);
    }

    const updatedObj = Object.assign({}, dataNewCandidate[name], {
      address: e.target.value,
    });

    const newData = [];
    for (let i = 0; i < dataNewCandidate.length; i++) {
      if (i !== name) {
        newData.push(dataNewCandidate[i]);
      } else {
        newData.push(updatedObj);
      }
    }

    dispatch(actionDispatch({ value: newData, label: 'addresses' }));
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
                disabled={check}
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
                disabled={
                  !form.getFieldValue(['addresses', name, 'country']) || check
                }
                onClear={() => handleClearCity(name)}
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
                disabled={
                  !form.getFieldValue(['addresses', name, 'city']) || check
                }
                onChange={(value, option) =>
                  handleDistrictChange(value, option, name)
                }
                onClear={() => handleClearDistrict(name)}
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
              <Input
                placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
                onChange={handleChangeInputAddress}
                disabled={disabledInput}
              />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={3}>
        {!check && (
          <>
            {fields.length > 1 && (
              <MinusCircleOutlined
                onClick={handleRemove}
                style={{ color: 'red' }}
              />
            )}
          </>
        )}
      </Col>
    </Row>
  );
};

export default FormListAddress;

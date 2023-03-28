import { useState, useEffect } from 'react';
import { Card, Row, Col, InputNumber, Form, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { FilterResetSearch } from './FilterResetSearch';
import { MONEY } from '../../utils/const';
import { getKeyWithLabel } from '../../utils/const';

function filterArray(abc, title) {
  const filteredObj = {};
  for (const key in abc) {
    if (key !== title) {
      filteredObj[key] = abc[key];
    }
  }
  return filteredObj;
}

const isPositiveInteger = (value) => {
  return /^[1-9]\d*$/.test(value);
};

const checkValue = (value) => {
  if (value === undefined || value === '' || value === null) {
    return true;
  }
  return false;
};

const findUntilSalary = (id, array) => {
  const item = array.find((item) => item.id === id);
  const { color, ...rest } = item;
  return { ...rest };
};

const { Option } = Select;
export const FilterSalaryRange = ({
  paramFrom,
  paramTo,
  fetchData,
  keyPage,
  filterValueFrom,
  filterValueTo,
  changeDataDispatch,
  getTags,
  param,
  filterCurrency,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [checkSearch, setCheckSearch] = useState(false);
  const [checkParseValueFrom, setCheckParseValueFrom] = useState(false);
  const [valueFrom, setValueFrom] = useState(filterValueFrom);
  const [checkParseValueTo, setCheckParseValueTo] = useState(false);
  const [valueTo, setValueTo] = useState(filterValueTo);
  const [checkValidateFrom, setCheckValidateFrom] = useState(false);
  const [checkValidateTo, setCheckValidateTo] = useState(false);

  useEffect(() => {
    setValueFrom(filterValueFrom);
    setValueTo(filterValueTo);
    form.setFieldValue(`${paramFrom}`, filterValueFrom || undefined);
    form.setFieldValue(`${paramTo}`, filterValueTo || undefined);
    form.setFieldValue('currency', filterCurrency?.id || undefined);
  }, [filterValueFrom, filterValueTo, filterCurrency]);

  const handleSearch = () => {
    const currency = form.getFieldValue('currency');
    if (currency === undefined) {
      form.setFieldValue('currency', {
        id: 2,
        name: 'VND',
      });
    }

    if (
      !checkValue(form.getFieldValue(paramFrom)) &&
      checkValue(form.getFieldValue(paramTo))
    ) {
      const result = { [`${paramFrom}`]: form.getFieldValue(paramFrom) };

      const dataSaveLocal = filterArray(
        JSON.parse(localStorage.getItem(keyPage)),
        paramTo,
      );
      const newData = {
        ...dataSaveLocal,
        ...result,
        currency: findUntilSalary(form.getFieldValue('currency'), MONEY),
        page: 1,
      };

      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
    }

    if (
      checkValue(form.getFieldValue(paramFrom)) &&
      !checkValue(form.getFieldValue(paramTo))
    ) {
      const result = { [`${paramTo}`]: form.getFieldValue(paramTo) };
      const dataSaveLocal = filterArray(
        JSON.parse(localStorage.getItem(keyPage)),
        paramFrom,
      );
      const newData = {
        ...dataSaveLocal,
        ...result,
        currency: findUntilSalary(form.getFieldValue('currency'), MONEY),
        page: 1,
      };

      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
    }

    if (
      !checkValue(form.getFieldValue(paramFrom)) &&
      !checkValue(form.getFieldValue(paramTo))
    ) {
      const resultFrom = { [`${paramFrom}`]: form.getFieldValue(paramFrom) };
      const resultTo = { [`${paramTo}`]: form.getFieldValue(paramTo) };
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = {
        ...dataSaveLocal,
        ...resultTo,
        ...resultFrom,
        currency: findUntilSalary(form.getFieldValue('currency'), MONEY),
        page: 1,
      };

      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
    }

    if (
      checkValue(form.getFieldValue(paramTo)) &&
      checkValue(form.getFieldValue(paramFrom))
    ) {
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      delete dataSaveLocal[paramFrom];
      delete dataSaveLocal[paramTo];
      const newData = {
        ...dataSaveLocal,
        currency: findUntilSalary(form.getFieldValue('currency'), MONEY),
        page: 1,
      };

      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
    }
  };

  const handleParserValueFrom = (value) => {
    if (value === '') {
      setCheckSearch(false);
      setCheckValidateFrom(false);
      setCheckParseValueFrom(false);
      setValueFrom('');
      setCheckValidateTo(false);
      return '';
    }

    if (isNaN(value)) {
      setCheckValidateFrom(false);
      setCheckParseValueFrom(true);
      setValueFrom(value);
      setCheckSearch(true);
      return value;
    } else {
      if (
        isPositiveInteger(value) &&
        (value !== undefined || value !== null || value !== '')
      ) {
        setCheckParseValueFrom(false);
        if (Number(value) > valueTo && value !== undefined && valueTo !== '') {
          setCheckSearch(true);
          setCheckValidateFrom(true);
          setCheckValidateTo(true);
        } else {
          setCheckSearch(false);
          setCheckValidateFrom(false);
          setCheckValidateTo(false);
        }
      } else {
        setCheckParseValueFrom(true);
        setCheckSearch(true);
      }

      return Number(value);
    }
  };

  const handleParserValueTo = (value) => {
    if (value === '') {
      setCheckSearch(false);
      setCheckValidateTo(false);
      setCheckParseValueTo(false);
      setCheckValidateFrom(false);
      setValueTo('');
      return '';
    }

    if (isNaN(value)) {
      setCheckParseValueTo(true);
      setValueTo(value);
      setCheckSearch(true);
      return value;
    } else {
      if (
        isPositiveInteger(value) &&
        (value !== undefined || value !== null || value !== '')
      ) {
        setCheckParseValueTo(false);
        if (
          Number(value) < valueFrom &&
          value !== undefined &&
          valueTo !== ''
        ) {
          setCheckSearch(true);
          setCheckValidateTo(true);
          setCheckValidateFrom(true);
        } else {
          setCheckSearch(false);
          setCheckValidateTo(false);
          setCheckValidateFrom(false);
        }
      } else {
        setCheckParseValueTo(true);
        setCheckSearch(true);
      }

      return Number(value);
    }
  };

  return (
    <Card
      size="small"
      style={{
        width: 580,
      }}
    >
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name={paramFrom}>
                  <InputNumber
                    onChange={setValueFrom}
                    value={valueFrom}
                    min={1}
                    parser={handleParserValueFrom}
                    type="string"
                    placeholder="From"
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={paramTo}>
                  <InputNumber
                    onChange={setValueTo}
                    value={valueTo}
                    min={1}
                    parser={handleParserValueTo}
                    type="string"
                    placeholder="To"
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                {checkParseValueFrom && (
                  <>
                    <span style={{ color: 'red' }}>Must be number integer</span>
                    <br />
                  </>
                )}
                {checkValidateFrom && (
                  <span style={{ color: 'red' }}>
                    Must be lower than to value
                  </span>
                )}
              </Col>
              <Col span={12}>
                {checkParseValueTo && (
                  <>
                    <span style={{ color: 'red' }}>Must be number integer</span>
                    <br />
                  </>
                )}
                {checkValidateTo && (
                  <span style={{ color: 'red' }}>
                    Must be higher than from's value
                  </span>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={4} style={{ textAlign: 'right' }}>
            <Form.Item name="currency">
              <Select
                style={{ borderRadius: '0px' }}
                // defaultValue={2}
              >
                {MONEY.map((option) => {
                  return (
                    <Option
                      key={option.id}
                      value={option.id}
                      label={option.name}
                      id={option.id}
                    >
                      {option.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={10}>
            <Row gutter={(12, 12)}>
              <FilterResetSearch
                disabled={checkSearch}
                param={param}
                onClick={handleSearch}
                keyPage={keyPage}
                fetchData={fetchData}
                getTags={getTags}
                changeDataDispatch={changeDataDispatch}
              />
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

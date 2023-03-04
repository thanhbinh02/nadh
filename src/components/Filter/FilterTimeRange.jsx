import { useState, useEffect } from 'react';
import { Card, Row, Col, InputNumber, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { getTagsCandidates } from '../../store/tagsCandidatesSlice';
import { FilterResetSearch } from './FilterResetSearch';

function filterArray(abc, title) {
  const filteredObj = {};
  for (const key in abc) {
    if (key !== title) {
      filteredObj[key] = abc[key];
    }
  }
  return filteredObj;
}

export const FilterTimeRange = ({
  paramFrom,
  paramTo,
  fetchData,
  keyPage,
  filterValueFrom,
  filterValueTo,
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
  }, [filterValueFrom, filterValueTo]);

  const handleSearch = () => {
    if (
      valueFrom !== undefined &&
      valueFrom !== '' &&
      (valueTo === undefined || valueTo === '')
    ) {
      const data = { name: paramFrom, data: valueFrom };
      const result = { [data.name]: data.data };
      const dataSaveLocal = filterArray(
        JSON.parse(localStorage.getItem(keyPage)),
        paramTo,
      );
      const newData = { ...dataSaveLocal, ...result, page: 1 };
      dispatch(getTagsCandidates(newData));
      dispatch(fetchData(newData));
    }

    if (
      valueTo !== undefined &&
      valueTo !== '' &&
      (valueFrom === undefined || valueFrom === '')
    ) {
      const data = { name: paramTo, data: valueTo };
      const result = { [data.name]: data.data };
      const dataSaveLocal = filterArray(
        JSON.parse(localStorage.getItem(keyPage)),
        paramFrom,
      );
      const newData = { ...dataSaveLocal, ...result, page: 1 };
      dispatch(getTagsCandidates(newData));
      dispatch(fetchData(newData));
    }

    if (
      valueTo !== undefined &&
      valueTo !== '' &&
      valueFrom !== undefined &&
      valueFrom !== ''
    ) {
      const dataFrom = { name: paramFrom, data: valueFrom };
      const resultFrom = { [dataFrom.name]: dataFrom.data };
      const dataTo = { name: paramTo, data: valueTo };
      const resultTo = { [dataTo.name]: dataTo.data };
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = { ...dataSaveLocal, ...resultTo, ...resultFrom, page: 1 };
      dispatch(getTagsCandidates(newData));
      dispatch(fetchData(newData));
    }

    if (
      (valueTo === undefined || valueTo === '') &&
      (valueFrom === undefined || valueFrom === '')
    ) {
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const removeDataFrom = filterArray(dataSaveLocal, paramFrom);
      const removeDataTo = filterArray(removeDataFrom, paramTo);
      dispatch(getTagsCandidates(removeDataTo));
      dispatch(fetchData(removeDataTo));
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
      if (Number(value) > valueTo && value !== undefined && valueTo !== '') {
        setCheckSearch(true);
        setCheckValidateFrom(true);
      } else {
        setCheckSearch(false);
        setCheckValidateFrom(false);
      }

      setCheckParseValueFrom(false);
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
      if (Number(value) < valueFrom && value !== undefined) {
        setCheckSearch(true);
        setCheckValidateTo(true);
      } else {
        setCheckSearch(false);
        setCheckValidateTo(false);
      }

      setCheckParseValueTo(false);
      return Number(value);
    }
  };

  return (
    <Card
      size="small"
      style={{
        width: 507,
      }}
    >
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item>
                  <InputNumber
                    onChange={setValueFrom}
                    value={valueFrom}
                    min={1}
                    parser={handleParserValueFrom}
                    type="string"
                    placeholder="To"
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
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
                  <span style={{ color: 'red' }}>Must be number</span>
                )}
                {checkValidateFrom && (
                  <span style={{ color: 'red' }}>
                    Must be lower than to value
                  </span>
                )}
              </Col>
              <Col span={12}>
                {checkParseValueTo && (
                  <span style={{ color: 'red' }}>Must be number</span>
                )}
                {checkValidateTo && (
                  <span style={{ color: 'red' }}>
                    Must be higher than from's value
                  </span>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row gutter={[8, 8]}>
              <FilterResetSearch
                disabled={checkSearch}
                onClick={handleSearch}
              />
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

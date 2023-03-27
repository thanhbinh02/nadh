import { useState, useEffect } from 'react';
import { Card, Row, Col, Form, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { FilterResetSearch } from './FilterResetSearch';
import moment from 'moment';

export const FilterDatePicker = ({
  paramFrom,
  paramTo,
  fetchData,
  keyPage,
  filterValueFrom,
  filterValueTo,
  changeDataDispatch,
  getTags,
  param,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterValueFrom) {
      form.setFieldValue(`${paramFrom}`, moment(filterValueFrom));
    }
    if (filterValueTo) {
      form.setFieldValue(`${paramTo}`, moment(filterValueTo));
    }
  }, [filterValueFrom, filterValueTo]);

  const handleSearch = () => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
    const fromDate = new Date(form.getFieldValue(paramFrom));
    const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    const dataFrom = { [`${paramFrom}`]: formattedFromDate };

    const toDate = new Date(form.getFieldValue(paramTo));
    const formattedToDate = moment(toDate).format('YYYY-MM-DD');
    const dataTo = { [`${paramTo}`]: formattedToDate };

    if (
      form.getFieldValue(paramFrom) !== undefined &&
      form.getFieldValue(paramTo) === undefined
    ) {
      const newData = { ...dataSaveLocal, ...dataFrom, page: 1 };
      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));

      return;
    }

    if (
      form.getFieldValue(paramFrom) === undefined &&
      form.getFieldValue(paramTo) !== undefined
    ) {
      const newData = { ...dataSaveLocal, ...dataTo, page: 1 };
      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
      return;
    }

    if (
      form.getFieldValue(paramFrom) !== undefined &&
      form.getFieldValue(paramTo) !== undefined
    ) {
      const newData = { ...dataSaveLocal, ...dataFrom, ...dataTo, page: 1 };
      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
      return;
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
                <Form.Item name={paramFrom}>
                  <DatePicker
                    placeholder="From"
                    disabledDate={(currentDate) =>
                      currentDate && currentDate > form.getFieldValue(paramTo)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={paramTo}>
                  <DatePicker
                    placeholder="To"
                    disabledDate={(currentDate) =>
                      currentDate && currentDate < form.getFieldValue(paramFrom)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row gutter={[8, 8]}>
              <FilterResetSearch
                onClick={handleSearch}
                param={param}
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

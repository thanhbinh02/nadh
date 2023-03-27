import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Select, Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getKeyWithLabel } from '../../utils/const';

const { Option } = Select;

const FilterDropDownIndustry = ({
  data,
  optionTwo,
  optionThree,
  typeTwo,
  fetchDataItemTwo,
  fetchDataItemThree,
  typeThree,
  fetchData,
  keyPage,
  filterValueOptionOne,
  filterValueOptionTwo,
  filterValueOptionThree,
  changeDataDispatch,
  getTags,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    console.log('zodayko');
    if (filterValueOptionOne !== undefined) {
      dispatch(
        fetchDataItemTwo({ type: typeTwo, parent_id: filterValueOptionOne }),
      );
      form.setFieldValue('industry', filterValueOptionOne);
      form.setFieldValue('sector', filterValueOptionTwo);
    }
    if (filterValueOptionTwo !== undefined) {
      dispatch(
        fetchDataItemThree({
          type: typeThree,
          parent_id: filterValueOptionTwo,
        }),
      );
      form.setFieldValue('category', filterValueOptionThree);
    }
  }, []);

  const handleItemOneChange = (value, option) => {
    form.setFieldValue('sector', undefined);
    if (value !== undefined) {
      form.setFieldValue('industry', getKeyWithLabel(option));
      dispatch(
        fetchDataItemTwo({ type: typeTwo, parent_id: Number(option.key) }),
      );
    }
    setCheck(!check);
  };

  const handleItemTwoChange = (value, option) => {
    form.setFieldValue('category', undefined);
    if (value !== undefined) {
      form.setFieldValue('sector', getKeyWithLabel(option));
      dispatch(
        fetchDataItemThree({ type: typeThree, parent_id: Number(option.key) }),
      );
    }
    setCheck(!check);
  };

  const handleItemThreeChange = (value, option) => {
    if (value !== undefined) {
      form.setFieldValue('category', getKeyWithLabel(option));
    }
  };

  const handleClearItemOne = () => {
    form.setFieldValue('sector', undefined);
    setCheck(!check);
    form.resetFields();
  };

  const handleClearItemTwo = () => {
    setCheck(!check);
    form.setFieldValue('category', undefined);
  };

  const handleReset = () => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
    delete dataSaveLocal['industry'];
    dispatch(getTags(dataSaveLocal));
    dispatch(fetchData(changeDataDispatch(dataSaveLocal)));
    form.resetFields();
  };

  const handleSearch = () => {
    if (form.getFieldValue('industry') !== undefined) {
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = {
        ...dataSaveLocal,
        industry: {
          industry: form.getFieldValue('industry'),
          sector: form.getFieldValue('sector'),
          category: form.getFieldValue('category'),
        },
        page: 1,
      };

      dispatch(getTags(newData));
      dispatch(fetchData(changeDataDispatch(newData)));
      return;
    }
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
            disabled={!form.getFieldValue('industry')}
            onClick={handleSearch}
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
          >
            <Form.Item name="industry" style={{ marginBottom: '8px' }}>
              <Select
                onClear={handleClearItemOne}
                allowClear
                placeholder="Select industry"
                showSearch
                onChange={(value, option) => {
                  handleItemOneChange(value, option);
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
            <Form.Item name="sector" style={{ marginBottom: '8px' }}>
              <Select
                onClear={handleClearItemTwo}
                disabled={!form.getFieldValue('industry')}
                showSearch
                placeholder="Select sector"
                allowClear
                onChange={(value, option) => {
                  handleItemTwoChange(value, option);
                }}
                optionFilterProp="children"
              >
                {optionTwo &&
                  optionTwo?.map((item) => (
                    <Option value={item.key} key={item.key} label={item.label}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="category" style={{ marginBottom: '0px' }}>
              <Select
                disabled={!form.getFieldValue('sector')}
                showSearch
                placeholder="Select category"
                allowClear
                optionFilterProp="children"
                onChange={(value, option) => {
                  handleItemThreeChange(value, option);
                }}
              >
                {optionThree &&
                  optionThree?.map((item) => (
                    <Option value={item.key} key={item.key} label={item.label}>
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
export default FilterDropDownIndustry;

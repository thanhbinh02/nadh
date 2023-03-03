import { Form, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [listItemTwo, setListItemTwo] = useState(false);
  const [listItemThree, setListItemThree] = useState(false);

  const filterItemInListData = (label, listData) => {
    const result = listData.filter((item) => {
      return item.label === label;
    });
    return result;
  };

  const handleItemOneChange = (value, option) => {
    if (option) {
      dispatch(
        fetchDataItemTwo({ type: typeTwo, parent_id: Number(option.key) }),
      );
      setListItemTwo(true);
    }
  };

  const handleClearItemOne = () => {
    setListItemTwo(false);
    form.resetFields();
  };

  const handleClearItemTwo = () => {
    setListItemThree(false);
    form.setFieldValue('category', undefined);
  };

  const handleItemTwoChange = (value, option) => {
    form.setFieldValue('category', undefined);
    if (option) {
      dispatch(
        fetchDataItemThree({ type: typeThree, parent_id: Number(option.key) }),
      );
      setListItemThree(true);
    }
  };

  const handleReset = () => {
    handleClearItemOne();
  };

  const handleSearch = () => {
    if (form.getFieldValue('city') === undefined) {
      const industryId = {
        industry_id: filterItemInListData(
          form.getFieldValue('country'),
          data,
        )[0].key,
      };
      const industryType = { industry_type: 1 };
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = {
        ...dataSaveLocal,
        ...industryId,
        ...industryType,
        page: 1,
      };

      dispatch(fetchData(newData));
      return;
    }

    if (form.getFieldValue('category') === undefined) {
      const industryId = {
        industry_id: filterItemInListData(
          form.getFieldValue('city'),
          optionTwo,
        )[0].key,
      };
      const industryType = { industry_type: 2 };

      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = {
        ...dataSaveLocal,
        ...industryId,
        ...industryType,
        page: 1,
      };

      dispatch(fetchData(newData));
      return;
    }

    if (form.getFieldValue('category') !== undefined) {
      console.log('optionThree', optionThree);

      const industryId = {
        industry_id: filterItemInListData(
          form.getFieldValue('category'),
          optionThree,
        )[0].key,
      };
      const industryType = { industry_type: 3 };

      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = {
        ...dataSaveLocal,
        ...industryId,
        ...industryType,
        page: 1,
      };

      dispatch(fetchData(newData));
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
            disabled={!form.getFieldValue('country')}
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
            <Form.Item name="country" style={{ marginBottom: '8px' }}>
              <Select
                onClear={handleClearItemOne}
                allowClear
                placeholder="Select country"
                showSearch
                onChange={(value, option) => {
                  handleItemOneChange(value, option);
                }}
              >
                {data.map((item) => (
                  <Option value={item.label} key={item.key}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="city" style={{ marginBottom: '8px' }}>
              <Select
                onClear={handleClearItemTwo}
                disabled={!form.getFieldValue('country')}
                showSearch
                placeholder="Select city"
                allowClear
                onChange={(value, option) => {
                  handleItemTwoChange(value, option);
                }}
              >
                {optionTwo &&
                  optionTwo?.map((item) => (
                    <Option
                      value={item.label}
                      key={item.key}
                      compare={item.key}
                    >
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="category" style={{ marginBottom: '0px' }}>
              <Select
                disabled={!form.getFieldValue('city')}
                showSearch
                placeholder="Select category"
                allowClear
                // onChange={(value, option) => {
                //   handleItemTwoChange(value, option);
                // }}
              >
                {optionThree &&
                  optionThree?.map((item) => (
                    <Option
                      value={item.label}
                      key={item.key}
                      compare={item.key}
                    >
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

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Select, Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { getTagsCandidates } from '../../store/tagsCandidatesSlice';
import { refreshCandidates } from '../../store/candidatesSlice';

const { Option } = Select;

const checkTwoName = (names, obj) => {
  if (obj) {
    for (let i = 0; i < names.length; i++) {
      if (names[i] in obj) {
        return true;
      }
    }
    return false;
  }
  return false;
};

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
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [listItemTwo, setListItemTwo] = useState(false);
  const [listItemThree, setListItemThree] = useState(false);

  useEffect(() => {
    if (filterValueOptionOne !== undefined) {
      dispatch(
        fetchDataItemTwo({ type: typeTwo, parent_id: filterValueOptionOne }),
      );
      form.setFieldValue('country', filterValueOptionOne);
      form.setFieldValue('city', filterValueOptionTwo);
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
  }, [filterValueOptionOne, filterValueOptionTwo, filterValueOptionThree]);

  const filterItemInListData = (key, listData) => {
    const result = listData.find((item) => {
      return item.key === key;
    });
    return result;
  };

  const handleItemOneChange = (value, option) => {
    form.setFieldValue('city', undefined);
    if (option) {
      dispatch(
        fetchDataItemTwo({ type: typeTwo, parent_id: Number(option.key) }),
      );
      setListItemTwo(true);
    }
  };

  const handleClearItemOne = () => {
    form.setFieldValue('country', undefined);
    setListItemTwo(!listItemTwo);
    form.resetFields();
  };

  const handleClearItemTwo = () => {
    setListItemThree(!listItemThree);
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
    const filterSaveLocalStorage = JSON.parse(
      localStorage.getItem('filterCDD'),
    );

    if (
      checkTwoName(['industry_id', 'industry_type'], filterSaveLocalStorage)
    ) {
      const {
        location: { industries, ...restCountry },
        ...rest
      } = filterSaveLocalStorage;
      const result = { ...rest, location: { ...restCountry } };

      const propsToDelete = ['industry_id', 'industry_type'];
      propsToDelete.forEach((prop) => delete result[prop]);
      const newObj = { ...result };
      window.localStorage.setItem('filterCDD', JSON.stringify(newObj));
      dispatch(refreshCandidates(newObj));
      dispatch(getTagsCandidates(newObj));
      handleClearItemOne();
    }
    form.resetFields();
  };

  const handleSearch = () => {
    if (form.getFieldValue('city') === undefined) {
      const industryId = {
        industry_id: filterItemInListData(form.getFieldValue('country'), data)
          .key,
      };

      const industryType = { industry_type: 1 };
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const locationSaveLocal = dataSaveLocal.location;
      const newData = {
        ...dataSaveLocal,
        ...industryId,
        ...industryType,
        location: {
          ...locationSaveLocal,
          industries: {
            industry: {
              key: filterItemInListData(form.getFieldValue('country'), data)
                .key,
              label: filterItemInListData(form.getFieldValue('country'), data)
                .label,
            },
          },
        },
        page: 1,
      };
      dispatch(getTagsCandidates(newData));
      dispatch(fetchData(newData));
      return;
    }

    if (form.getFieldValue('category') === undefined) {
      const industryId = {
        industry_id: filterItemInListData(form.getFieldValue('city'), optionTwo)
          .key,
      };
      const industryType = { industry_type: 2 };

      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const locationSaveLocal = dataSaveLocal.location;
      const newData = {
        ...dataSaveLocal,
        ...industryId,
        ...industryType,
        location: {
          ...locationSaveLocal,
          industries: {
            industry: {
              key: filterItemInListData(form.getFieldValue('country'), data)
                .key,
              label: filterItemInListData(form.getFieldValue('country'), data)
                .label,
            },
            sector: {
              key: filterItemInListData(form.getFieldValue('city'), optionTwo)
                .key,
              label: filterItemInListData(form.getFieldValue('city'), optionTwo)
                .label,
            },
          },
        },
        page: 1,
      };
      dispatch(getTagsCandidates(newData));
      dispatch(fetchData(newData));
      return;
    }

    if (form.getFieldValue('category') !== undefined) {
      const industryId = {
        industry_id: filterItemInListData(
          form.getFieldValue('category'),
          optionThree,
        ).key,
      };

      const industryType = { industry_type: 3 };

      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const locationSaveLocal = dataSaveLocal.location;
      const newData = {
        ...dataSaveLocal,
        ...industryId,
        ...industryType,
        location: {
          ...locationSaveLocal,
          industries: {
            industry: {
              key: filterItemInListData(form.getFieldValue('country'), data)
                .key,
              label: filterItemInListData(form.getFieldValue('country'), data)
                .label,
            },
            sector: {
              key: filterItemInListData(form.getFieldValue('city'), optionTwo)
                .key,
              label: filterItemInListData(form.getFieldValue('city'), optionTwo)
                .label,
            },
            category: {
              key: filterItemInListData(
                form.getFieldValue('category'),
                optionThree,
              ).key,
              label: filterItemInListData(
                form.getFieldValue('category'),
                optionThree,
              ).label,
            },
          },
        },
        page: 1,
      };
      dispatch(getTagsCandidates(newData));
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
            <Form.Item name="city" style={{ marginBottom: '8px' }}>
              <Select
                onClear={handleClearItemTwo}
                disabled={!form.getFieldValue('country')}
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
                disabled={!form.getFieldValue('city')}
                showSearch
                placeholder="Select category"
                allowClear
                optionFilterProp="children"
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

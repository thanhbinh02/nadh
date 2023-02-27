import { Form, Select } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchSectors } from '../../store/categoriesSlice';

const { Option } = Select;
const FilterDropDownIndustry = ({
  data,
  optionTwo,
  optionThree,
  typeTwo,
  fetchDataItemTwo,
  fetchDataItemThree,
  typeThree,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [listItemTwo, setListItemTwo] = useState(false);
  const [listItemThree, setListItemThree] = useState(false);

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
                    <Option value={item.name} key={item.key} compare={item.key}>
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
                onChange={(value, option) => {
                  handleItemTwoChange(value, option);
                }}
              >
                {optionThree &&
                  optionThree?.map((item) => (
                    <Option value={item.name} key={item.key} compare={item.key}>
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

import { Table, Row, Col, Form, Select, Button, Checkbox } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { useState } from 'react';
import { getKeyWithLabel } from '../../utils/const';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';

const { Option } = Select;
export const FormIndustry = ({ form, industries, sectors, categories }) => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  const [openSave, setOpenSave] = useState(false);

  const handleCountryChange = (value, option) => {
    if (value !== undefined) {
      setOpenSave(true);
      dispatch(fetchSectors({ type: 2, parent_id: value }));
      form.setFieldValue('industry', getKeyWithLabel(option));
      form.setFieldValue('sector', undefined);
      form.setFieldValue('category', undefined);
    } else {
    }
  };

  const handleSectorChange = (value, option) => {
    if (value !== undefined) {
      dispatch(fetchCategories({ type: 3, parent_id: value }));
      form.setFieldValue('sector', getKeyWithLabel(option));
      form.setFieldValue('category', undefined);
    }
  };

  const handleCategoryChange = (value, option) => {
    if (value !== undefined) {
      form.setFieldValue('category', getKeyWithLabel(option));
    }
  };

  const handleClearIndustry = () => {
    setCheck(!check);
    form.setFieldValue('industry', undefined);
    form.setFieldValue('sector', undefined);
    form.setFieldValue('category', undefined);
  };

  const handleClearCity = () => {
    setCheck(!check);
    form.setFieldValue('sector', undefined);
    form.setFieldValue('category', undefined);
  };

  const onDropdownCity = (open, country) => {
    if (open && country?.key) {
      dispatch(fetchSectors({ type: 2, parent_id: country?.key }));
    }
  };

  const onDropdownDistrict = (open, city) => {
    if (open && city?.key) {
      dispatch(fetchCategories({ type: 3, parent_id: city?.key }));
    }
  };

  const handleSave = () => {
    setCheck(!check);
    if (form.getFieldValue('business_line') === undefined) {
      form.setFieldValue('business_line', [
        {
          industry: form.getFieldValue('industry'),
          sector: form.getFieldValue('sector'),
          category: form.getFieldValue('category'),
        },
      ]);
    } else {
      let currentData = form.getFieldValue('business_line');
      const currentValue = {
        industry: form.getFieldValue('industry'),
        sector: form.getFieldValue('sector'),
        category: form.getFieldValue('category'),
      };

      const isValueInArray = currentData.some(
        (item) =>
          ((item.category === undefined &&
            currentValue.category === undefined) ||
            (item.category?.key === currentValue.category?.key &&
              item.category?.label === currentValue.category?.label)) &&
          ((item.industry === undefined &&
            currentValue.industry === undefined) ||
            (item.industry?.key === currentValue.industry?.key &&
              item.industry?.label === currentValue.industry?.label)) &&
          ((item.sector === undefined && currentValue.sector === undefined) ||
            (item.sector?.key === currentValue.sector?.key &&
              item.sector?.label === currentValue.sector?.label)),
      );

      if (!isValueInArray) {
        currentData.push({
          industry: form.getFieldValue('industry'),
          sector: form.getFieldValue('sector'),
          category: form.getFieldValue('category'),
        });
        form.setFieldValue('business_line', currentData);
        setOpenSave(false);
      } else {
        toast.error('Industry exit!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    }
    form.setFieldValue('industry', undefined);
    form.setFieldValue('sector', undefined);
    form.setFieldValue('category', undefined);
  };

  const handlePrimary = (text, record, index) => {
    const valueCurrentBusinessLine = form.getFieldValue('business_line');
    if (record.primary === -1) {
      valueCurrentBusinessLine[index].primary = 1;
    } else {
      valueCurrentBusinessLine[index].primary = -1;
    }
    form.setFieldValue('business_line', valueCurrentBusinessLine);
    setCheck(!check);
  };

  const columns = [
    {
      title: 'Primary',
      dataIndex: 'primary',
      render: (text, record, index) => {
        return (
          <>
            {text === -1 && (
              <Checkbox
                checked={false}
                onClick={() => handlePrimary(text, record, index)}
              ></Checkbox>
            )}
            {text === 1 && (
              <Checkbox
                checked={true}
                onClick={() => handlePrimary(text, record, index)}
              ></Checkbox>
            )}
          </>
        );
      },
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      render: (text) => {
        return <div>{text}</div>;
      },
    },

    {
      title: 'Sector',
      dataIndex: 'sector',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <AiOutlineDelete
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => handleRemove(text, record, index)}
          />
        );
      },
    },
  ];

  const handleRemove = (text, record, index) => {
    const valueCurrentBusinessLine = form.getFieldValue('business_line');
    if (valueCurrentBusinessLine.length === 1) {
      form.setFieldValue('business_line', undefined);
      setOpenSave(false);
    } else {
      valueCurrentBusinessLine.splice(index, 1);
      console.log('valueCurrentBusinessLine', valueCurrentBusinessLine);
    }
    setCheck(!check);
  };

  const newData = form.getFieldValue('business_line')?.map((item, index) => ({
    key: index,
    primary: item?.primary ? item.primary : -1,
    industry: item?.industry?.label,
    sector: item?.sector?.label,
    category: item?.category?.label,
  }));

  return (
    <>
      <Row gutter={(0, 12)}>
        <Col span={8}>
          <Form.Item name="industry">
            <Select
              className="w-full"
              justify="start"
              align="start"
              placeholder="industry"
              optionFilterProp="children"
              onChange={(value, option) => handleCountryChange(value, option)}
              onClear={() => handleClearIndustry()}
            >
              {industries?.map((item) => (
                <Option value={item.key} key={item.key} label={item.label}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item dependencies={['industry']} name={'sector'}>
            <Select
              className="w-full"
              justify="start"
              align="start"
              placeholder="sector"
              onChange={(value, option) => handleSectorChange(value, option)}
              disabled={!form.getFieldValue('industry')}
              onDropdownVisibleChange={(open) =>
                onDropdownCity(open, form.getFieldValue('industry'))
              }
              onClear={() => handleClearCity()}
            >
              {sectors !== undefined &&
                sectors?.map((item) => (
                  <Option value={item.key} key={item.key} label={item.label}>
                    {item.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item dependencies={['sector']} name={'category'}>
            <Select
              className="w-full"
              justify="start"
              align="start"
              placeholder="category"
              disabled={!form.getFieldValue('sector')}
              onDropdownVisibleChange={(open) =>
                onDropdownDistrict(open, form.getFieldValue('sector'))
              }
              onChange={(value, option) => handleCategoryChange(value, option)}
            >
              {categories !== undefined &&
                categories.map((item) => (
                  <Option value={item.key} key={item.key} label={item.label}>
                    {item.label}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {openSave && (
        <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button
            danger
            style={{ marginRight: '10px' }}
            onClick={() => {
              setOpenSave(false);
              form.setFieldValue('industry', undefined);
              form.setFieldValue('sector', undefined);
              form.setFieldValue('category', undefined);
            }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={handleSave}>
            Save Industry
          </Button>
        </Col>
      )}

      {form.getFieldValue('business_line') !== undefined && (
        <Table
          columns={columns}
          dataSource={newData}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: true,
          }}
        />
      )}
    </>
  );
};

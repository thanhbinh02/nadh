import { Form, Select } from 'antd';
import { useDispatch } from 'react-redux';

const { Option } = Select;
export const FormItemSelectMultiple = ({
  options,
  name,
  label,
  actionDispatch,
  id,
  placeholder,
  dataDefault,
}) => {
  const dispatch = useDispatch();
  let defaultValue;
  if (id) {
    defaultValue = dataDefault.map((item) => Number(item.key));
  }

  const handleChange = (value) => {
    const selectedLabels = [];
    options.forEach((option) => {
      if (value.includes(option.key)) {
        selectedLabels.push(option.label);
      }
    });
    const result = [];

    for (let i = 0; i < value.length; i++) {
      result.push({
        key: value[i],
        label: selectedLabels[i],
      });
    }

    if (!id) {
      dispatch(actionDispatch({ value: result, label: name }));
    } else {
      const newData = {
        id: id,
        params: {
          [`${name}`]: result,
        },
      };

      dispatch(actionDispatch(newData));
    }
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%', borderRadius: '0px' }}
        optionFilterProp="children"
        onChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        {options.map((option) => {
          return (
            <Option key={option.key} value={option.key} label={option.key}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

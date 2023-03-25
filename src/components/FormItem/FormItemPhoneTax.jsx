import { Form, Select, Col, Input } from 'antd';

const { Option } = Select;

export const FormItemPhoneTax = ({
  name,
  phoneNumber,
  label,
  required,
  message,
}) => {
  const prefixSelector = (
    <Form.Item name={[name, 'phone_code']} noStyle>
      <Select
        style={{ width: '120px', borderRadius: '0px' }}
        showSearch
        defaultValue={1280}
        optionFilterProp="customFilterProp"
      >
        {phoneNumber.map((option) => {
          const customFilterProp = `${option.label} ${option.extra.dial_code}`;

          return (
            <Option
              key={option.key}
              value={option.key}
              label={option.label}
              customFilterProp={customFilterProp}
            >
              <div>
                <img
                  src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${option.extra.code.toLowerCase()}.svg`}
                  style={{
                    height: '1.1em',
                    width: '1.1em',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                  }}
                />
                <span style={{ marginLeft: '8px' }}>
                  {option.extra.dial_code}
                </span>
              </div>
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <Form.Item label={label} required={required}>
      <Input.Group>
        <Col span={24}>
          <Form.Item
            noStyle
            name={[name, 'number']}
            rules={
              message
                ? [
                    {
                      required: true,
                      message: message,
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: 'Please input number',
                    },
                  ]
                : [
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: 'Please input number',
                    },
                  ]
            }
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
              placeholder="ex: 981234567"
            />
          </Form.Item>
        </Col>
      </Input.Group>
    </Form.Item>
  );
};

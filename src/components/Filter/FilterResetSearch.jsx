import { Button, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ButtonReset } from '../CustomButton/ButtonReset';

export const FilterResetSearch = ({
  param,
  onClick,
  disabled,
  paramFrom,
  paramTo,
  form,
}) => {
  return (
    <>
      <Col span={12}>
        <ButtonReset
          param={param}
          paramFrom={paramFrom}
          paramTo={paramTo}
          form={form}
        />
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          size="small"
          style={{ width: '100%', borderRadius: '0px' }}
          icon={<SearchOutlined />}
          onClick={onClick}
          disabled={disabled}
        >
          Search
        </Button>
      </Col>
    </>
  );
};

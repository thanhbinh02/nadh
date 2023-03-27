import { Button, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

export const FilterResetSearch = ({
  param,
  onClick,
  keyPage,
  fetchData,
  getTags,
  changeDataDispatch,
  disabled,
}) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
    if (param === 'client_jobs') {
      delete dataSaveLocal['client_jobs_from'];
      delete dataSaveLocal['client_jobs_to'];
    } else if (param === 'updated_on') {
      delete dataSaveLocal['updated_on_from'];
      delete dataSaveLocal['updated_on_to'];
    } else {
      delete dataSaveLocal[param];
    }
    dispatch(fetchData(changeDataDispatch(dataSaveLocal)));
    dispatch(getTags(dataSaveLocal));
  };

  return (
    <>
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
          onClick={onClick}
          disabled={disabled}
        >
          Search
        </Button>
      </Col>
    </>
  );
};

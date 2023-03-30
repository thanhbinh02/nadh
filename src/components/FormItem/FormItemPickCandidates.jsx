import { Form, Select } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { changeDate } from '../../utils/const';
import { AiOutlineDelete } from 'react-icons/ai';

const { Option } = Select;

const finalValue = (option) => {
  return (
    <>
      <div style={{ fontWeight: '500' }}>
        {option?.code && <span>{option?.code?.slice(-3)} - </span>}
        <span>{option?.full_name}</span>
        {changeDate(option?.dob) && <span> - {changeDate(option?.dob)}</span>}
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>Positions applied: </span>
        <span>
          {option?.prefer_position?.positions
            ?.map((item) => item.label)
            .join(', ')}
        </span>
      </div>
      <div>
        <p style={{ fontWeight: '500' }}>Industry: </p>
        {option?.business_line?.map((item, index) => {
          return (
            <p key={index}>
              <span>{item?.industry?.label}</span>
              {item?.sector && <span>/ {item?.sector?.label}</span>}
              {item?.category && <span>/ {item?.category?.label}</span>}
            </p>
          );
        })}
      </div>
    </>
  );
};

export const FormItemPickCandidates = ({
  name,
  getData,
  defaultValue,
  form,
}) => {
  const [contentModal, setContentModal] = useState();
  const [checkSelect, setCheckSelect] = useState(true);
  const [listCandidate, setListCandidate] = useState([]);

  const { data } = useQuery([name, contentModal], () => getData(contentModal));

  useEffect(() => {
    const currentValue = listCandidate?.map((item) => item?.id);
    console.log('currentValue', currentValue);
    form.setFieldValue(name, currentValue);
  }, [listCandidate]);

  const handleChange = (value, option) => {
    console.log('value', value);
    const lengthOption = option.length;
    const currentOption = option[lengthOption - 1];
    setListCandidate([...listCandidate, currentOption.optionValue]);
    setContentModal();
  };

  const handleSearch = (value) => {
    if (value !== '' && value !== undefined) {
      setContentModal(value);
    }
  };

  const onDropdownVisibleChange = (open) => {
    if (open === true) {
      setCheckSelect(false);
    } else {
      setCheckSelect(true);
    }
  };

  const handleBlur = () => {
    // setContentModal();
  };

  const handleRemoveCandidate = (id) => {
    const newValue = listCandidate.filter((item) => item?.id !== id);
    setListCandidate(newValue);
  };

  return (
    <>
      <Form.Item name={name}>
        <Select
          mode="multiple"
          showSearch
          style={{ width: '100%', borderRadius: '0px' }}
          filterOption={false}
          onChange={handleChange}
          onSearch={handleSearch}
          className="select__pick-job"
          onDropdownVisibleChange={onDropdownVisibleChange}
          onBlur={handleBlur}
          defaultValue={defaultValue}
        >
          {data?.data?.map((option) => {
            const hasKeyOne = defaultValue?.find(
              (item) => item.candidate_id === option.id,
            );

            return (
              <Option
                key={option.id}
                value={option.id}
                disabled={hasKeyOne}
                optionValue={option}
              >
                {finalValue(option)}
              </Option>
            );
          })}
        </Select>
        {checkSelect && (
          <div className="placeholder__pick-job">Please select candidate</div>
        )}
      </Form.Item>
      {listCandidate.length !== 0 && (
        <div>
          <div
            style={{
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: '500',
              marginTop: '12px',
            }}
          >
            {listCandidate.length} Candidates Picked
          </div>
          <div>
            {listCandidate?.map((item, index) => {
              return (
                <div
                  key={item?.id}
                  style={{
                    padding: '10px 0px',
                    borderBottom: '1px solid rgb(221, 221, 221);',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span> {finalValue(item)}</span>
                  <span
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleRemoveCandidate(item?.id)}
                  >
                    <AiOutlineDelete />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

import { Form, Select, Button } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { changeDate } from '../../utils/const';
import { AiOutlineDelete } from 'react-icons/ai';
import { postCandidateFlowsJob } from '../../store/detailJobSlice';
import { useDispatch } from 'react-redux';
import { fetchDetailJobNotLoading } from '../../store/detailJobSlice';

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
  setModalOpen,
  job_id,
}) => {
  const dispatch = useDispatch();
  const [contentModal, setContentModal] = useState();
  const [checkSelect, setCheckSelect] = useState(true);

  const [listPickCandidate, setListPickCandidate] = useState([]);

  const { data } = useQuery([name, contentModal], () => getData(contentModal));

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
    setContentModal();
  };

  const handleSelect = (value) => {
    setListPickCandidate((prevState) => [
      ...prevState,
      data?.data?.find((option) => option.id === value),
    ]);
  };

  const handlePick = () => {
    const candidate_array = listPickCandidate?.map((item) => item.id);

    const newData = {
      candidate_array: candidate_array,
      job_id: job_id,
    };

    dispatch(postCandidateFlowsJob(newData))
      .unwrap()
      .then(() => {
        dispatch(fetchDetailJobNotLoading(job_id));
        setModalOpen(false);
      })
      .catch(() => {
        setModalOpen(false);
      });
  };

  return (
    <div>
      <Form.Item name={name}>
        <Select
          mode="multiple"
          showSearch
          style={{ width: '100%', borderRadius: '0px' }}
          filterOption={false}
          onSearch={handleSearch}
          className="select__pick-job"
          onDropdownVisibleChange={onDropdownVisibleChange}
          onBlur={handleBlur}
          value={[]}
          onSelect={handleSelect}
        >
          {data?.data?.map((option) => {
            const hasKeyOne = defaultValue?.find(
              (item) => item.candidate_id === option.id,
            );

            return (
              <Option
                key={option.id}
                value={option.id}
                disabled={
                  !!hasKeyOne ||
                  !!listPickCandidate.find(({ id }) => id === option.id)
                }
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

      {listPickCandidate.length !== 0 && (
        <div>
          <div
            style={{
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: '500',
              marginTop: '12px',
            }}
          >
            {listPickCandidate.length} Candidates Picked
          </div>

          <div
            className="pick_candidates"
            style={{
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            {listPickCandidate?.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span> {finalValue(item)}</span>
                  <span
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      paddingRight: '20px',
                      fontSize: '20px',
                    }}
                    onClick={() =>
                      setListPickCandidate((state) =>
                        state.filter(({ id }) => id !== item.id),
                      )
                    }
                  >
                    <AiOutlineDelete />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          disabled={listPickCandidate.length === 0 ? true : false}
          onClick={handlePick}
        >
          Pick
        </Button>
      </div>
    </div>
  );
};

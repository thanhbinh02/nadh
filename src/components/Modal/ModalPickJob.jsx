import { useSelector, useDispatch } from 'react-redux';
import { Modal, Row, Col, Select, Button } from 'antd';
import { useState } from 'react';
import { getValueIndustry } from './ModalCandidateAssessment';
import { AiOutlineDelete } from 'react-icons/ai';
import { postCandidateFlowsCandidate } from '../../store/detailCandidateSlice';

const CustomRow = ({ valueOne, valueTwo }) => {
  return (
    <Row gutter={(8, 8)} style={{ marginBottom: '12px' }}>
      <Col span={8} style={{ fontWeight: '500' }}>
        {valueOne}
      </Col>
      <Col span={16}>{valueTwo}</Col>
    </Row>
  );
};

const { Option } = Select;

const finalValue = (option) => {
  return (
    <div>
      <div style={{ fontWeight: '500' }}>
        {option?.job_id} - {option?.title.label} - {option?.end_date}
      </div>
      <div>
        <span style={{ fontWeight: '500' }}>Client Name: </span>
        {option?.client.name}
      </div>
      <div>
        <p style={{ fontWeight: '500' }}>Industry: </p>
        {option?.business_line.map((item, index) => (
          <p key={index}>
            <span>{item?.industry?.label}</span>
            {item?.sector && <span>/ {item?.sector?.label}</span>}
            {item?.category && <span>/ {item?.category?.label}</span>}
          </p>
        ))}
      </div>
    </div>
  );
};

export const ModalPickJob = ({ openModalPickJob, setOpenModalPickJob }) => {
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const jobs = useSelector((state) => state.jobs.data);
  const [listPickJob, setListPickJob] = useState([]);
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    setListPickJob((prevValue) => [
      ...prevValue,
      jobs?.find((option) => option.id === value),
    ]);
  };

  const handlePickJob = () => {
    const result = {
      candidate_id: detailCandidate?.id,
      job_array: listPickJob.map((item) => item?.id),
    };

    dispatch(postCandidateFlowsCandidate(result));
    setOpenModalPickJob(false);
    setListPickJob([]);
  };

  return (
    <Modal
      closable={false}
      footer={null}
      width={900}
      open={openModalPickJob}
      title="Pick Job"
      destroyOnClose
    >
      <CustomRow
        valueOne="Full name"
        valueTwo={
          <p style={{ textTransform: 'capitalize' }}>
            {detailCandidate?.full_name}
          </p>
        }
      />
      <CustomRow
        valueOne="Position Applied"
        valueTwo={
          detailCandidate?.prefer_position?.positions
            ?.map((item) => item.label)
            .join(', ') || '-'
        }
      />
      <CustomRow
        valueOne="Industry"
        valueTwo={getValueIndustry(detailCandidate?.business_line)}
      />
      <Row>
        <Col span={16}>
          <Select
            style={{ width: '100%' }}
            mode="multiple"
            optionFilterProp={false}
            placeholder="Please select job"
            value={[]}
            onSelect={handleSelect}
          >
            {jobs.map((job) => (
              <Option
                key={job.id}
                className="mb-3"
                disabled={
                  !!detailCandidate.flows.find(
                    (item) => item.job_id === job.id,
                  ) || !!listPickJob.find(({ id }) => id === job.id)
                }
              >
                {finalValue(job)}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      {listPickJob.length > 0 && (
        <>
          <div
            style={{
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: '500',
              marginTop: '12px',
            }}
          >
            {listPickJob.length} Jobs Picked
          </div>
          <div
            className="pick_candidates"
            style={{
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            {listPickJob.map((job) => (
              <Row key={job.id} style={{ marginBottom: '14px' }}>
                <Col span={20}>
                  <div>
                    <div style={{ fontWeight: '500' }}>
                      {job?.job_id} - {job?.title.label} - {job?.end_date}
                    </div>
                    <div>
                      <span style={{ fontWeight: '500' }}>Client Name: </span>
                      {job?.client.name}
                    </div>
                    <div>
                      <p style={{ fontWeight: '500' }}>Industry: </p>
                      {job?.business_line.map((item, index) => (
                        <p key={index}>
                          <span>{item?.industry?.label}</span>
                          {item?.sector && <span>/ {item?.sector?.label}</span>}
                          {item?.category && (
                            <span>/ {item?.category?.label}</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col span={4}>
                  <span
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      paddingRight: '20px',
                      fontSize: '20px',
                    }}
                    onClick={() =>
                      setListPickJob((state) =>
                        state.filter(({ id }) => id !== job.id),
                      )
                    }
                  >
                    <AiOutlineDelete />
                  </span>
                </Col>
              </Row>
            ))}
          </div>
        </>
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
          onClick={() => {
            setOpenModalPickJob(false);
            setListPickJob([]);
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          disabled={listPickJob.length === 0 ? true : false}
          onClick={handlePickJob}
        >
          Pick
        </Button>
      </div>
    </Modal>
  );
};

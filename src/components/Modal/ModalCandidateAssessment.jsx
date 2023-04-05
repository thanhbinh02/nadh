import { useSelector } from 'react-redux';
import { Modal, Row, Col } from 'antd';
import { useEffect } from 'react';

const CustomRow = ({ valueOne, valueTwo, valueThree, valueFour, notAllow }) => {
  return (
    <Row gutter={(8, 8)} style={{ marginBottom: '12px' }}>
      <Col span={6} style={{ fontWeight: '500' }}>
        {valueOne}
      </Col>
      <Col span={8} style={notAllow && { cursor: 'not-allowed' }}>
        {valueTwo}
      </Col>
      <Col span={2}>{valueThree}</Col>
      <Col span={8} style={notAllow && { cursor: 'not-allowed' }}>
        {valueFour}
      </Col>
    </Row>
  );
};

export const getValueIndustry = (value) => {
  const result = value?.map((item, index) => {
    return (
      <p key={index}>
        <>{item?.industry?.label}</>
        {item?.sector && <> / {item?.sector?.label}</>}
        {item?.category && <> / {item?.category?.label}</>}
      </p>
    );
  });
  if (result?.length > 0) {
    return result;
  } else {
    return '-';
  }
};

export const ModalCandidateAssessment = ({
  openModalCandidateAssessment,
  setOpenModalCandidateAssessment,
}) => {
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const dataFlow = useSelector((state) => state.detailCandidate.dataFlow);
  const candidateAssessment = useSelector(
    (state) => state.detailCandidate.candidateAssessment,
  );

  useEffect(() => {}, [candidateAssessment]);

  return (
    <Modal
      width={900}
      onCancel={() => setOpenModalCandidateAssessment(false)}
      open={openModalCandidateAssessment}
      footer={null}
      title="Candidate Assessment"
      destroyOnClose
    >
      <CustomRow
        valueTwo={
          <p style={{ fontWeight: '500' }}>
            CANDIDATE: {detailCandidate?.candidate_id} -{' '}
            {detailCandidate?.full_name}
          </p>
        }
        valueThree="Or"
        valueFour={
          <p style={{ fontWeight: '500' }}>
            JOB: {dataFlow?.flowItem?.job?.job_id} -{' '}
            {dataFlow?.flowItem?.job?.title?.label}
          </p>
        }
      />
      <CustomRow
        valueOne="Industry Year of Services"
        valueTwo={candidateAssessment?.candidate?.industry_experience || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.industry_experience || '-'}
      />
      <CustomRow
        valueOne="Industry"
        valueTwo={
          getValueIndustry(candidateAssessment?.candidate?.industry) || '-'
        }
        valueThree="Vs."
        valueFour={getValueIndustry(candidateAssessment?.job?.industry) || '-'}
      />
      <CustomRow
        valueOne="Appearance"
        valueTwo={candidateAssessment?.candidate?.appearance || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.appearance || '-'}
        notAllow
      />
      <CustomRow
        valueOne="Attitude"
        valueTwo={candidateAssessment?.candidate?.attitude || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.attitude || '-'}
        notAllow
      />
      <CustomRow
        valueOne="Communication"
        valueTwo={candidateAssessment?.candidate?.communication || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.communication || '-'}
        notAllow
      />
      <CustomRow
        valueOne="Job Competencies"
        valueTwo={candidateAssessment?.candidate?.competency || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.competency || '-'}
        notAllow
      />
      <CustomRow
        valueOne="Strengths"
        valueTwo={candidateAssessment?.candidate?.strength || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.strength || '-'}
        notAllow
      />
      <CustomRow
        valueOne="Others"
        valueTwo={candidateAssessment?.candidate?.other || '-'}
        valueThree="Vs."
        valueFour={candidateAssessment?.job?.other || '-'}
        notAllow
      />
    </Modal>
  );
};

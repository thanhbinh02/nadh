import { Card } from 'antd';

import FormPersonalInformationDetail from '../Form/FormPersonalInformationDetail';

export const CardFormPersonalInformationDetail = ({
  defaultValue,
  form,
  putCandidateType,
  putCandidatePositions,
  putCandidateEmail,
  setOpen,
  setCancel,
  cancel,
}) => {
  return (
    <Card
      title="Personal Information"
      style={{
        width: '100%',
      }}
    >
      <FormPersonalInformationDetail
        defaultValue={defaultValue}
        form={form}
        putCandidateType={putCandidateType}
        putCandidatePositions={putCandidatePositions}
        putCandidateEmail={putCandidateEmail}
        setOpen={setOpen}
        setCancel={setCancel}
        cancel={cancel}
      />
    </Card>
  );
};

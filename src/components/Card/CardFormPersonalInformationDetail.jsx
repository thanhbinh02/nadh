import { Card } from 'antd';

import FormPersonalInformationDetail from '../Form/FormPersonalInformationDetail';

export const CardFormPersonalInformationDetail = ({ form }) => {
  return (
    <Card
      title="Personal Information"
      style={{
        width: '100%',
      }}
    >
      <FormPersonalInformationDetail form={form} />
    </Card>
  );
};

import { Card } from 'antd';
import FormPersonalInformationAdd from '../Form/FormPersonalInformationAdd';

export const CardFormPersonalInformationAdd = ({ setCurrentStep }) => {
  return (
    <Card
      title="Personal Information"
      style={{
        width: '100%',
      }}
    >
      <FormPersonalInformationAdd setCurrentStep={setCurrentStep} />
    </Card>
  );
};

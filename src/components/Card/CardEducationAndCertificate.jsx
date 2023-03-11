import { Card } from 'antd';
import { TableAcademic } from '../Table/TableAcademic';
import { TableCertificate } from '../Table/TableCertificate';

export const CardEducationAndCertificate = () => {
  return (
    <Card
      title="EDUCATION AND CERTIFICATE"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <TableAcademic />
      <TableCertificate />
    </Card>
  );
};
// ACADEMIC

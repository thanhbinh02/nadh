import { Card } from 'antd';
import { TableAcademic } from '../Table/TableAcademic';
import { TableCertificate } from '../Table/TableCertificate';

export const CardEducationAndCertificate = ({ candidate_id }) => {
  console.log('candidate_id', candidate_id);
  return (
    <Card
      title="EDUCATION AND CERTIFICATE"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <TableAcademic candidate_id={candidate_id} />
      <TableCertificate />
    </Card>
  );
};

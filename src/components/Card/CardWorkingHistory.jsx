import { Card } from 'antd';
import { TableWorkingHistory } from '../Table/TableWorkingHistory';

export const CardWorkingHistory = ({ candidate_id, form }) => {
  return (
    <Card
      title="WORKING HISTORY"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <TableWorkingHistory candidate_id={candidate_id} form={form} />
    </Card>
  );
};

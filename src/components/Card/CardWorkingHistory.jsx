import { Card } from 'antd';
import { TableWorkingHistory } from '../Table/TableWorkingHistory';

export const CardWorkingHistory = () => {
  return (
    <Card
      title="WORKING HISTORY"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <TableWorkingHistory />
    </Card>
  );
};

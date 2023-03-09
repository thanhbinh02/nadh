import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export const Page404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to="/candidates">
        <Button type="primary">Back Candidates List</Button>
      </Link>
    }
  />
);

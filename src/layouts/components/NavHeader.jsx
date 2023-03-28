import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import { RiFileUserLine } from 'react-icons/ri';
import { BsCardChecklist } from 'react-icons/bs';

export const NavHeader = () => {
  return (
    <div style={{ marginLeft: '15px' }}>
      <Menu mode="horizontal">
        <Menu.Item key={0} icon={<RiFileUserLine />}>
          <Link to="/candidates">Candidates</Link>
        </Menu.Item>
        <Menu.Item key={1} icon={<FaUsers />}>
          <Link to="/clients"> Clients</Link>
        </Menu.Item>
        <Menu.Item key={2} icon={<BsCardChecklist />}>
          <Link to="/jobs"> Jobs</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

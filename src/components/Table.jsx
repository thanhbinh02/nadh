import { Table, Tag } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';

const columns = [
  {
    title: 'ID',
    dataIndex: 'candidate_id',
    filterIcon: <AiOutlineSearch />,
    filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
    filterIcon: <AiOutlineSearch />,
    filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Primary Status',
    dataIndex: 'priority_status',
    filterIcon: <AiOutlineSearch />,
    filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
    render: (text) => <Tag color="magenta">{text}</Tag>,
  },
  {
    title: 'Languages',
    dataIndex: 'languages',
    filterIcon: <AiOutlineSearch />,
    filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
    render: (_, record) => {
      return record.languages.map((language) => (
        <p key={language.key}>- {language.label}</p>
      ));
    },
  },
  {
    title: 'Highest degree',
    dataIndex: 'highest_education',
    filterIcon: <AiOutlineSearch />,
    filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'City',
    dataIndex: 'city',
    filterIcon: <AiOutlineSearch />,
    filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
    render: (text) => {
      return text?.map((item) => (
        <p key={item.country.key}>{item.country.label}</p>
      ));
    },
  },
  //   {
  //     title: 'Industry',
  //     dataIndex: 'industry',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //     render: (text) => {
  //       return text?.map((item) => (
  //         <p key={item.category.key}>* {item.category.name}</p>
  //       ));
  //     },
  //   },
  //   {
  //     title: 'YOB',
  //     dataIndex: 'yob',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //     render: (text) => {
  //       const newText = new Date(text);
  //       return <div>{newText.getFullYear()}</div>;
  //     },
  //   },
  //   {
  //     title: 'Activity',
  //     dataIndex: 'flow_status',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //     render: (text) => {
  //       return <div>{text}</div>;
  //     },
  //   },
  //   {
  //     title: 'Recent companies',
  //     dataIndex: 'current_employments_companies',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //     render: (text) => {
  //       return text?.map((item) => (
  //         <p key={item.category.key}>* {item.category.name}</p>
  //       ));
  //     },
  //   },
  //   {
  //     title: 'Recent positions',
  //     dataIndex: 'current_employments_positions',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //   },
  //   {
  //     title: 'Year of services',
  //     dataIndex: 'industry_years',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //   },
  //   {
  //     title: 'Year of management',
  //     dataIndex: 'management_years',
  //     filterIcon: <AiOutlineSearch />,
  //     filterDropdown: () => <div style={{ padding: 8 }}>Thanh Binh</div>,
  //   },
];

const MainTable = ({ data }) => {
  const newData = data?.map((item) => ({
    key: item.id,
    candidate_id: item.candidate_id,
    full_name: item.full_name,
    priority_status: item.priority_status,
    languages: item.languages,
    highest_education: item.highest_education.label,
    city: item.addresses,
    industry: item.business_line,
    yob: item.dob,
    flow_status: item.flow_status,
    current_employments_companies: item.current_employments,
    current_employments_positions: item.current_employments,
    industry_years: item.industry_years,
    management_years: item.management_years,
  }));

  return (
    <Table
      columns={columns}
      dataSource={newData}
      bordered
      title={() => 'Header'}
      footer={() => 'Footer'}
      scroll={{ x: '100vw' }}
    />
  );
};
export default MainTable;

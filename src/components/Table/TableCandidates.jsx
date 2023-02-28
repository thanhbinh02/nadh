import { Table, Tag } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FilterDropDownText } from '../Filter/FilterDropDownText';
import { FilterDropDownSelectOneItem } from '../Filter/FilterDropDownSelectOneItem';
import { priority_status } from '../../utils/const';
import FilterDropDownCountryCity from '../Filter/FilterDropDownCountryCity';
import FilterDropDownIndustry from '../Filter/FilterDropDownIndustry';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { FilterTimeRange } from '../Filter/FilterTimeRange';
import { candidate_flow_status } from '../../utils/const';
import { AiOutlineEye } from 'react-icons/ai';

const TableCandidates = ({
  data,
  languages,
  city,
  industries,
  sectors,
  categories,
}) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'candidate_id',
      filterIcon: <AiOutlineSearch name={'Search candidate_id'} />,
      filterDropdown: <FilterDropDownText placeholder="Search candidate_id" />,
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: <FilterDropDownText placeholder="Search full_name" />,
      render: (text) => <Link>{text}</Link>,
    },
    {
      title: 'Primary Status',
      dataIndex: 'priority_status',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Priority_status"
          options={priority_status}
        />
      ),
      render: (text) => {
        if (text === 1) {
          return <Tag color="success">Active</Tag>;
        }
        if (text === -1) {
          return <Tag color="processing">Off-limit</Tag>;
        }
      },
    },
    {
      title: 'Languages',
      dataIndex: 'languages',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Languages"
          options={languages}
          mode="multiple"
        />
      ),
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
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Highest_education"
          options={languages}
          mode="multiple"
        />
      ),
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'City',
      dataIndex: 'city',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: <FilterDropDownCountryCity data={city} />,
      render: (text) => {
        return text?.map((item, index) => (
          <p key={index}>{item.country.label}</p>
        ));
      },
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: (
        <FilterDropDownIndustry
          data={industries}
          optionTwo={sectors}
          optionThree={categories}
          typeTwo={2}
          fetchDataItemTwo={fetchSectors}
          fetchDataItemThree={fetchCategories}
          typeThree={3}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <p key={index}>* {item?.sector?.name}</p>
        ));
      },
    },
    {
      title: 'YOB',
      dataIndex: 'yob',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: <FilterTimeRange />,
      render: (text) => {
        if (text) {
          const newText = text.split('-');
          return <div>{newText[0]}</div>;
        }
      },
    },
    {
      title: 'Activity',
      dataIndex: 'flow_status',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Languages"
          options={candidate_flow_status}
          mode="multiple"
        />
      ),
      render: (text) => {
        if (text === 2) {
          return <div>Screening Call</div>;
        }
        if (text === 1) {
          return <div>Raw</div>;
        }
        if (text === -3) {
          return <div>Rejected by Client</div>;
        }
        return <div>{text}</div>;
      },
    },
    {
      title: 'Recent companies',
      dataIndex: 'current_employments_companies',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: (
        <FilterDropDownText placeholder="Search current_company" />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <p key={index}>* {item?.organization?.label}</p>
        ));
      },
    },
    {
      title: 'Recent positions',
      dataIndex: 'current_employments_positions',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: (
        <FilterDropDownText placeholder="Search current_company_text" />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <p key={index}>* {item?.title?.label}</p>
        ));
      },
    },
    {
      title: 'Year of services',
      dataIndex: 'industry_years',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: <FilterTimeRange />,
    },
    {
      title: 'Year of management',
      dataIndex: 'management_years',
      filterIcon: <AiOutlineSearch />,
      filterDropdown: <FilterTimeRange />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text) => {
        return <AiOutlineEye />;
      },
    },
  ];

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
    <div
      style={{
        marginLeft: '30px',
        marginRight: '30px',
        padding: '10px 24px',
      }}
    >
      <Table
        columns={columns}
        dataSource={newData}
        title={() => 'Header'}
        scroll={{ x: '140vw' }}
      />
    </div>
  );
};
export default TableCandidates;

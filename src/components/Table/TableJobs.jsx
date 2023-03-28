import { Table, Tag, Spin } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagFilter from '../TagFilter';
import {
  EXPERIENCE_LEVEL,
  STATUS_JOB,
  CUSTOM_COLUMNS_JOBS,
  changeLocalJobToParams,
  candidate_flow_status,
  MONEY,
} from '../../utils/const';

import { FilterDropDownText } from '../Filter/FilterDropDownText';
import { FilterDropDownSelectOneItem } from '../Filter/FilterDropDownSelectOneItem';
import { FilterTimeRange } from '../Filter/FilterTimeRange';
import FilterDropDownIndustry from '../Filter/FilterDropDownIndustry';
import FilterDropDownCountryCityClient from '../Filter/FilterDropDownCountryCityClient';
import { FilterDatePicker } from '../Filter/FilterDatePicker';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { IconFIlter } from '../IconFIlter';
import { getTagsJobs } from '../../store/tagsJobsSlice';
import { fetchJobs } from '../../store/jobsSlice';
import { filterTagJobs } from '../../utils/filterTagJobs';
import { FilterSalaryRange } from '../Filter/FilterSalaryRange';

const TableJobs = ({
  data,
  industries,
  sectors,
  categories,
  filterJobs,
  loadingJobs,
  users,
  listTagFilter,
}) => {
  const dispatch = useDispatch();
  const listCustomCandidates = useSelector((state) => state.customColumn.data);
  const [pageTable, setPageTable] = useState(filterJobs?.page);
  const totalItem = useSelector((state) => state.jobs.count);
  const [totalMain, setTotalMain] = useState(totalItem);

  useEffect(() => {
    setPageTable(filterJobs?.page);
    setTotalMain(totalItem);
  }, [filterJobs?.page, totalItem]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'job_id',
      filterIcon: <IconFIlter name="job_id" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search job_id"
          param="job_id"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.job_id || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        return <Link to={`/job-detail/${text}`}>{text}</Link>;
      },
    },
    {
      title: 'Title',
      dataIndex: 'title_text',
      filterIcon: <IconFIlter name="title_text" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search title_text"
          param="title_text"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.title_text || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
          listTags={CUSTOM_COLUMNS_JOBS}
        />
      ),
      render: (text, record) => {
        return <Link to={`/client-detail/${record.client_id}`}>{text}</Link>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      filterIcon: (
        <>
          {filterJobs?.quantity ? (
            <IconFIlter name={'quantity_to'} listFilter={filterJobs} />
          ) : (
            <IconFIlter name={'quantity_from'} listFilter={filterJobs} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchJobs}
          paramFrom="quantity_from"
          paramTo="quantity_to"
          keyPage="filterJobs"
          filterValueFrom={filterJobs?.quantity_from || undefined}
          filterValueTo={filterJobs?.quantity_to || undefined}
          changeDataDispatch={changeLocalJobToParams}
          getTags={getTagsJobs}
          param="quantity"
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Open Date',
      dataIndex: 'target_date',
      filterIcon: (
        <>
          {filterJobs?.client_jobs_to ? (
            <IconFIlter name={'target_day_to'} listFilter={filterJobs} />
          ) : (
            <IconFIlter name={'target_day_from'} listFilter={filterJobs} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDatePicker
          fetchData={fetchJobs}
          paramFrom="target_day_from"
          paramTo="target_day_to"
          keyPage="filterJobs"
          filterValueFrom={filterJobs?.target_day_from || undefined}
          filterValueTo={filterJobs?.target_day_to || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
          param="target_date"
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Expire Date',
      dataIndex: 'end_date',
      filterIcon: (
        <>
          {filterJobs?.client_jobs_to ? (
            <IconFIlter name={'end_day_to'} listFilter={filterJobs} />
          ) : (
            <IconFIlter name={'end_day_from'} listFilter={filterJobs} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDatePicker
          fetchData={fetchJobs}
          paramFrom="end_day_from"
          paramTo="end_day_to"
          keyPage="filterJobs"
          filterValueFrom={filterJobs?.end_day_from || undefined}
          filterValueTo={filterJobs?.end_day_to || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
          param="end_date"
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filterIcon: <IconFIlter name="status" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Status"
          options={STATUS_JOB}
          mode="multiple"
          param="status"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.status || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        const item = STATUS_JOB.find((item) => item.key === text);
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: 'Client',
      dataIndex: 'client',
      filterIcon: <IconFIlter name="client" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Client"
          options={users}
          mode="multiple"
          param="client"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.client || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Search Consultant',
      dataIndex: 'search_consultants',
      filterIcon: (
        <IconFIlter name="search_consultants" listFilter={filterJobs} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search search_consultants"
          options={users}
          mode="multiple"
          param="search_consultants"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.search_consultants || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        return (
          <Tag
            type="primary"
            color="purple"
            style={{ textTransform: 'capitalize' }}
          >
            {text[0]?.full_name}
          </Tag>
        );
      },
    },
    {
      title: 'Activity',
      dataIndex: 'candidate_flows_status',
      filterIcon: (
        <IconFIlter name="candidate_flows_status" listFilter={filterJobs} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          mode="multiple"
          placeholder="Search candidate_flows_status"
          options={candidate_flow_status}
          param="candidate_flows_status"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.candidate_flows_status || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        if (text !== undefined) {
          const item = candidate_flow_status.find((item) => item.key === text);
          return <div>{item?.label}</div>;
        }
      },
    },
    {
      title: 'Experience level',
      dataIndex: 'experience_level',
      filterIcon: (
        <IconFIlter name="experience_level" listFilter={filterJobs} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search experience_level"
          options={EXPERIENCE_LEVEL}
          mode="multiple"
          param="experience_level"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.experience_level || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        const item = EXPERIENCE_LEVEL.find((item) => item.key === text);
        return <div>{item?.label}</div>;
      },
    },
    {
      title: 'Mapping by',
      dataIndex: 'mapping_by',
      filterIcon: <IconFIlter name="mapping_by" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search mapping_by"
          options={users}
          mode="multiple"
          param="mapping_by"
          fetchData={fetchJobs}
          keyPage="filterJobs"
          filterValue={filterJobs?.mapping_by || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        if (text.length !== 0) {
          return (
            <>
              {text?.map((item, index) => (
                <Tag
                  type="primary"
                  color="purple"
                  style={{ textTransform: 'capitalize', marginBottom: '12px' }}
                  key={index}
                >
                  {item?.full_name}
                </Tag>
              ))}
            </>
          );
        }
      },
    },
    {
      title: 'City',
      dataIndex: 'location',
      filterIcon: <IconFIlter name="location" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownCountryCityClient
          fetchData={fetchJobs}
          keyPage="filterJobs"
          country={filterJobs?.location?.country || undefined}
          city={filterJobs?.location?.city || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        return (
          <>
            {text?.city?.label ? (
              <div>
                {text?.country?.label} {text?.city?.label}
              </div>
            ) : (
              <div>{text?.country?.label}</div>
            )}
          </>
        );
      },
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      filterIcon: <IconFIlter name="industry" listFilter={filterJobs} />,
      filterDropdown: (
        <FilterDropDownIndustry
          data={industries}
          optionTwo={sectors}
          optionThree={categories}
          typeTwo={2}
          fetchDataItemTwo={fetchSectors}
          fetchDataItemThree={fetchCategories}
          typeThree={3}
          keyPage="filterJobs"
          fetchData={fetchJobs}
          filterValueOptionOne={filterJobs?.industry?.industry || undefined}
          filterValueOptionTwo={filterJobs?.industry?.sector || undefined}
          filterValueOptionThree={filterJobs?.industry?.category || undefined}
          getTags={getTagsJobs}
          changeDataDispatch={changeLocalJobToParams}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => {
          if (item?.category?.name) {
            return <p key={index}>* {item?.category?.name}</p>;
          }
          if (item?.sector?.name) {
            return <p key={index}>* {item?.sector?.name}</p>;
          }
          if (item?.industry?.name) {
            return <p key={index}>* {item?.industry?.name}</p>;
          }
        });
      },
    },
    {
      title: 'Year of services',
      dataIndex: 'industry_years',
      filterIcon: (
        <>
          {filterJobs?.industry_year_to ? (
            <IconFIlter name={'industry_year_to'} listFilter={filterJobs} />
          ) : (
            <IconFIlter name={'industry_year_from'} listFilter={filterJobs} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchJobs}
          paramFrom="industry_year_from"
          paramTo="industry_year_to"
          keyPage="filterJobs"
          filterValueFrom={filterJobs?.industry_year_from || undefined}
          filterValueTo={filterJobs?.industry_year_to || undefined}
          changeDataDispatch={changeLocalJobToParams}
          getTags={getTagsJobs}
          param="client_jobs"
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Salary Range',
      dataIndex: 'salary',
      filterIcon: (
        <>
          {filterJobs?.salary_to ? (
            <IconFIlter name={'salary_to'} listFilter={filterJobs} />
          ) : (
            <IconFIlter name={'salary_from'} listFilter={filterJobs} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterSalaryRange
          fetchData={fetchJobs}
          paramFrom="salary_from"
          paramTo="salary_to"
          keyPage="filterJobs"
          filterValueFrom={filterJobs?.salary_from}
          filterValueTo={filterJobs?.salary_to}
          changeDataDispatch={changeLocalJobToParams}
          getTags={getTagsJobs}
          param="salary"
          filterCurrency={filterJobs?.currency}
        />
      ),
      render: (text) => {
        const unitMoney = MONEY.find((item) => item.id === text?.currency?.id);

        if (text?.salary?.from === null && text?.salary?.to === null) {
          return (
            <Tag type="primary" color="red">
              Negotiation
            </Tag>
          );
        }
        if (text?.salary?.from !== null && text?.salary?.to !== null) {
          return (
            <>
              <Tag type="primary" color={unitMoney?.color}>
                {unitMoney?.name}
              </Tag>
              {Number(text?.salary?.from).toFixed(0)}
              <span> - </span>
              {Number(text?.salary?.to).toFixed(0)}
            </>
          );
        }
        if (text?.salary?.from !== null && text?.salary?.to === null) {
          return (
            <>
              <Tag type="primary" color={unitMoney?.color}>
                {unitMoney?.name}
              </Tag>
              {Number(text?.salary?.from).toFixed(0)}
              <span> - </span>
              Max
            </>
          );
        }
        if (text?.salary?.from === null && text?.salary?.to !== null) {
          return (
            <>
              <Tag type="primary" color={unitMoney?.color}>
                {unitMoney?.name}
              </Tag>
              0<span> - </span>
              {Number(text?.salary?.to).toFixed(0)}
            </>
          );
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <Link to={`/candidate-detail/${record.candidate_id}`}>
            <AiOutlineEye />
          </Link>
        );
      },
    },
  ];

  const newColumns = [];

  for (let i = 0; i < columns.length; i++) {
    if (listCustomCandidates.includes(columns[i].dataIndex)) {
      newColumns.push(columns[i]);
    }
  }

  const newData = data?.map((item) => ({
    key: item?.id,
    job_id: item?.job_id,
    title_text: item?.title?.label,
    quantity: item?.quantity,
    target_date: item?.target_date,
    end_date: item?.end_date,
    status: item?.status,
    client: item?.client?.name,
    candidate_flows_status: item?.recent_flow?.status,
    search_consultants: item?.recruiters,
    experience_level: item?.experience_level,
    mapping_by: item?.related_users,
    industry: item?.business_line,
    location: item?.location,
    industry_years: item?.requirement?.industry_years,
    salary: item?.remuneration,
  }));

  return (
    <div
      style={{
        marginLeft: '54px',
        marginRight: '54px',
      }}
    >
      <TagFilter
        tags={filterTagJobs(listTagFilter)}
        keyPage="filterJobs"
        listTags={CUSTOM_COLUMNS_JOBS}
        getTags={getTagsJobs}
        changeDataDispatch={changeLocalJobToParams}
        fetchData={fetchJobs}
      />
      {loadingJobs ? (
        <Spin tip="Loading...">
          <Table
            columns={newColumns}
            scroll={{ x: '110vw' }}
            dataSource={newData}
          />
        </Spin>
      ) : (
        <Table
          columns={newColumns}
          dataSource={newData}
          scroll={{ x: '110vw' }}
          pagination={{
            pageSize: 10,
            total: totalMain,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: (page) => {
              setPageTable(page);
              let newParam = filterJobs;
              newParam.page = page;
              dispatch(fetchJobs(newParam));
            },
            current: pageTable,
          }}
        />
      )}
    </div>
  );
};
export default TableJobs;

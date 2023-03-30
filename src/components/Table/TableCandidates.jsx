import { Table, Tag, Spin } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterDropDownText } from '../Filter/FilterDropDownText';
import { FilterDropDownSelectOneItem } from '../Filter/FilterDropDownSelectOneItem';
import FilterDropDownIndustry from '../Filter/FilterDropDownIndustry';
import { FilterTimeRange } from '../Filter/FilterTimeRange';

import { filterTagCandidates } from '../../utils/filterTagCandidates';
import {
  priority_status,
  candidate_flow_status,
  CUSTOM_COLUMNS_CANDIDATES,
} from '../../utils/const';

import { fetchSectors, fetchCategories } from '../../store/categoriesSlice';
import { fetchCandidates } from '../../store/candidatesSlice';
import { getTagsCandidates } from '../../store/tagsCandidatesSlice';
import TagFilter from '../TagFilter';
import { changeLocalCandidateToParams } from '../../utils/filterTagCandidates';
import { IconFIlter } from '../IconFIlter';
import FilterDropDownCountryCityClient from '../Filter/FilterDropDownCountryCityClient';

const TableCandidates = ({
  data,
  languages,
  industries,
  sectors,
  categories,
  listTagFilter,
  filerCandidates,
  loadingCandidate,
}) => {
  const dispatch = useDispatch();
  const listCustomCandidates = useSelector((state) => state.customColumn.data);
  const [pageTable, setPageTable] = useState(filerCandidates?.page);
  const totalItem = useSelector((state) => state.candidates.count);
  const [totalMain, setTotalMain] = useState(totalItem);

  useEffect(() => {
    setPageTable(filerCandidates?.page);
    setTotalMain(totalItem);
  }, [filerCandidates?.page, totalItem]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'candidate_id',
      filterIcon: (
        <IconFIlter name="candidate_id" listFilter={filerCandidates} />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search candidate_id"
          param="candidate_id"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.candidate_id || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text) => {
        return <Link to={`/candidate-detail/${text}`}>{text}</Link>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      filterIcon: <IconFIlter name="full_name" listFilter={filerCandidates} />,
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search full_name"
          param="full_name"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.full_name || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text, record) => {
        return (
          <Link to={`/candidate-detail/${record.candidate_id}`}>{text}</Link>
        );
      },
    },
    {
      title: 'Primary Status',
      dataIndex: 'priority_status',
      filterIcon: (
        <IconFIlter name="priority_status" listFilter={filerCandidates} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Priority_status"
          options={priority_status}
          param="priority_status"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.priority_status || undefined}
          getTags={getTagsCandidates}
          type="candidates"
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text) => {
        if (text === 1) {
          return <Tag color="success">Active</Tag>;
        }
        if (text === -1) {
          return <Tag color="processing">Off-limit</Tag>;
        }
        if (text === -2) {
          return (
            <Tag type="primary" color="pink">
              Blacklist
            </Tag>
          );
        }
        if (text === 5) {
          return (
            <Tag type="primary" color="red">
              Inactive
            </Tag>
          );
        }
      },
    },
    {
      title: 'Languages',
      dataIndex: 'language',
      filterIcon: <IconFIlter name="language" listFilter={filerCandidates} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Languages"
          options={languages}
          mode="multiple"
          param="language"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.language || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
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
      filterIcon: (
        <IconFIlter name="highest_education" listFilter={filerCandidates} />
      ),
      filterDropdown: <div>Filter</div>,
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'City',
      dataIndex: 'location',
      filterIcon: <IconFIlter name="location" listFilter={filerCandidates} />,
      filterDropdown: (
        <FilterDropDownCountryCityClient
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          country={filerCandidates?.location?.country || undefined}
          city={filerCandidates?.location?.city || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <div key={index}>
            {item.city?.label ? (
              <>
                {item.country.label} -<p> {item.city.label}</p>
              </>
            ) : (
              <> {item.country.label}</>
            )}
          </div>
        ));
      },
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      filterIcon: <IconFIlter name="industry" listFilter={filerCandidates} />,
      filterDropdown: (
        <FilterDropDownIndustry
          data={industries}
          optionTwo={sectors}
          optionThree={categories}
          typeTwo={2}
          fetchDataItemTwo={fetchSectors}
          fetchDataItemThree={fetchCategories}
          typeThree={3}
          keyPage="filterCDD"
          fetchData={fetchCandidates}
          filterValueOptionOne={
            filerCandidates?.industry?.industry || undefined
          }
          filterValueOptionTwo={filerCandidates?.industry?.sector || undefined}
          filterValueOptionThree={
            filerCandidates?.industry?.category || undefined
          }
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
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
      title: 'YOB',
      dataIndex: 'yob',
      filterIcon: (
        <>
          {filerCandidates?.quantity ? (
            <IconFIlter name={'yob_to'} listFilter={filerCandidates} />
          ) : (
            <IconFIlter name={'yob_from'} listFilter={filerCandidates} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchCandidates}
          paramFrom="yob_from"
          paramTo="yob_to"
          keyPage="filterCDD"
          filterValueFrom={filerCandidates?.yob_from || undefined}
          filterValueTo={filerCandidates?.yob_to || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
          param="yob"
        />
      ),
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
      filterIcon: (
        <IconFIlter name="flow_status" listFilter={filerCandidates} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Activity"
          options={candidate_flow_status}
          mode="multiple"
          param="flow_status"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.flow_status || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text) => {
        const item = candidate_flow_status?.find(
          (item) => item.key === Number(text),
        );
        return <div>{item?.label}</div>;
      },
    },
    {
      title: 'Recent companies',
      dataIndex: 'current_company',
      filterIcon: (
        <IconFIlter name="current_company" listFilter={filerCandidates} />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search current_company"
          param="current_company"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.current_company || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <p key={index}>- {item?.organization?.label}</p>
        ));
      },
    },
    {
      title: 'Recent positions',
      dataIndex: 'current_position',
      filterIcon: (
        <IconFIlter name="current_position" listFilter={filerCandidates} />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search current_position"
          param="current_position"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.current_position || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <p key={index}>- {item?.title?.label}</p>
        ));
      },
    },
    {
      title: 'Year of services',
      dataIndex: 'industry_years',
      filterIcon: (
        <>
          {filerCandidates?.industry_years_to ? (
            <IconFIlter
              name={'industry_years_to'}
              listFilter={filerCandidates}
            />
          ) : (
            <IconFIlter
              name={'industry_years_from'}
              listFilter={filerCandidates}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchCandidates}
          paramFrom="industry_years_from"
          paramTo="industry_years_to"
          keyPage="filterCDD"
          filterValueFrom={filerCandidates?.industry_years_from || undefined}
          filterValueTo={filerCandidates?.industry_years_to || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
          param="industry_years"
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Year of management',
      dataIndex: 'management_years',
      filterIcon: (
        <>
          {filerCandidates?.industry_years_to ? (
            <IconFIlter
              name={'management_years_from'}
              listFilter={filerCandidates}
            />
          ) : (
            <IconFIlter
              name={'management_years_from'}
              listFilter={filerCandidates}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchCandidates}
          paramFrom="management_years_from"
          paramTo="management_years_to"
          keyPage="filterCDD"
          filterValueFrom={filerCandidates?.management_years_from || undefined}
          filterValueTo={filerCandidates?.management_years_to || undefined}
          getTags={getTagsCandidates}
          changeDataDispatch={changeLocalCandidateToParams}
          param="management_years"
        />
      ),
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
    key: item.id,
    candidate_id: item.candidate_id,
    full_name: item.full_name,
    priority_status: item.priority_status,
    languages: item.languages,
    highest_education: item.highest_education.label,
    location: item.addresses,
    industry: item.business_line,
    yob: item.dob,
    flow_status: item.flow_status,
    current_company: item.current_employments,
    current_position: item.current_employments,
    industry_years: item.industry_years,
    management_years: item.management_years,
  }));

  return (
    <div
      style={{
        marginLeft: '54px',
        marginRight: '54px',
      }}
    >
      <TagFilter
        tags={filterTagCandidates(listTagFilter)}
        keyPage="filterCDD"
        listTags={CUSTOM_COLUMNS_CANDIDATES}
        getTags={getTagsCandidates}
        changeDataDispatch={changeLocalCandidateToParams}
        fetchData={fetchCandidates}
      />
      {loadingCandidate ? (
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
              let newParam = filerCandidates;
              newParam.page = page;
              dispatch(fetchCandidates(changeLocalCandidateToParams(newParam)));
              dispatch(getTagsCandidates(newParam));
            },
            current: pageTable,
          }}
        />
      )}
    </div>
  );
};
export default TableCandidates;

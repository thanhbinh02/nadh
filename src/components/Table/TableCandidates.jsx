import { Table, Tag, Spin } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye } from 'react-icons/ai';

import { FilterDropDownText } from '../Filter/FilterDropDownText';
import { FilterDropDownSelectOneItem } from '../Filter/FilterDropDownSelectOneItem';
import FilterDropDownCountryCity from '../Filter/FilterDropDownCountryCity';
import FilterDropDownIndustry from '../Filter/FilterDropDownIndustry';
import { filterTagCandidates } from '../../utils/filterTagCandidates';
import { FilterTimeRange } from '../Filter/FilterTimeRange';

import { priority_status } from '../../utils/const';
import { candidate_flow_status } from '../../utils/const';

import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { fetchCandidates } from '../../store/candidatesSlice';
import TagFilter from '../TagFilter';
import { getTagsCandidates } from '../../store/tagsCandidatesSlice';

const checkIconGlow = (name, obj) => {
  if (obj) {
    if (name in obj) {
      return true;
    } else {
      return false;
    }
  }
};

const TableCandidates = ({
  data,
  languages,
  city,
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
        <>
          {checkIconGlow('candidate_id', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search candidate_id"
          param="candidate_id"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.candidate_id || undefined}
          getTags={getTagsCandidates}
        />
      ),
      render: (text) => {
        return <Link to={`/candidate-detail/${text}`}>{text}</Link>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      filterIcon: (
        <>
          {checkIconGlow('full_name', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search full_name"
          param="full_name"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.full_name || undefined}
          getTags={getTagsCandidates}
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
        <>
          {checkIconGlow('priority_status', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Priority_status"
          options={priority_status}
          param="priority_status"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.priority_status || undefined}
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
      filterIcon: (
        <>
          {checkIconGlow('language', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search Languages"
          options={languages}
          mode="multiple"
          param="language"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.language || undefined}
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
        <>
          {checkIconGlow('highest_education', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: <div>Filter</div>,
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'City',
      dataIndex: 'location',
      filterIcon: (
        <>
          {checkIconGlow('country', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownCountryCity
          data={city}
          keyPage="filterCDD"
          country={filerCandidates?.country || undefined}
          city={filerCandidates?.city || undefined}
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
      filterIcon: (
        <>
          {checkIconGlow('industry_id', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
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
            filerCandidates?.location?.industries?.industry?.key || undefined
          }
          filterValueOptionTwo={
            filerCandidates?.location?.industries?.sector?.key || undefined
          }
          filterValueOptionThree={
            filerCandidates?.location?.industries?.category?.key || undefined
          }
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
          {checkIconGlow('yob_from', filerCandidates) ||
          checkIconGlow('yob_to', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
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
        <>
          {checkIconGlow('flow_status', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
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
        <>
          {checkIconGlow('current_company_text', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search current_company"
          param="current_company_text"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.current_company_text || undefined}
          getTags={getTagsCandidates}
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
        <>
          {checkIconGlow('current_position_text', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
            />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search current_position_text"
          param="current_position_text"
          fetchData={fetchCandidates}
          keyPage="filterCDD"
          filterValue={filerCandidates?.current_position_text || undefined}
          getTags={getTagsCandidates}
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
          {checkIconGlow('industry_years_to', filerCandidates) ||
          checkIconGlow('industry_years_from', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
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
        />
      ),
    },
    {
      title: 'Year of management',
      dataIndex: 'management_years',
      filterIcon: (
        <>
          {checkIconGlow('management_years_from', filerCandidates) ||
          checkIconGlow('management_years_to', filerCandidates) ? (
            <AiOutlineSearch
              style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
            />
          ) : (
            <AiOutlineSearch
              name={'Search candidate_id'}
              style={{ fontSize: '14px' }}
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
          filterValueTo={filerCandidates?.management_years_from || undefined}
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
      <TagFilter tags={filterTagCandidates(listTagFilter, languages)} />
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
              dispatch(fetchCandidates(newParam));
            },
            current: pageTable,
          }}
        />
      )}
    </div>
  );
};
export default TableCandidates;

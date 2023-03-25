import { Table, Tag, Spin } from 'antd';
import { AiOutlineSearch, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterDropDownText } from '../Filter/FilterDropDownText';
import { filterTagCandidates } from '../../utils/filterTagCandidates';
import { fetchCandidates } from '../../store/candidatesSlice';
import TagFilter from '../TagFilter';
import FilterDropDownCountryCity from '../Filter/FilterDropDownCountryCity';
import { FilterDropDownSelectOneItem } from '../Filter/FilterDropDownSelectOneItem';
import {
  ACCOUNT_STATUS,
  CPA,
  TYPE_CLIENT,
  STATUS_CLIENT,
} from '../../utils/const';
import { FilterTimeRange } from '../Filter/FilterTimeRange';

const checkIconGlow = (name, obj) => {
  if (obj) {
    if (name in obj) {
      return true;
    } else {
      return false;
    }
  }
};

const TableClients = ({
  data,
  city,
  filerCandidates,
  loadingCandidate,
  users,
}) => {
  const dispatch = useDispatch();
  const listCustomCandidates = useSelector((state) => state.customColumn.data);
  const [pageTable, setPageTable] = useState(filerCandidates?.page);
  const totalItem = useSelector((state) => state.clients.count);
  const [totalMain, setTotalMain] = useState(totalItem);

  useEffect(() => {
    setPageTable(filerCandidates?.page);
    setTotalMain(totalItem);
  }, [filerCandidates?.page, totalItem]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'client_id',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search client_id"
          param="client_id"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.client_id || undefined}
        />
      ),
      render: (text) => {
        return <Link to={`/client-detail/${text}`}>{text}</Link>;
      },
    },
    {
      title: 'Trade Name',
      dataIndex: 'name',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search Trade Name"
          param="name"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.name || undefined}
        />
      ),
      render: (text, record) => {
        return <Link to={`/client-detail/${record.client_id}`}>{text}</Link>;
      },
    },
    {
      title: 'City',
      dataIndex: 'location',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownCountryCity
          data={city}
          keyPage="filterClient"
          country={filerCandidates?.country || undefined}
          city={filerCandidates?.city || undefined}
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
      title: 'Lead Consultant',
      dataIndex: 'lead_consultants',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search users"
          options={users}
          mode="multiple"
          param="lead_consultants"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.lead_consultants || undefined}
        />
      ),
      render: (text) => {
        return (
          <Tag
            type="primary"
            color="purple"
            style={{ textTransform: 'capitalize' }}
          >
            {text[0].full_name}
          </Tag>
        );
      },
    },
    {
      title: 'Activity',
      dataIndex: 'account_status',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search account_status"
          options={ACCOUNT_STATUS}
          param="account_status"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.account_status || undefined}
        />
      ),
      render: (text) => {
        const item = ACCOUNT_STATUS.find((item) => item.key === text);
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: 'Tax Code',
      dataIndex: 'tax_code',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search tax_code"
          param="tax_code"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.tax_code || undefined}
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'CPA',
      dataIndex: 'cpa',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search cpa"
          options={CPA}
          param="cpa"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.cpa || undefined}
        />
      ),
      render: (text) => {
        const item = CPA.find((item) => item.key === text);
        return <Tag color={item?.color}>{item?.label}</Tag>;
      },
    },
    {
      title: 'Job(s)',
      dataIndex: 'client_jobs',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchCandidates}
          paramFrom="client_jobs_from"
          paramTo="client_jobs_to"
          keyPage="filterClient"
          filterValueFrom={filerCandidates?.client_jobs_from || undefined}
          filterValueTo={filerCandidates?.client_jobs_to || undefined}
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search users"
          options={TYPE_CLIENT}
          mode="multiple"
          param="type"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.type || undefined}
        />
      ),
      render: (text) => {
        const item = TYPE_CLIENT.find((item) => item.key === text);

        return <div>{item.label}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search priority_status"
          options={STATUS_CLIENT}
          mode="multiple"
          param="type"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.type || undefined}
        />
      ),
      render: (text) => {
        const item = STATUS_CLIENT.find((item) => item.key === text);
        return <Tag color={item?.color}>{item?.label}</Tag>;
      },
    },
    {
      title: "Contact Person's Name",
      dataIndex: 'contact_person_name',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search contact_person_name"
          param="contact_person_name"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.contact_person_name || undefined}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <div key={index} style={{ textTransform: 'uppercase' }}>
            - {item.full_name}
          </div>
        ));
      },
    },
    {
      title: "Contact Person's Title",
      dataIndex: 'contact_person_title',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search contact_person_title"
          param="contact_person_title"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.contact_person_title || undefined}
        />
      ),
      render: (text) => {
        return text?.map((item, index) => (
          <div key={index} style={{ textTransform: 'uppercase' }}>
            - {item.extra.contact_info.title}
          </div>
        ));
      },
    },
    {
      title: 'Updated by',
      dataIndex: 'update_last_by',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search users"
          options={users}
          mode="multiple"
          param="lead_consultants"
          fetchData={fetchCandidates}
          keyPage="filterClient"
          filterValue={filerCandidates?.lead_consultants || undefined}
        />
      ),
      render: (text) => {
        return (
          <>
            {text && (
              <Tag
                type="primary"
                color="geekblue"
                style={{ textTransform: 'capitalize' }}
              >
                {text}
              </Tag>
            )}
          </>
        );
      },
    },
    {
      title: 'Updated on',
      dataIndex: 'updated_on',
      filterIcon: (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchCandidates}
          paramFrom="updated_on_from"
          paramTo="updated_on_to"
          keyPage="filterClient"
          filterValueFrom={filerCandidates?.updated_on_from || undefined}
          filterValueTo={filerCandidates?.updated_on_to || undefined}
        />
      ),
      render: (text) => {
        const value = new Date(text);
        return <div>{value.toLocaleString()}</div>;
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

  // const newColumns = [];

  // for (let i = 0; i < columns.length; i++) {
  //   if (listCustomCandidates.includes(columns[i].dataIndex)) {
  //     newColumns.push(columns[i]);
  //   }
  // }

  const newData = data?.map((item) => ({
    key: item?.id,
    client_id: item?.client_id,
    name: item?.name,
    location: item?.address,
    lead_consultants: item?.lead_consultants,
    account_status: item.account_development?.status,
    tax_code: item?.tax_code,
    cpa: item?.cpa,
    client_jobs: item?.jobs_count,
    type: item?.type,
    status: item?.status,
    contact_person_name: item?.contact_person_current,
    contact_person_title: item?.contact_person_current,
    update_last_by: item?.meta?.lastUpdated?.user?.full_name,
    updated_on: item?.createdAt,
  }));

  return (
    <div
      style={{
        marginLeft: '54px',
        marginRight: '54px',
      }}
    >
      {/* <TagFilter tags={filterTagCandidates(listTagFilter, languages)} /> */}
      {loadingCandidate ? (
        <Spin tip="Loading...">
          <Table
            columns={columns}
            scroll={{ x: '110vw' }}
            dataSource={newData}
          />
        </Spin>
      ) : (
        <Table
          columns={columns}
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
export default TableClients;

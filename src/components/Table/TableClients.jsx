import { Table, Tag, Spin } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TagFilter from '../TagFilter';
import {
  ACCOUNT_STATUS,
  CPA,
  TYPE_CLIENT,
  STATUS_CLIENT,
  CUSTOM_COLUMNS_CLIENTS,
  changeLocalClientToParams,
} from '../../utils/const';
import { filterTagClients } from '../../utils/filterTagClients';

import { FilterDropDownText } from '../Filter/FilterDropDownText';
import { FilterDropDownSelectOneItem } from '../Filter/FilterDropDownSelectOneItem';
import { FilterTimeRange } from '../Filter/FilterTimeRange';
import FilterDropDownIndustry from '../Filter/FilterDropDownIndustry';
import FilterDropDownCountryCityClient from '../Filter/FilterDropDownCountryCityClient';
import { FilterDatePicker } from '../Filter/FilterDatePicker';
import { fetchClients } from '../../store/clientsSlice';
import { fetchSectors } from '../../store/categoriesSlice';
import { fetchCategories } from '../../store/categoriesSlice';
import { getTagsClients } from '../../store/tagsClientsSlice';
import { IconFIlter } from '../IconFIlter';

const TableClients = ({
  data,
  industries,
  sectors,
  categories,
  filterClient,
  loadingClients,
  users,
  listTagFilter,
}) => {
  const dispatch = useDispatch();
  const listCustomCandidates = useSelector((state) => state.customColumn.data);
  const [pageTable, setPageTable] = useState(filterClient?.page);
  const totalItem = useSelector((state) => state.clients.count);
  const [totalMain, setTotalMain] = useState(totalItem);

  useEffect(() => {
    setPageTable(filterClient?.page);
    setTotalMain(totalItem);
  }, [filterClient?.page, totalItem]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'client_id',
      filterIcon: <IconFIlter name="client_id" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search client_id"
          param="client_id"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.client_id || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
        />
      ),
      render: (text) => {
        return <Link to={`/client-detail/${text}`}>{text}</Link>;
      },
    },
    {
      title: 'Trade Name',
      dataIndex: 'name',
      filterIcon: <IconFIlter name="name" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search Trade Name"
          param="name"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.name || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
          listTags={CUSTOM_COLUMNS_CLIENTS}
        />
      ),
      render: (text, record) => {
        return <Link to={`/client-detail/${record.client_id}`}>{text}</Link>;
      },
    },
    {
      title: 'City',
      dataIndex: 'location',
      filterIcon: <IconFIlter name="location" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownCountryCityClient
          fetchData={fetchClients}
          keyPage="filterClient"
          country={filterClient?.location?.country || undefined}
          city={filterClient?.location?.city || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
        <IconFIlter name="lead_consultants" listFilter={filterClient} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search users"
          options={users}
          mode="multiple"
          param="lead_consultants"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.lead_consultants || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
        <IconFIlter name="account_status" listFilter={filterClient} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search account_status"
          options={ACCOUNT_STATUS}
          param="account_status"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.account_status || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
      filterIcon: <IconFIlter name="tax_code" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search tax_code"
          param="tax_code"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.tax_code || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'CPA',
      dataIndex: 'cpa',
      filterIcon: <IconFIlter name="cpa" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search cpa"
          options={CPA}
          mode="multiple"
          param="cpa"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.cpa || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
        />
      ),
      render: (text) => {
        const item = CPA.find((item) => item.key === text);
        return <Tag color={item?.color}>{item?.label}</Tag>;
      },
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      filterIcon: <IconFIlter name="industry" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownIndustry
          data={industries}
          optionTwo={sectors}
          optionThree={categories}
          typeTwo={2}
          fetchDataItemTwo={fetchSectors}
          fetchDataItemThree={fetchCategories}
          typeThree={3}
          keyPage="filterClient"
          fetchData={fetchClients}
          filterValueOptionOne={filterClient?.industry?.industry || undefined}
          filterValueOptionTwo={filterClient?.industry?.sector || undefined}
          filterValueOptionThree={filterClient?.industry?.category || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
      title: 'Job(s)',
      dataIndex: 'client_jobs',
      filterIcon: (
        <>
          {filterClient?.client_jobs_to ? (
            <IconFIlter name={'client_jobs_to'} listFilter={filterClient} />
          ) : (
            <IconFIlter name={'client_jobs_from'} listFilter={filterClient} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterTimeRange
          fetchData={fetchClients}
          paramFrom="client_jobs_from"
          paramTo="client_jobs_to"
          keyPage="filterClient"
          filterValueFrom={filterClient?.client_jobs_from || undefined}
          filterValueTo={filterClient?.client_jobs_to || undefined}
          changeDataDispatch={changeLocalClientToParams}
          getTags={getTagsClients}
          param="client_jobs"
        />
      ),
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filterIcon: <IconFIlter name="type" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search users"
          options={TYPE_CLIENT}
          mode="multiple"
          param="type"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.type || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
      filterIcon: <IconFIlter name="status" listFilter={filterClient} />,
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search priority_status"
          options={STATUS_CLIENT}
          mode="multiple"
          param="status"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.status || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
        <IconFIlter name="contact_person_name" listFilter={filterClient} />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search contact_person_name"
          param="contact_person_name"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.contact_person_name || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
        <IconFIlter name="contact_person_title" listFilter={filterClient} />
      ),
      filterDropdown: (
        <FilterDropDownText
          placeholder="Search contact_person_title"
          param="contact_person_title"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.contact_person_title || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
        <IconFIlter name="update_last_by" listFilter={filterClient} />
      ),
      filterDropdown: (
        <FilterDropDownSelectOneItem
          placeholder="Search users"
          options={users}
          mode="multiple"
          param="update_last_by"
          fetchData={fetchClients}
          keyPage="filterClient"
          filterValue={filterClient?.update_last_by || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
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
        <>
          {filterClient?.client_jobs_to ? (
            <IconFIlter name={'updated_on_to'} listFilter={filterClient} />
          ) : (
            <IconFIlter name={'updated_on_from'} listFilter={filterClient} />
          )}
        </>
      ),
      filterDropdown: (
        <FilterDatePicker
          fetchData={fetchClients}
          paramFrom="updated_on_from"
          paramTo="updated_on_to"
          keyPage="filterClient"
          filterValueFrom={filterClient?.updated_on_from || undefined}
          filterValueTo={filterClient?.updated_on_to || undefined}
          getTags={getTagsClients}
          changeDataDispatch={changeLocalClientToParams}
          param="updated_on"
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

  const newColumns = [];

  for (let i = 0; i < columns.length; i++) {
    if (listCustomCandidates.includes(columns[i].dataIndex)) {
      newColumns.push(columns[i]);
    }
  }

  const newData = data?.map((item) => ({
    key: item?.id,
    client_id: item?.client_id,
    name: item?.name,
    location: item?.address,
    lead_consultants: item?.lead_consultants,
    account_status: item.account_development?.status,
    tax_code: item?.tax_code,
    cpa: item?.cpa,
    industry: item?.business_line,
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
      <TagFilter
        tags={filterTagClients(listTagFilter)}
        keyPage="filterClient"
        listTags={CUSTOM_COLUMNS_CLIENTS}
        getTags={getTagsClients}
        changeDataDispatch={changeLocalClientToParams}
        fetchData={fetchClients}
      />
      {loadingClients ? (
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
              let newParam = filterClient;
              newParam.page = page;
              dispatch(fetchClients(newParam));
            },
            current: pageTable,
          }}
        />
      )}
    </div>
  );
};
export default TableClients;

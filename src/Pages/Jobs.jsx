import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomColumns } from '../components/CustomColumns';

import { fetchCountries } from '../store/locationsSlice';
import { fetchListCustoms } from '../store/customColumnSlice';

import { fetchIndustries } from '../store/categoriesSlice';
import { CUSTOM_COLUMNS_JOBS } from '../utils/const';
import { fetchJobs } from '../store/jobsSlice';
import { getTagsJobs } from '../store/tagsJobsSlice';
import { fetchUsers } from '../store/usersSlice';
import TableJobs from '../components/Table/TableJobs';

import { changeLocalJobToParams } from '../utils/filterTagJobs';

export const Jobs = () => {
  const dispatch = useDispatch();
  const totalItem = useSelector((state) => state.jobs.count);
  const jobs = useSelector((state) => state.jobs.data);

  const loadingJobs = useSelector((state) => state.jobs.loading);
  const listCustomJobs = useSelector((state) => state.customColumn.data);

  const filterJobs = JSON.parse(window.localStorage.getItem('filterJobs'));
  const listTagFilter = useSelector((state) => state.tagsJobs.data);

  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);

  const users = useSelector((state) => state.users.data).map(
    ({ id, full_name }) => ({
      key: id,
      label: full_name,
    }),
  );

  useEffect(() => {
    dispatch(fetchIndustries({ type: 1 }));
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchJobs(changeLocalJobToParams(filterJobs)));
    dispatch(fetchListCustoms('jobs'));
    dispatch(getTagsJobs(filterJobs));
    dispatch(fetchUsers());

    if (!filterJobs) {
      window.localStorage.setItem(
        'filterJobs',
        JSON.stringify({ page: 1, perPage: 10 }),
      );
    }
  }, []);

  return (
    <div>
      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <Col
          style={{
            marginLeft: '54px',
            color: '#465f7b',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          Jobs List {loadingJobs ? '' : <>({totalItem})</>}
        </Col>
        <Col style={{ marginRight: '52px' }}>
          <Row gutter={(12, 12)}>
            <Col span={12}>
              <Button
                type="primary"
                ghost
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => {
                  dispatch(
                    fetchJobs({
                      page: 1,
                      perPage: 10,
                    }),
                  );
                  dispatch(
                    getTagsJobs({
                      page: 1,
                      perPage: 10,
                    }),
                  );
                }}
              >
                Clear All Filters
              </Button>
            </Col>
            <Col span={12}>
              <Link to="/job-add">
                <Button
                  type="primary"
                  color="red"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#1890ff',
                  }}
                >
                  <PlusOutlined />
                  Create job
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '54px',
          marginTop: '10px',
        }}
      >
        <CustomColumns
          namePage="jobs"
          listCustom={listCustomJobs}
          customColumns={CUSTOM_COLUMNS_JOBS}
          fetchData={fetchJobs}
          changeDataDispatch={changeLocalJobToParams}
          keyPage="filterJobs"
          getTags={getTagsJobs}
        />
      </Row>
      <TableJobs
        data={jobs ? jobs : null}
        industries={industries ? industries : null}
        sectors={sectors}
        categories={categories}
        filterJobs={filterJobs}
        loadingJobs={loadingJobs}
        users={users}
        listTagFilter={listTagFilter}
      />
    </div>
  );
};

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomColumns } from '../components/CustomColumns';
import TableCandidates from '../components/Table/TableCandidates';

import { fetchCountries } from '../store/locationsSlice';
import { fetchIndustries } from '../store/categoriesSlice';
import { fetchCandidates } from '../store/candidatesSlice';
import { fetchLanguages } from '../store/languagesSlice';
import { fetchHighestDegree } from '../store/highestDegreeSlice';
import { fetchListCustoms } from '../store/customColumnSlice';
import { getTagsCandidates } from '../store/tagsCandidatesSlice';
import { refreshCandidates } from '../store/candidatesSlice';

export const Candidates = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.locations.countries);
  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);
  const totalItem = useSelector((state) => state.candidates.count);
  const candidates = useSelector((state) => state.candidates.data);
  const loadingCandidate = useSelector((state) => state.candidates.loading);

  const languages = useSelector((state) => state.languages.languages);
  const listCustomCandidates = useSelector((state) => state.customColumn.data);
  const isSuccessCustomColumn = useSelector(
    (state) => state.customColumn.isSuccess,
  );

  const filerCandidates = JSON.parse(window.localStorage.getItem('filterCDD'));
  const listTagFilter = useSelector((state) => state.tagsCandidates.data);

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchIndustries({ type: 1 }));
    dispatch(fetchCandidates(filerCandidates));
    dispatch(fetchLanguages({ type: 4 }));
    dispatch(fetchHighestDegree({ type: 1 }));
    dispatch(fetchListCustoms('candidates'));
    dispatch(getTagsCandidates(filerCandidates));
    if (!filerCandidates) {
      window.localStorage.setItem(
        'filterCDD',
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
          Candidates List {loadingCandidate ? '' : <>({totalItem})</>}
        </Col>
        <Col style={{ marginRight: '73px' }}>
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                ghost
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => {
                  dispatch(refreshCandidates());
                  dispatch(
                    getTagsCandidates({
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
              <Link to="/candidate-add">
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
                  Create Candidate
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
          namePage="candidates"
          listCustom={listCustomCandidates}
        />
      </Row>
      <TableCandidates
        totalItem={totalItem ? totalItem : null}
        data={candidates ? candidates : null}
        languages={languages ? languages : null}
        city={countries ? countries : null}
        sectors={sectors}
        categories={categories}
        industries={industries ? industries : null}
        listCustomCandidates={
          listCustomCandidates ? listCustomCandidates : null
        }
        listTagFilter={listTagFilter}
        filerCandidates={filerCandidates}
        loadingCandidate={loadingCandidate}
        isSuccessCustomColumn={isSuccessCustomColumn}
      />
    </div>
  );
};

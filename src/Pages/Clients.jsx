import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CustomColumns } from '../components/CustomColumns';
import { fetchClients } from '../store/clientsSlice';

import { fetchCountries } from '../store/locationsSlice';
import { fetchListCustoms } from '../store/customColumnSlice';
import { getTagsClients } from '../store/tagsClientsSlice';
import { refreshClients } from '../store/clientsSlice';
import TableClients from '../components/Table/TableClients';
import { fetchUsers } from '../store/usersSlice';

export const Clients = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.locations.countries);
  const totalItem = useSelector((state) => state.clients.count);
  const clients = useSelector((state) => state.clients.data);
  const loadingClients = useSelector((state) => state.clients.loading);
  const listCustomClients = useSelector((state) => state.customColumn.data);
  const isSuccessCustomColumn = useSelector(
    (state) => state.customColumn.isSuccess,
  );
  const filterClient = JSON.parse(window.localStorage.getItem('filterClient'));
  const listTagFilter = useSelector((state) => state.tagsClients.data);

  const users = useSelector((state) => state.users.data).map(
    ({ id, full_name }) => ({
      key: id,
      label: full_name,
    }),
  );

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchClients(filterClient));
    dispatch(fetchListCustoms('clients'));
    dispatch(getTagsClients(filterClient));
    dispatch(fetchUsers());
    if (!filterClient) {
      window.localStorage.setItem(
        'filterClient',
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
          Candidates List {loadingClients ? '' : <>({totalItem})</>}
        </Col>
        <Col style={{ marginRight: '73px' }}>
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                ghost
                style={{ display: 'flex', alignItems: 'center' }}
                onClick={() => {
                  dispatch(refreshClients());
                  dispatch(
                    getTagsClients({
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
              <Link to="/client-add">
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
                  Create client
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
        <CustomColumns namePage="clients" listCustom={listCustomClients} />
      </Row>
      <TableClients
        totalItem={totalItem ? totalItem : null}
        data={clients ? clients : null}
        city={countries ? countries : null}
        listCustomCandidates={listCustomClients ? listCustomClients : null}
        listTagFilter={listTagFilter}
        loadingClients={loadingClients}
        isSuccessCustomColumn={isSuccessCustomColumn}
        users={users}
      />
    </div>
  );
};

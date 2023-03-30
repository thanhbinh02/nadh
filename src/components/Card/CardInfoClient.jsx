import { Row, Card, Col, Form, Tag, Upload } from 'antd';
import { STATUS_CLIENT, TYPE_CLIENT, CPA, changeTime } from '../../utils/const';
import { FormItemUploadInfo } from '../FormItem/FormItemUploadInfo';
import { useEffect, useState } from 'react';
import { FormItemInput } from '../FormItem/FormItemInput';
import { FormAddress } from '../FormItem/FormAddress';
import { FormItemOption } from '../FormItem/FormItemOption';
import { useSelector, useDispatch } from 'react-redux';
import { FormItemPhoneTax } from '../FormItem/FormItemPhoneTax';
import { putNewDetailClient } from '../../store/detailClientSlice';
import { fetchDetailClientSliceNotLoading } from '../../store/detailClientSlice';
import { AiOutlinePlus } from 'react-icons/ai';
import { postFileRedux } from '../../store/fileSlice';
import { FormItemNotAllowed } from '../FormItem/FormItemNotAllowed';

const findItemClient = (key, array) => {
  if (key) {
    const result = array.find((item) => item.key === key);
    return result;
  }
  return;
};

const findNameChangeSave = (name, array) => {
  if (name) {
    const result = array.find((item) => item.name === name);
    return result;
  }
  return;
};

export const CardInfoClient = ({ detailClient, form }) => {
  const dispatch = useDispatch();
  const statusClient = findItemClient(detailClient?.status, STATUS_CLIENT);
  const typeClient = findItemClient(detailClient?.type, TYPE_CLIENT);
  const cpaClient = findItemClient(detailClient?.cpa, CPA);
  const newFileRedux = useSelector((state) => state.file.newFile);
  const clients = useSelector((state) => state.clients.data).map(
    ({ id, name }) => ({
      key: id,
      label: name,
    }),
  );

  const users = useSelector((state) => state.users.data).map(
    ({ id, full_name }) => ({
      key: id,
      label: full_name,
    }),
  );

  const user_id = useSelector((state) => state.auth.user_sent);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const isPutSuccess = useSelector((state) => state.detailClient.isPutSuccess);
  const isPostFileSuccess = useSelector(
    (state) => state.file.isPostFileSuccess,
  );

  const [isDisabled, setIsDisabled] = useState(
    detailClient?.status === 12 ? true : false,
  );

  useEffect(() => {
    dispatch(fetchDetailClientSliceNotLoading(detailClient.id));
  }, [isPutSuccess]);

  useEffect(() => {
    if (detailClient?.status === 12) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [detailClient]);

  useEffect(() => {
    if (isPostFileSuccess) {
      const newData = {
        id: detailClient?.id,
        params: {
          mediafiles: {
            logo: newFileRedux?.id,
          },
        },
      };
      dispatch(putNewDetailClient(newData));
    }
  }, [isPostFileSuccess]);

  const [items, setItems] = useState([
    { name: 'name', open: false },
    { name: 'address', open: false },
    { name: 'phone', open: false },
    { name: 'fax', open: false },
    { name: 'email', open: false },
    { name: 'status', open: false },
    { name: 'code', open: false },
    { name: 'parent_company', open: false },
    { name: 'factory_site_0', open: false },
    { name: 'factory_site_1', open: false },
    { name: 'type', open: false },
    { name: 'cpa', open: false },
    { name: 'lead_consultants', open: false },
  ]);

  const handleItemClick = (itemName) => {
    const findItemOpenTrue = items.find((item) => item.open === true);
    if (findItemOpenTrue === undefined) {
      const updatedItems = items.map((item) =>
        item.name === itemName
          ? { ...item, open: !item.open }
          : { ...item, open: false },
      );
      setItems(updatedItems);
    }
  };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      let newFile = new FormData();
      newFile.append('file', info.file.originFileObj);
      newFile.append('type', 'avatar');
      newFile.append('uploadedByUserId', JSON.parse(user_id)?.user_id || 12);
      dispatch(postFileRedux(newFile));
    }
  };

  return (
    <Card
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <Row gutter={(12, 12)}>
        <Col span={14}>
          {isDisabled ? (
            <Form.Item name="name_1" onClick={() => handleItemClick('name')}>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: '500',
                  cursor: 'not-allowed',
                  color: 'rgba(0,0,0,.65)',
                }}
              >
                {detailClient?.name}
              </span>
            </Form.Item>
          ) : (
            <Form.Item>
              {findNameChangeSave('name', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="name"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={
                    <FormItemInput
                      name="name"
                      type="text"
                      message="Please enter name!"
                    />
                  }
                />
              ) : (
                <Form.Item
                  name="name_1"
                  onClick={() => handleItemClick('name')}
                >
                  <span style={{ fontSize: '24px', fontWeight: '500' }}>
                    {detailClient?.name}
                  </span>
                </Form.Item>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Address"
              value={
                detailClient?.address?.country?.label ? (
                  <>
                    {detailClient?.address?.address}
                    {detailClient?.address?.address && ', '}
                    {detailClient?.address?.district?.label}
                    {detailClient?.address?.district?.label && ', '}
                    {detailClient?.address?.city?.label}
                    {detailClient?.address?.city?.label && ', '}
                    {detailClient?.address?.country?.label}
                  </>
                ) : (
                  '-'
                )
              }
            />
          ) : (
            <Form.Item
              label="Address"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
              name="address"
            >
              {findNameChangeSave('address', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="address"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={<FormAddress form={form} name="address" />}
                />
              ) : (
                <div onClick={() => handleItemClick('address')}>
                  {detailClient?.address?.country?.label ? (
                    <>
                      {detailClient?.address?.address}
                      {detailClient?.address?.address && ', '}
                      {detailClient?.address?.district?.label}
                      {detailClient?.address?.district?.label && ', '}
                      {detailClient?.address?.city?.label}
                      {detailClient?.address?.city?.label && ', '}
                      {detailClient?.address?.country?.label}
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Phone number"
              value={
                <>
                  {detailClient?.phone?.phone_code?.extra?.dial_code}{' '}
                  {detailClient?.phone?.number}
                </>
              }
            />
          ) : (
            <Form.Item
              label="Phone number"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('phone', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="phone"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={
                    <FormItemPhoneTax
                      phoneNumber={phoneNumber}
                      name="phone"
                      required
                      message="Please enter phone number"
                    />
                  }
                />
              ) : (
                <div onClick={() => handleItemClick('phone')}>
                  {detailClient?.phone?.phone_code?.extra?.dial_code}{' '}
                  {detailClient?.phone?.number}
                </div>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Fax"
              value={
                <>
                  {detailClient?.fax?.phone_code?.extra?.dial_code}{' '}
                  {detailClient?.fax?.number}
                </>
              }
            />
          ) : (
            <Form.Item
              label="Fax"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('fax', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="fax"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={
                    <FormItemPhoneTax phoneNumber={phoneNumber} name="fax" />
                  }
                />
              ) : (
                <div onClick={() => handleItemClick('fax')}>
                  {detailClient?.fax?.phone_code?.extra?.dial_code}{' '}
                  {detailClient?.fax?.number}
                </div>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Email"
              value={<>{detailClient?.email || '-'}</>}
            />
          ) : (
            <Form.Item
              label="Email"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('email', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="email"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={<FormItemInput name="email" type="email" />}
                />
              ) : (
                <p onClick={() => handleItemClick('email')}>
                  {detailClient?.email || '-'}
                </p>
              )}
            </Form.Item>
          )}

          <FormItemNotAllowed label="Tax Code" value={detailClient?.tax_code} />
        </Col>
        <Col span={10}>
          <div className="upload_client">
            <Upload
              action="https://lubrytics.com:8443/nadh-mediafile/file"
              listType="picture-card"
              accept="image/png, image/jpeg"
              showUploadList={false}
              onChange={handleChange}
              disabled={isDisabled}
            >
              {detailClient?.mediafiles?.logo ? (
                <img
                  alt=""
                  src={`https://lubrytics.com:8443/nadh-mediafile/file/${detailClient.mediafiles?.logo}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div>
                  <AiOutlinePlus />
                  <p> Upload</p>
                </div>
              )}
            </Upload>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <h3>Client Information</h3>
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={14}>
          <FormItemNotAllowed
            label="Client ID"
            value={detailClient?.client_id}
          />

          <Form.Item
            label="Status"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('status', items).open ? (
              <FormItemUploadInfo
                detailUser={detailClient}
                id={detailClient.id}
                putDetail={putNewDetailClient}
                name="status"
                items={items}
                setItems={setItems}
                form={form}
                component={
                  <FormItemOption options={STATUS_CLIENT} name="status" />
                }
              />
            ) : (
              <Tag
                color={statusClient?.color}
                onClick={() => handleItemClick('status')}
              >
                {statusClient?.label}
              </Tag>
            )}
          </Form.Item>

          {isDisabled ? (
            <FormItemNotAllowed
              label="Client's shortened name"
              value={<> {detailClient?.code || '-'}</>}
            />
          ) : (
            <Form.Item
              label="Client's shortened name"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('code', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="code"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={<FormItemInput name="code" type="text" />}
                />
              ) : (
                <p onClick={() => handleItemClick('code')}>
                  {detailClient?.code || '-'}
                </p>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Parent Company"
              value={<>{detailClient?.parent_company?.label || '-'}</>}
            />
          ) : (
            <Form.Item
              label="Parent Company"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('parent_company', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="parent_company"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={
                    <FormItemOption
                      allowClear
                      options={clients?.filter(
                        (item) => item?.key !== detailClient?.id,
                      )}
                      name="parent_company"
                    />
                  }
                />
              ) : (
                <p onClick={() => handleItemClick('parent_company')}>
                  {detailClient?.parent_company?.label || '-'}
                </p>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Factory Site 1"
              value={
                detailClient?.factory_site[0]?.country?.label ? (
                  <>
                    {detailClient?.factory_site[0]?.address}
                    {detailClient?.factory_site[0]?.address && ', '}
                    {detailClient?.factory_site[0]?.district?.label}
                    {detailClient?.factory_site[0]?.district?.label && ', '}
                    {detailClient?.factory_site[0]?.city?.label}
                    {detailClient?.factory_site[0]?.city?.label && ', '}
                    {detailClient?.factory_site[0]?.country?.label}
                  </>
                ) : (
                  <>-</>
                )
              }
            />
          ) : (
            <Form.Item
              label="Factory Site 1"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('factory_site_0', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="factory_site_0"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={<FormAddress form={form} name="factory_site_0" />}
                />
              ) : (
                <div onClick={() => handleItemClick('factory_site_0')}>
                  {detailClient?.factory_site[0]?.country?.label ? (
                    <>
                      {detailClient?.factory_site[0]?.address}
                      {detailClient?.factory_site[0]?.address && ', '}
                      {detailClient?.factory_site[0]?.district?.label}
                      {detailClient?.factory_site[0]?.district?.label && ', '}
                      {detailClient?.factory_site[0]?.city?.label}
                      {detailClient?.factory_site[0]?.city?.label && ', '}
                      {detailClient?.factory_site[0]?.country?.label}
                    </>
                  ) : (
                    <>-</>
                  )}
                </div>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Factory Site 2"
              value={
                detailClient?.factory_site[1]?.country?.label ? (
                  <>
                    {detailClient?.factory_site[1]?.address}
                    {detailClient?.factory_site[1]?.address && ', '}
                    {detailClient?.factory_site[1]?.district?.label}
                    {detailClient?.factory_site[1]?.district?.label && ', '}
                    {detailClient?.factory_site[1]?.city?.label}
                    {detailClient?.factory_site[1]?.city?.label && ', '}
                    {detailClient?.factory_site[1]?.country?.label}
                  </>
                ) : (
                  <>-</>
                )
              }
            />
          ) : (
            <Form.Item
              label="Factory Site 2"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('factory_site_1', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="factory_site_1"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={<FormAddress form={form} name="factory_site_1" />}
                />
              ) : (
                <div onClick={() => handleItemClick('factory_site_1')}>
                  {detailClient?.factory_site[1]?.country?.label ? (
                    <>
                      {detailClient?.factory_site[1]?.address}
                      {detailClient?.factory_site[1]?.address && ', '}
                      {detailClient?.factory_site[1]?.district?.label}
                      {detailClient?.factory_site[1]?.district?.label && ', '}
                      {detailClient?.factory_site[1]?.city?.label}
                      {detailClient?.factory_site[1]?.city?.label && ', '}
                      {detailClient?.factory_site[1]?.country?.label}
                    </>
                  ) : (
                    <>-</>
                  )}
                </div>
              )}
            </Form.Item>
          )}
        </Col>

        <Col span={10}>
          {isDisabled ? (
            <FormItemNotAllowed
              label="Client Type"
              value={typeClient?.label || '-'}
            />
          ) : (
            <Form.Item
              label="Client Type"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('type', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="type"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={
                    <FormItemOption options={TYPE_CLIENT} name="type" />
                  }
                />
              ) : (
                <p onClick={() => handleItemClick('type')}>
                  {typeClient?.label || '-'}
                </p>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed label="CPA" value={cpaClient?.label || '-'} />
          ) : (
            <Form.Item
              label="CPA"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('cpa', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="cpa"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={<FormItemOption options={CPA} name="cpa" />}
                />
              ) : (
                <p onClick={() => handleItemClick('cpa')}>
                  {cpaClient?.label || '-'}
                </p>
              )}
            </Form.Item>
          )}

          {isDisabled ? (
            <FormItemNotAllowed
              label="Lead Consultant"
              value={detailClient?.lead_consultants[0]?.full_name || '-'}
            />
          ) : (
            <Form.Item
              label="Lead Consultant"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
              colon={false}
            >
              {findNameChangeSave('lead_consultants', items).open ? (
                <FormItemUploadInfo
                  detailUser={detailClient}
                  id={detailClient.id}
                  putDetail={putNewDetailClient}
                  name="lead_consultants"
                  items={items}
                  setItems={setItems}
                  form={form}
                  component={
                    <FormItemOption options={users} name="lead_consultants" />
                  }
                />
              ) : (
                <p
                  onClick={() => handleItemClick('lead_consultants')}
                  style={{ textTransform: 'capitalize' }}
                >
                  {detailClient?.lead_consultants[0]?.full_name || '-'}
                </p>
              )}
            </Form.Item>
          )}

          <FormItemNotAllowed
            label="Search Consultant"
            value={detailClient?.relate_consultants[0]?.full_name || '-'}
            textTransform="capitalize"
          />

          <FormItemNotAllowed
            label="Updated By"
            value={detailClient?.meta?.lastUpdated?.user?.full_name || '-'}
            textTransform="capitalize"
          />

          <FormItemNotAllowed
            label="Updated On"
            value={changeTime(detailClient?.updatedAt) || '-'}
            textTransform="capitalize"
          />
        </Col>
      </Row>
    </Card>
  );
};

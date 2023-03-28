import { Row, Card, Col, Form, Tag, InputNumber, DatePicker } from 'antd';
import { FormItemUploadInfo } from '../FormItem/FormItemUploadInfo';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDetailJobNotLoading,
  putNewDetailJobExtend,
} from '../../store/detailJobSlice';
import { putNewDetailJob } from '../../store/detailJobSlice';
import { FormItemOption } from '../FormItem/FormItemOption';
import { FormItemSelectOneAdd } from '../FormItem/FormItemSelectOneAdd';
import { getPositionTest } from '../../apis/filterApi';
import { postPosition } from '../../store/positionSlice';
import { TYPE_JOB, EXPERIENCE_LEVEL, STATUS_JOB } from '../../utils/const';
import { changeTime } from '../../utils/const';
import { changeDate } from '../../utils/const';
import { FormCountryCity } from '../Form/FormCountryCity';

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

export const CardInfoJob = ({ detailJob, form }) => {
  const dispatch = useDispatch();

  const clients = useSelector((state) => state.clients.data);
  const isPutSuccess = useSelector((state) => state.detailJob.isPutSuccess);
  const typeJob = findItemClient(detailJob?.type, TYPE_JOB);
  const experienceLevelJob = findItemClient(
    detailJob?.experience_level,
    EXPERIENCE_LEVEL,
  );
  const statusJob = findItemClient(detailJob?.status, STATUS_JOB);

  useEffect(() => {
    dispatch(fetchDetailJobNotLoading(detailJob.id));
  }, [isPutSuccess]);

  const [items, setItems] = useState([
    { name: 'title', open: false },
    { name: 'department', open: false },
    { name: 'quantity', open: false },
    { name: 'type', open: false },
    { name: 'experience_level', open: false },
    { name: 'status', open: false },
    { name: 'extend_date', open: false },
    { name: 'location', open: false },
    { name: 'client_id', open: false },
    { name: 'pic', open: false },
    { name: 'recruiters', open: false },
    { name: 'related_users', open: false },
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

  return (
    <Card
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item
            label="Job ID"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            <p style={{ cursor: 'not-allowed', color: 'rgba(0,0,0,.65)' }}>
              {detailJob?.job_id}
            </p>
          </Form.Item>

          <Form.Item
            label="Job Title"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('title', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="title"
                component={
                  <FormItemSelectOneAdd
                    name="title"
                    getData={getPositionTest}
                    postData={postPosition}
                    form={form}
                  />
                }
              />
            ) : (
              <div onClick={() => handleItemClick('title')}>
                {detailJob?.title?.label}
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Department"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('department', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="department"
                component={
                  <FormItemSelectOneAdd
                    name="department"
                    getData={getPositionTest}
                    postData={postPosition}
                    form={form}
                  />
                }
              />
            ) : (
              <div onClick={() => handleItemClick('department')}>
                {detailJob?.department?.label}
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Quantity"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('quantity', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="quantity"
                component={
                  <Form.Item name="quantity">
                    <InputNumber
                      min="0"
                      placeholder="0"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                }
              />
            ) : (
              <div onClick={() => handleItemClick('quantity')}>
                {detailJob?.quantity}
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Job Type"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('type', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="type"
                component={<FormItemOption options={TYPE_JOB} name="type" />}
              />
            ) : (
              <p onClick={() => handleItemClick('type')}>
                {typeJob?.label || '-'}
              </p>
            )}
          </Form.Item>

          <Form.Item
            label="Experience Level"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('experience_level', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="experience_level"
                component={
                  <FormItemOption
                    options={EXPERIENCE_LEVEL}
                    name="experience_level"
                  />
                }
              />
            ) : (
              <p onClick={() => handleItemClick('experience_level')}>
                {experienceLevelJob?.label || '-'}
              </p>
            )}
          </Form.Item>

          <Form.Item
            label="Created By"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            <p
              style={{
                cursor: 'not-allowed',
                color: 'rgba(0,0,0,.65)',
                textTransform: 'capitalize',
              }}
            >
              {detailJob?.creator?.full_name}
            </p>
          </Form.Item>

          <Form.Item
            label=" Created On"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            <p
              style={{
                textTransform: 'capitalize',
                cursor: 'not-allowed',
                color: 'rgba(0,0,0,.65)',
              }}
            >
              {changeTime(detailJob?.createdAt) || '-'}
            </p>
          </Form.Item>

          <Form.Item
            label="Last Updated"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            <p
              style={{
                textTransform: 'capitalize',
                cursor: 'not-allowed',
                color: 'rgba(0,0,0,.65)',
              }}
            >
              {changeTime(detailJob?.updatedAt) || '-'}
            </p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Status"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('status', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="status"
                component={
                  <FormItemOption options={STATUS_JOB} name="status" />
                }
              />
            ) : (
              <Tag
                color={statusJob?.color}
                onClick={() => handleItemClick('status')}
              >
                {statusJob?.label}
              </Tag>
            )}
          </Form.Item>

          <Form.Item
            label="Open Date"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            <p
              style={{
                cursor: 'not-allowed',
                color: 'rgba(0,0,0,.65)',
                textTransform: 'capitalize',
              }}
            >
              {changeDate(detailJob?.target_date)}
            </p>
          </Form.Item>

          <Form.Item
            label="Expire Date"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            <p
              style={{
                cursor: 'not-allowed',
                color: 'rgba(0,0,0,.65)',
                textTransform: 'capitalize',
              }}
            >
              {changeDate(detailJob?.end_date)}
            </p>
          </Form.Item>

          <Form.Item
            label="Extend Date"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('extend_date', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJobExtend}
                items={items}
                setItems={setItems}
                form={form}
                name="extend_date"
                component={
                  <Form.Item name="extend_date">
                    <DatePicker
                      placeholder="Select date"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                }
              />
            ) : (
              <p onClick={() => handleItemClick('extend_date')}>
                {changeDate(detailJob?.extend_date)}
              </p>
            )}
          </Form.Item>

          <Form.Item
            label="Location"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('location', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="location"
                component={<FormCountryCity form={form} />}
              />
            ) : (
              <p onClick={() => handleItemClick('location')}>
                {detailJob?.location?.city ? (
                  <>
                    {detailJob?.location?.city?.label},{' '}
                    {detailJob?.location?.country?.label}
                  </>
                ) : (
                  <>{detailJob?.location?.country?.label}</>
                )}
              </p>
            )}
          </Form.Item>

          <Form.Item
            label="Client's Name"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
            colon={false}
          >
            {findNameChangeSave('client_id', items).open ? (
              <FormItemUploadInfo
                detailUser={detailJob}
                id={detailJob.id}
                putDetail={putNewDetailJob}
                items={items}
                setItems={setItems}
                form={form}
                name="client_id"
                component={
                  <FormItemOption
                    options={clients.map((client) => {
                      return { key: client.id, label: client?.name };
                    })}
                    name="client_id"
                  />
                }
              />
            ) : (
              <p onClick={() => handleItemClick('client_id')}>
                {typeJob?.label || '-'}
              </p>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

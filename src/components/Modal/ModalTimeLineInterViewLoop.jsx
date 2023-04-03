import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Row, Col, DatePicker, Select, Form, Spin } from 'antd';
import {
  candidate_flow_status,
  changeTime,
  STATUS_JOB,
} from '../../utils/const';
import moment from 'moment';
import { useEffect } from 'react';
import { CommentInterviewLoop } from '../CommentInterviewLoop';
import { fetchDetailCandidateSliceNotLoading } from '../../store/detailCandidateSlice';
import { useState } from 'react';
import { putNewCandidateFlows } from '../../store/detailCandidateSlice';
import { putNewCandidateFlowsStatus } from '../../store/detailCandidateSlice';

const findItemWithId = (array, id) => {
  return array.find((item) => item.id === id);
};

const { Option } = Select;

const WrapperSaveCancel = ({ onCancel, onSave }) => {
  return (
    <Col span={24} style={{ textAlign: 'right', marginTop: '12px' }}>
      <Button style={{ marginRight: '12px' }} size="small" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="primary" size="small" onClick={onSave}>
        Save
      </Button>
    </Col>
  );
};

export const ModalTimeLineInterViewLoop = ({
  openModalTimeLine,
  setOpenModalTimeLine,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const dataFlow = useSelector((state) => state.detailCandidate.dataFlow);

  const users = useSelector((state) => state.users.data);
  const isPutSuccess = useSelector(
    (state) => state.detailCandidate.isPutSuccess,
  );
  const detailCandidate = useSelector((state) => state.detailCandidate.data);

  const initialValues = {
    action: null,
    interviewer:
      dataFlow?.item?.info?.interviewer?.map((item) => item.user_id) || [],
    time: dataFlow?.item?.info?.time
      ? moment(dataFlow?.item?.info?.time)
      : null,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
    const updatedItems = items.map((item) => ({ ...item, open: false }));
    setItems(updatedItems);
  }, [dataFlow]);

  useEffect(() => {
    if (isPutSuccess) {
      dispatch(
        fetchDetailCandidateSliceNotLoading(detailCandidate?.candidate_id),
      );
    }
  }, [isPutSuccess]);

  const [items, setItems] = useState([
    { name: 'action', open: false },
    { name: 'time', open: false },
    { name: 'interviewer', open: false },
  ]);

  const findNameChangeSave = (name, array) => {
    if (name) {
      const result = array.find((item) => item.name === name);
      return result;
    }
    return;
  };

  const handleCancelClick = (itemName) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, open: false } : item,
    );
    setItems(updatedItems);
    form.setFieldsValue({
      [itemName]: initialValues[itemName],
    });
  };

  const handleItemClick = (itemName) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, open: true } : item,
    );
    setItems(updatedItems);
  };

  const handleSave = (itemName, value) => {
    const idCandidateFlow = dataFlow?.flowItem?.id;
    const result = {
      flow: {
        id: dataFlow?.item?.id,
        [itemName]: value,
      },
    };
    dispatch(putNewCandidateFlows({ id: idCandidateFlow, params: result }))
      .unwrap()
      .then(() => {
        setItems(
          items.map((item) =>
            item.name === itemName ? { ...item, open: false } : item,
          ),
        );
      });
  };

  const handleAddNewStatus = () => {
    const idCandidateFlow = dataFlow?.flowItem?.id;
    const newData = {
      id: idCandidateFlow,
      params: {
        status: form.getFieldValue('action'),
      },
    };
    dispatch(putNewCandidateFlowsStatus(newData));
    setOpenModalTimeLine(false);
  };

  return (
    <Modal
      width={900}
      onCancel={() => setOpenModalTimeLine(false)}
      open={openModalTimeLine}
      footer={null}
      title={`${
        findItemWithId(candidate_flow_status, dataFlow?.item?.current_status)
          ?.label
      } - ${changeTime(dataFlow?.item?.createdAt)}`}
      destroyOnClose
    >
      <Form form={form}>
        <Row gutter={(8, 8)}>
          <Col span={12}>
            <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ fontWeight: '600' }}>
                Creator
              </Col>
              <Col
                span={16}
              >{`${dataFlow?.item?.creator?.full_name} - ${dataFlow?.item?.creator?.role?.name}`}</Col>
            </Row>
            <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ fontWeight: '600' }}>
                Job
              </Col>
              <Col span={16}>{dataFlow?.flowItem?.job?.title?.label}</Col>
            </Row>
            <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ fontWeight: '600' }}>
                Job-code
              </Col>
              <Col span={16}>{dataFlow?.flowItem?.job?.job_id}</Col>
            </Row>
            <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ fontWeight: '600' }}>
                Job status
              </Col>
              <Col span={16}>
                {
                  STATUS_JOB.find(
                    (item) => item.key === dataFlow?.flowItem?.job?.status,
                  )?.label
                }
              </Col>
            </Row>
            {dataFlow?.flowItem?.flow?.length === dataFlow?.item?.id && (
              <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
                <Col span={8} style={{ fontWeight: '600' }}>
                  Action
                </Col>
                <Col span={16}>
                  <Form.Item name="action">
                    <Select
                      optionFilterProp="label"
                      placeholder="Please select flow status"
                      style={{ width: '100%' }}
                      onChange={() => handleItemClick('action')}
                    >
                      {candidate_flow_status.map((item) => (
                        <Option
                          key={item.id}
                          value={item.id}
                          disabled={
                            item.id > 0 &&
                            dataFlow?.item?.current_status >= item.id
                          }
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {findNameChangeSave('action', items).open && (
                    <WrapperSaveCancel
                      onCancel={() => handleCancelClick('action')}
                      onSave={handleAddNewStatus}
                    />
                  )}
                </Col>
              </Row>
            )}
            <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ fontWeight: '600' }}>
                Date
              </Col>
              <Col span={16}>
                <Form.Item name="time">
                  <DatePicker
                    showTime
                    format="DD/MM/YYYY HH:mm:ss"
                    style={{ width: '100%' }}
                    onChange={() => handleItemClick('time')}
                  />
                </Form.Item>
                {findNameChangeSave('time', items).open && (
                  <WrapperSaveCancel
                    onCancel={() => handleCancelClick('time')}
                    onSave={() =>
                      handleSave(
                        'time',
                        form
                          .getFieldValue('time')
                          ?.format('YYYY-MM-DD HH:mm:ss'),
                      )
                    }
                  />
                )}
              </Col>
            </Row>
            <Row gutter={(8, 8)} style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ fontWeight: '600' }}>
                Consultant
              </Col>
              <Col span={16}>
                <Form.Item name="interviewer">
                  <Select
                    optionFilterProp="label"
                    placeholder="Please select flow status"
                    style={{ width: '100%' }}
                    mode="multiple"
                    onChange={() => handleItemClick('interviewer')}
                  >
                    {users.map((item) => (
                      <Option
                        key={item.user_id}
                        value={item.user_id}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {item.full_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {findNameChangeSave('interviewer', items).open && (
                  <WrapperSaveCancel
                    onCancel={() => handleCancelClick('interviewer')}
                    onSave={() =>
                      handleSave(
                        'interviewer',
                        form.getFieldValue('interviewer'),
                      )
                    }
                  />
                )}
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ borderLeft: '1px solid rgb(221, 221, 221)' }}>
            <CommentInterviewLoop dataFlow={dataFlow} form={form} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

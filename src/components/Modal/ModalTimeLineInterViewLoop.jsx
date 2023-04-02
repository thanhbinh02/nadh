import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Row, Col, DatePicker, Select, Form } from 'antd';
import {
  candidate_flow_status,
  changeTime,
  STATUS_JOB,
} from '../../utils/const';
import moment from 'moment';
import { useEffect } from 'react';
import { CommentInterviewLoop } from '../CommentInterviewLoop';
import { fetchDetailCandidateSliceNotLoading } from '../../store/detailCandidateSlice';

const findItemWithId = (array, id) => {
  return array.find((item) => item.id === id);
};

const { Option } = Select;

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
    interviewer:
      dataFlow?.item?.info?.interviewer?.map((item) => item.id) || [],
    time: dataFlow?.item?.info?.time
      ? moment(dataFlow?.item?.info?.time)
      : null,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [dataFlow]);

  useEffect(() => {
    dispatch(
      fetchDetailCandidateSliceNotLoading(detailCandidate?.candidate_id),
    );
  }, [isPutSuccess]);

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
                  <Select
                    optionFilterProp="label"
                    placeholder="Please select flow status"
                    style={{ width: '100%' }}
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
                  />
                </Form.Item>
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
                  >
                    {users.map((item) => (
                      <Option
                        key={item.id}
                        value={item.id}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {item.full_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
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

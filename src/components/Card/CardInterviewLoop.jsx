import { Card, Button, Collapse, Dropdown, Timeline } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { candidate_flow_status, changeTime } from '../../utils/const';
import { viewFlowDetail } from '../../store/detailCandidateSlice';
import { useState, useEffect } from 'react';
import { ModalTimeLineInterViewLoop } from '../Modal/ModalTimeLineInterViewLoop';
import { fetchUsers } from '../../store/usersSlice';
import { ModalCandidateAssessment } from '../Modal/ModalCandidateAssessment';
import { getCandidateAssessmentSlice } from '../../store/detailCandidateSlice';

const { Panel } = Collapse;

export const findItemWithId = (array, id) => {
  return array.find((item) => item.id === id);
};

export const CardInterviewLoop = () => {
  const flows = useSelector((state) => state.detailCandidate.flows);
  const detailCandidate = useSelector((state) => state.detailCandidate.data);
  const dispatch = useDispatch();
  const [openModalTimeLine, setOpenModalTimeLine] = useState(false);
  const [openModalCandidateAssessment, setOpenModalCandidateAssessment] =
    useState(false);

  const showModalTimeLineInterviewLoop = (flowItem, item) => {
    dispatch(viewFlowDetail({ flowItem, item }));
    setOpenModalTimeLine(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <div className="card__interview-loop">
        <Card
          bordered={false}
          style={{
            width: '100%',
          }}
          title="Interview Loop"
          extra={
            <Button type="primary" ghost icon={<PlusOutlined />}>
              Pick Job
            </Button>
          }
        >
          {flows.length > 0 && (
            <>
              <Collapse accordion>
                {flows.map((flowItem) => (
                  <Panel
                    key={flowItem.job_id}
                    header={
                      <div>
                        <p>
                          {flowItem.job?.job_id} - {flowItem.job?.title.label}
                        </p>
                        <p
                          style={{
                            color: 'gray',
                            fontSize: '13px',
                            fontWeight: '400',
                          }}
                        >
                          {flowItem.job?.client.name} -{' '}
                          {flowItem.job?.client.client_id}
                        </p>
                      </div>
                    }
                    extra={
                      <Dropdown
                        menu={{
                          items: [
                            {
                              label: (
                                <span
                                  role="presentation"
                                  onClick={() => {
                                    dispatch(viewFlowDetail({ flowItem }));
                                    const newData = {
                                      candidate_id: detailCandidate?.id,
                                      job_id: flowItem?.job_id,
                                    };
                                    dispatch(
                                      getCandidateAssessmentSlice(newData),
                                    );
                                    setOpenModalCandidateAssessment(true);
                                  }}
                                >
                                  Candidate Assessment
                                </span>
                              ),
                            },
                          ],
                        }}
                        trigger={['click']}
                      >
                        <span
                          role="presentation"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <MoreOutlined />
                        </span>
                      </Dropdown>
                    }
                  >
                    <Timeline>
                      {flowItem.flow?.map((item) => (
                        <Timeline.Item
                          key={item?.id}
                          color="green"
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            showModalTimeLineInterviewLoop(flowItem, item)
                          }
                        >
                          <p>
                            {
                              findItemWithId(
                                candidate_flow_status,
                                item?.current_status,
                              )?.label
                            }
                          </p>
                          <p>{changeTime(item?.createdAt)}</p>
                          <p>{item?.comments.length} comments</p>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Panel>
                ))}
              </Collapse>
            </>
          )}
        </Card>
      </div>
      <ModalTimeLineInterViewLoop
        openModalTimeLine={openModalTimeLine}
        setOpenModalTimeLine={setOpenModalTimeLine}
      />
      <ModalCandidateAssessment
        openModalCandidateAssessment={openModalCandidateAssessment}
        setOpenModalCandidateAssessment={setOpenModalCandidateAssessment}
      />
    </>
  );
};

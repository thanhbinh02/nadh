import { Row, Col, Avatar, message, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { changeTime } from '../utils/const';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AiOutlineMore } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { putNewDetailCandidate } from '../store/detailCandidateSlice';

export const CommentClient = ({ comments }) => {
  const dispatch = useDispatch();

  const detailCandidate = useSelector((state) => state.detailCandidate.data);

  const handleConfirm = (findNoteComment, id) => {
    let result;

    if (findNoteComment !== undefined) {
      result = detailCandidate?.note_comments?.filter(
        (item) => item !== findNoteComment,
      );
    } else {
      let noteComments = detailCandidate?.note_comments;
      if (noteComments.length > 0) {
        console.log('noteComments', noteComments);
        result = [...noteComments, id];
      } else {
        result = [id];
      }
    }

    dispatch(
      putNewDetailCandidate({
        id: detailCandidate?.id,
        params: {
          note_comments: result,
        },
      }),
    );
  };

  return (
    <>
      {comments?.map((comment) => {
        const findNoteComment = detailCandidate?.note_comments?.find(
          (item) => item === comment?.id,
        );

        return (
          <div key={comment?.id}>
            <>
              <Row gutter={(8, 8)} className="div-item-comment">
                <Col span={2}>
                  {comment?.user?.mediafiles?.avatar ? (
                    <Avatar
                      size="default"
                      src={`https://lubrytics.com:8443/nadh-mediafile/file/${comment?.user?.mediafiles?.avatar}`}
                    />
                  ) : (
                    <Avatar size="default" icon={<UserOutlined />} />
                  )}
                </Col>
                <Col span={20}>
                  <div style={{ marginLeft: '9.4px' }}>
                    <span
                      style={{ fontWeight: '500', textTransform: 'capitalize' }}
                    >
                      {comment?.user?.full_name}
                    </span>
                    <span> - {changeTime(comment?.createdAt)}</span>
                  </div>
                  <div className="style-ckeditor hidden comment_client">
                    <CKEditor
                      editor={ClassicEditor}
                      data={comment?.content}
                      disabled={true}
                    />
                  </div>
                </Col>
                <Col span={2}>
                  <Popconfirm
                    placement="bottomLeft"
                    title={
                      findNoteComment
                        ? 'Remove pick comment to note ?'
                        : 'Pick comment to note ?'
                    }
                    okText="Yes"
                    cancelText="No"
                    onCancel={() => {
                      console.log('onCancel');
                    }}
                    onConfirm={() =>
                      handleConfirm(findNoteComment, comment?.id)
                    }
                  >
                    <div style={{ fontSize: '20px', cursor: 'pointer' }}>
                      <AiOutlineMore />
                    </div>
                  </Popconfirm>
                </Col>
              </Row>
            </>
          </div>
        );
      })}
    </>
  );
};

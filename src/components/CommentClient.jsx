import { Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { changeTime } from '../utils/const';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const CommentClient = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <Row key={comment?.id} gutter={(8, 8)} className="div-item-comment">
            <Col span={3}>
              {comment?.user?.mediafiles?.avatar ? (
                <Avatar
                  size="large"
                  src={`https://lubrytics.com:8443/nadh-mediafile/file/${comment?.user?.mediafiles?.avatar}`}
                />
              ) : (
                <Avatar size="large" icon={<UserOutlined />} />
              )}
            </Col>
            <Col span={19}>
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
          </Row>
        );
      })}
    </>
  );
};

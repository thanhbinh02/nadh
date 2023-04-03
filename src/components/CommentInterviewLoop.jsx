import React, { useState } from 'react';
import { CommentClient } from './CommentClient';
import { Row, Col, Input, Form, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { postCommentInterview } from '../store/detailCandidateSlice';
import { useDispatch } from 'react-redux';
import { postFile } from '../apis/fileApi';

export const CommentInterviewLoop = ({ dataFlow, form }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleFocus = () => {
    setEdit(true);
  };

  const handleEditorChange = (event, editor) => {
    const dataEditor = editor.getData();
    form.setFieldValue('comment_note', dataEditor);
  };

  const handleSave = () => {
    const newData = {
      content: form.getFieldValue('comment_interview'),
      source: {
        module: 'candidate_flow',
        section: 'flow_status',
        id: dataFlow?.item?.id,
      },
      source_uuid: dataFlow?.flowItem?.id,
    };

    dispatch(postCommentInterview(newData));
    setEdit(false);
  };

  const config = {
    extraPlugins: [uploadPlugin],
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          const body = new FormData();
          const file = await loader.file;
          body.append('upload', file);
          const { id } = await postFile(body);
          return {
            default: `https://lubrytics.com:8443/nadh-mediafile/file/${id}`,
          };
        },
      };
    };
  }

  return (
    <>
      <p style={{ fontWeight: '600' }}>Comments</p>
      {!edit ? (
        <Row
          style={{
            margin: '15px 0',
          }}
        >
          <Input placeholder="Add content" onFocus={handleFocus}></Input>
        </Row>
      ) : (
        <Row>
          <Col span={24}>
            <Form.Item
              name="comment_interview"
              getValueFromEvent={(_, editor) => editor.getData()}
            >
              <CKEditor
                editor={ClassicEditor}
                onChange={handleEditorChange}
                config={config}
              />
            </Form.Item>
            <Row
              style={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                style={{ marginRight: '12px' }}
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </Row>
          </Col>
        </Row>
      )}
      <div style={{ fontSize: '16px' }}>
        {dataFlow?.item?.comments?.length} comments
      </div>
      <Row className="comment__timeline">
        <Col
          style={{
            marginBottom: '20px',
          }}
          span={24}
        ></Col>
        <Col span={24} style={{ padding: '0 20px' }}>
          <CommentClient comments={dataFlow?.item?.comments} />
        </Col>
      </Row>
    </>
  );
};

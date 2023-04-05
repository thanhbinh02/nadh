import React from 'react';
import { Card, Form, Input, Row, Button } from 'antd';
import { CommentClient } from '../CommentClient';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postFile } from '../../apis/fileApi';
import { fetchDetailJobNotLoading } from '../../store/detailJobSlice';
import { postCommentJob } from '../../store/detailJobSlice';
import { CommentNote } from '../CommentNote';

export const CardComment = ({ form, detailJob }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const isPutSuccess = useSelector((state) => state.detailJob.isPutSuccess);

  useEffect(() => {
    if (isPutSuccess) {
      dispatch(fetchDetailJobNotLoading(detailJob.id));
    }
  }, [isPutSuccess]);

  const handleSave = () => {
    const newData = {
      content: form.getFieldValue('comment_note'),
      source: { module: 'job', section: 'detail' },
      source_uuid: detailJob?.id,
    };

    console.log('newData', newData);

    dispatch(postCommentJob(newData));
    setEdit(false);
  };

  const handleFocus = () => {
    setEdit(true);
  };

  const handleEditorChange = (event, editor) => {
    const dataEditor = editor.getData();
    form.setFieldValue('comment_note', dataEditor);
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
    <Card
      title="Notes"
      bordered={false}
      style={{
        width: '100%',
        marginTop: '40px',
      }}
    >
      <>
        <div
          style={{
            marginBottom: '30px',
          }}
        >
          {!edit ? (
            <div
              style={{
                marginBottom: '30px',
              }}
            >
              <Input placeholder="Add content" onFocus={handleFocus}></Input>
            </div>
          ) : (
            <div>
              <Form.Item
                name="comment_note"
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
            </div>
          )}
        </div>
        <div
          style={{
            maxHeight: '500px',
            overflow: 'auto',
          }}
        >
          <CommentNote comments={detailJob?.detail_comments} />
        </div>
      </>
    </Card>
  );
};

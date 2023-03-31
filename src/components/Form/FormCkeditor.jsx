import { useState } from 'react';
import { Form, Button, Row, Input } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch } from 'react-redux';
import { putNewDetailJob } from '../../store/detailJobSlice';
import { postFile } from '../../apis/fileApi';

export const FormCkeditor = ({ name, label, data, form, job_id }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleFocus = () => {
    setEdit(true);
  };

  const checkShow = (edit) => {
    if (edit) {
      return 'style-ckeditor show';
    } else {
      return 'style-ckeditor hidden';
    }
  };

  const handleSave = () => {
    const newData = {
      id: job_id,
      params: {
        [`${name}`]: form.getFieldValue(name),
      },
    };

    dispatch(putNewDetailJob(newData));
    setEdit(false);
  };

  const handleEditorChange = (event, editor) => {
    const dataEditor = editor.getData();
    form.setFieldValue(name, dataEditor);
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
      {data ? (
        <div className={checkShow(edit)}>
          <Form.Item
            name={name}
            label={label}
            getValueFromEvent={(_, editor) => editor.getData()}
          >
            <CKEditor
              editor={ClassicEditor}
              data={data}
              onFocus={handleFocus}
              onChange={handleEditorChange}
              config={config}
            />
          </Form.Item>
          {edit && (
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
          )}
        </div>
      ) : (
        <div className={checkShow(edit)}>
          {!edit ? (
            <Input placeholder="Add content" onFocus={handleFocus}></Input>
          ) : (
            <>
              <Form.Item
                name={name}
                label={label}
                getValueFromEvent={(_, editor) => editor.getData()}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={data}
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
            </>
          )}
        </div>
      )}
    </>
  );
};

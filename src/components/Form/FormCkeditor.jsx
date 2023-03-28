import { useState, useEffect } from 'react';

import { Form, Button, Row, Col, Input } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const FormCkeditor = ({ name, label, data, form }) => {
  const [edit, setEdit] = useState(false);

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
    console.log('value', form.getFieldValue(name));
    console.log('data', data);
  };

  const handleEditorChange = (event, editor) => {
    const dataEditor = editor.getData();
    form.setFieldValue(name, dataEditor);
  };

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
            />
          </Form.Item>
          {edit && (
            <Row
              style={{ marginTop: '10px', display: 'flex', textAlign: 'end' }}
            >
              <Button onClick={() => setEdit(false)}>Cancel</Button>
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
                />
              </Form.Item>
              <Row
                style={{ marginTop: '10px', display: 'flex', textAlign: 'end' }}
              >
                <Button onClick={() => setEdit(false)}>Cancel</Button>
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

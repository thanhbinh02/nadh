import React, { useState, useEffect } from 'react';

import { Form, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const FormCkeditor = ({ name, label, data }) => {
  const [edit, setEdit] = useState(true);

  const handleFocus = () => {
    setEdit(false);
  };

  useEffect(() => {}, [edit]);

  return (
    <Form.Item
      name={name}
      label={label}
      getValueFromEvent={(_, editor) => editor.getData()}
    >
      {edit ? (
        <>
          <CKEditor
            editor={ClassicEditor}
            data={data}
            config={{ toolbar: [] }}
            onFocus={handleFocus}
          />
        </>
      ) : (
        <>
          <CKEditor editor={ClassicEditor} data={data} onFocus={handleFocus} />
          <Button onClick={() => setEdit(true)}>Cancel</Button>
        </>
      )}
    </Form.Item>
  );
};

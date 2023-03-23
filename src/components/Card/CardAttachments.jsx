import React from 'react';
import { Card, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { removeFile } from '../../store/fileSlice';
import { useSelector } from 'react-redux';
import { postFileRedux } from '../../store/fileSlice';
import { fetchFiles } from '../../store/fileSlice';

export const CardAttachments = ({ files, obj_uid }) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user_sent);

  const newDataFiles = files?.map((item) => {
    if (item.ext === '.jpg') {
      return {
        ...item,
        uid: item.id,
        url: `https://lubrytics.com:8443/nadh-mediafile/file/${item.id}`,
      };
    } else {
      return {
        ...item,
        uid: item.id,
      };
    }
  });

  const handleChange = async (info) => {
    if (info.file.status === 'removed') {
      await dispatch(removeFile(info.file.id));
      return;
    }

    if (info.file.status === 'uploading') {
      let newFile = new FormData();
      newFile.append('file', info.file.originFileObj);
      newFile.append('obj_table', 'candidates');
      newFile.append('obj_uid', obj_uid);
      newFile.append('uploadedByUserId', JSON.parse(user_id).id || 12);
      await dispatch(postFileRedux(newFile));
      await dispatch(
        fetchFiles({
          obj_id: obj_uid,
          obj_table: 'candidates',
        }),
      );
    }
  };

  return (
    <Card
      title="Personal Information"
      style={{
        width: '100%',
      }}
    >
      <Upload
        action="https://lubrytics.com:8443/nadh-mediafile/file"
        listType="picture-card"
        fileList={newDataFiles}
        showUploadList={{
          showDownloadIcon: true,
        }}
        onChange={handleChange}
      >
        Upload
      </Upload>
    </Card>
  );
};

// const upLoadingFile = async file => {
//   let formData = new FormData();
//   formData.append("file", file);
//   formData.append("obj_table", "candidates");
//   formData.append("obj_uid", detailData.id);
//   formData.append("uploadedByUserId", 12);
//   await dispatch(fetchPostFile(formData));
// };

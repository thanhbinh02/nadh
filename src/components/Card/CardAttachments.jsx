import React from 'react';
import { Card, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { removeFile } from '../../store/fileSlice';
import { useSelector } from 'react-redux';
import { postFileRedux } from '../../store/fileSlice';
import { fetchFiles } from '../../store/fileSlice';
import axiosClient from '../../apis/axiosClient';
import { AiOutlinePlus } from 'react-icons/ai';

export const CardAttachments = ({ files, obj_uid }) => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.auth.user_sent);

  const newDataFiles = files?.map((item) => {
    if (item.ext === '.jpg') {
      return {
        ...item,
        uid: item.id,
        url: `https://lubrytics.com:8443/nadh-mediafile/file/${item.id}`,
        status: 'done',
      };
    } else {
      return {
        ...item,
        uid: item.id,
        status: 'done',
      };
    }
  });

  const handleChange = async (info) => {
    if (info.file.status === 'removed') {
      dispatch(removeFile(info.file.id));
      return;
    }

    if (info.file.status === 'uploading') {
      console.log('file', files);

      let newFile = new FormData();
      newFile.append('file', info.file.originFileObj);
      newFile.append('obj_table', 'candidates');
      newFile.append('obj_uid', obj_uid);
      newFile.append('uploadedByUserId', JSON.parse(user_id).id || 12);
      dispatch(postFileRedux(newFile))
        .unwrap()
        .then(() => {
          dispatch(
            fetchFiles({
              obj_id: obj_uid,
              obj_table: 'candidates',
            }),
          );
        })
        .catch(() => {
          console.log('loi ne');
        });
    }
  };

  const handleDownload = async (file) => {
    const url = `https://lubrytics.com:8443/nadh-mediafile/file/${file.id}`;
    const blob = await axiosClient.get(url, { responseType: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.style.display = 'none';
    link.click();
  };

  return (
    <Card
      title="Attachments"
      bordered={false}
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
          showRemoveIcon: true,
          showPreviewIcon: true,
        }}
        onDownload={handleDownload}
        onChange={handleChange}
      >
        <div>
          <AiOutlinePlus />
          <p> Upload</p>
        </div>
      </Upload>
    </Card>
  );
};

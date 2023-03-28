import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, Tooltip, theme, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { putNewDetailJob } from '../../store/detailJobSlice';

const findDataSocial = (data, name) => {
  const value = data
    ?.filter((item) => item.platform === name)
    ?.map((item) => {
      return item.url;
    });
  return value;
};

const findUrlExistData = (url, data) => {
  const result = data?.find((item) => item.url === url);
  return result;
};

export const SocialItem = ({
  data,
  job_id,
  name,
  currentData,
  setCurrentData,
}) => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [tags, setTags] = useState(findDataSocial(currentData, name));
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    const value = currentData.filter((tag) => tag.url !== removedTag);
    setCurrentData(value);
    const newData = {
      id: job_id,
      params: {
        social_media: value,
      },
    };

    dispatch(putNewDetailJob(newData));
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      if (findUrlExistData(inputValue, data)) {
        toast.error('The link are already exist', {
          autoClose: 1000,
          position: 'top-right',
        });
      } else {
        if (inputValue.includes('http')) {
          setTags([...tags, inputValue]);
          setCurrentData([...currentData, { url: inputValue, platform: name }]);

          const newData = {
            id: job_id,
            params: {
              social_media: [
                ...currentData,
                { url: inputValue, platform: name },
              ],
            },
          };

          dispatch(putNewDetailJob(newData));
        } else {
          toast.error('Test must be url!', {
            autoClose: 1000,
            position: 'top-right',
          });
        }
      }
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag) => {
    const tagElem = (
      <>
        <Tooltip
          placement="top"
          color="white"
          overlay={
            <div>
              <a href={tag} target="_blank">
                {tag}
              </a>
            </div>
          }
        >
          <Tag
            closable
            onClose={(e) => {
              e.preventDefault();
              handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        </Tooltip>
      </>
    );
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags?.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };
  return (
    <>
      <Row
        style={{
          marginBottom: 16,
        }}
      >
        <p style={{ marginRight: '14px', textTransform: 'capitalize' }}>
          {name}:
        </p>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>

        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{
              width: 78,
            }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Row>
    </>
  );
};

import { Tag } from 'antd';
import { useState } from 'react';
import { priority_status } from '../utils/const';

const findPriorityStatus = (id) => {
  const item = priority_status.find((item) => item.id === 1);
  return item.label;
};

const findLanguages = (resultLanguages, dataLanguages) => {
  const listKey = resultLanguages.split(',').map((numStr) => parseInt(numStr));
  const result = dataLanguages
    .filter((item) => listKey.includes(item.key))
    .map((item) => item.label)
    .join(', ');
  return result;
};

const TagFilter = ({ filterPage, dataLanguages }) => {
  let listTag = [];

  if (filterPage?.priority_status) {
    const filterPriorityStatus = `Primary Status: ${findPriorityStatus(
      filterPage.priority_status,
    )}`;
    listTag.push(filterPriorityStatus);
  }

  if (filterPage?.language) {
    const result = `Language: ${findLanguages(
      filterPage.language,
      dataLanguages,
    )}`;
    listTag.push(result);
  }

  if (filterPage?.location) {
    if (filterPage.location.city) {
      const result = `City: ${filterPage.location.country.label} / ${filterPage.location.city.label}`;
      listTag.push(result);
    } else {
      const result = `City: ${filterPage.location.country.label}`;
      listTag.push(result);
    }
  }

  console.log('listTag', listTag);

  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
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
  const tagChild = tags.map(forMap);

  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      ></div>
    </>
  );
};
export default TagFilter;

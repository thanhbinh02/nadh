import { Tag } from 'antd';
import { useState } from 'react';

const TagFilter = ({ test2 }) => {
  const handleClose = (removedTag) => {};

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
  const tagChild = test2.map(forMap);

  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        {tagChild}
      </div>
    </>
  );
};
export default TagFilter;

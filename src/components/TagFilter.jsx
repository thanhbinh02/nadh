import { Tag } from 'antd';
import { TAG_CANDIDATES } from '../utils/const';
import { useDispatch } from 'react-redux';
import { fetchCandidates } from '../store/candidatesSlice';
import { getTagsCandidates } from '../store/tagsCandidatesSlice';

const TagFilter = ({
  tags,
  keyPage,
  listTags,
  fetchData,
  changeDataDispatch,
  getTags,
}) => {
  const dispatch = useDispatch();

  const handleClose = (tag) => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
    const getTag = tag.split(':')[0];
    const getItem = listTags.find((item) => item.label === getTag);

    if (getItem.label === 'Job(s)') {
      delete dataSaveLocal['client_jobs_from'];
      delete dataSaveLocal['client_jobs_to'];
    } else if (getItem.label === 'Updated on') {
      delete dataSaveLocal['updated_on_from'];
      delete dataSaveLocal['updated_on_to'];
    } else if (getItem.label === 'Quantity') {
      delete dataSaveLocal['quantity_from'];
      delete dataSaveLocal['quantity_to'];
    } else if (getItem.label === 'Open Date') {
      delete dataSaveLocal['target_day_from'];
      delete dataSaveLocal['target_day_to'];
    } else if (getItem.label === 'Expire Date') {
      delete dataSaveLocal['end_day_from'];
      delete dataSaveLocal['end_day_to'];
    } else if (getItem.label === 'Year of services') {
      delete dataSaveLocal['industry_year_from'];
      delete dataSaveLocal['industry_year_to'];
    } else if (getItem.label === 'Salary Range') {
      delete dataSaveLocal['salary_from'];
      delete dataSaveLocal['salary_to'];
    } else {
      delete dataSaveLocal[getItem.title];
    }
    dispatch(fetchData(changeDataDispatch(dataSaveLocal)));
    dispatch(getTags(dataSaveLocal));
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
          marginBottom: '8px',
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
      >
        {tagChild}
      </div>
    </>
  );
};
export default TagFilter;

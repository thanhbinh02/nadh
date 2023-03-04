import { Tag } from 'antd';
import { TAG_CANDIDATES } from '../utils/const';
import { useDispatch } from 'react-redux';
import { fetchCandidates } from '../store/candidatesSlice';
import { getTagsCandidates } from '../store/tagsCandidatesSlice';

function getObjectByTitle(obj, title) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  for (let prop in obj) {
    if (prop === title) {
      const { [prop]: omit, ...rest } = obj;
      return rest;
    }

    if (typeof obj[prop] === 'object') {
      obj[prop] = getObjectByTitle(obj[prop], title);
    }
  }

  return obj;
}

const TagFilter = ({ tags }) => {
  const dispatch = useDispatch();

  const handleClose = (tag) => {
    const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
    const getTag = tag.split(':')[0];
    const getTitleTag = TAG_CANDIDATES.find(
      (item) => item.tag === getTag,
    ).title;

    const dataOne = getObjectByTitle(dataSaveLocal, getTitleTag);
    if (getTitleTag === 'countryCity') {
      const dataTwo = getObjectByTitle(dataOne, 'city');
      const dataThree = getObjectByTitle(dataTwo, 'country');
      dispatch(fetchCandidates(dataThree));
      dispatch(getTagsCandidates(dataThree));
    } else if (getTitleTag === 'industries') {
      const dataTwo = getObjectByTitle(dataOne, 'industry_id');
      const dataThree = getObjectByTitle(dataTwo, 'industry_type');
      dispatch(fetchCandidates(dataThree));
      dispatch(getTagsCandidates(dataThree));
    } else if (getTitleTag === 'yob') {
      const dataTwo = getObjectByTitle(dataOne, 'yob_from');
      const dataThree = getObjectByTitle(dataTwo, 'yob_to');
      dispatch(fetchCandidates(dataThree));
      dispatch(getTagsCandidates(dataThree));
    } else if (getTitleTag === 'industry_years') {
      const dataTwo = getObjectByTitle(dataOne, 'industry_years_from');
      const dataThree = getObjectByTitle(dataTwo, 'industry_years_to');
      dispatch(fetchCandidates(dataThree));
      dispatch(getTagsCandidates(dataThree));
    } else if (getTitleTag === 'management_years') {
      const dataTwo = getObjectByTitle(dataOne, 'management_years_from');
      const dataThree = getObjectByTitle(dataTwo, 'management_years_to');
      dispatch(fetchCandidates(dataThree));
      dispatch(getTagsCandidates(dataThree));
    } else {
      dispatch(fetchCandidates(dataOne));
      dispatch(getTagsCandidates(dataOne));
    }
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
      >
        {tagChild}
      </div>
    </>
  );
};
export default TagFilter;

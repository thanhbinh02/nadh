import { priority_status } from './const';
import { candidate_flow_status } from './const';

const findPriorityStatus = (id) => {
  const item = priority_status.find((item) => item.id === id);
  return item.label;
};

const findItem = (resultLocal, listData) => {
  const listKey = resultLocal.split(',').map((numStr) => parseInt(numStr));
  const result = listData
    .filter((item) => listKey.includes(Number(item.key)))
    .map((item) => item.label)
    .join(', ');

  return result;
};

export const filterTagCandidates = (filterPage, dataLanguages) => {
  let listTag = [];
  if (filterPage?.priority_status) {
    const filterPriorityStatus = `Primary Status: ${findPriorityStatus(
      filterPage.priority_status,
    )}`;
    listTag.push(filterPriorityStatus);
  }

  if (filterPage?.language) {
    const result = `Language: ${findItem(filterPage.language, dataLanguages)}`;
    listTag.push(result);
  }

  if (filterPage?.location?.countryCity) {
    if (filterPage.location.countryCity.city) {
      const result = `City: ${filterPage.location.countryCity.country} / ${filterPage.location.countryCity.city}`;
      listTag.push(result);
    } else {
      const result = `City: ${filterPage.location.countryCity.country}`;
      listTag.push(result);
    }
  }

  if (filterPage?.location?.industry) {
    if (filterPage?.location?.industry?.category) {
      const result = `Industry:  ${filterPage?.location?.industry.industry} / ${filterPage.location.industry.sector} / ${filterPage.location.industry.category}`;
      listTag.push(result);
    } else if (filterPage?.location?.industry?.sector) {
      const result = `Industry:  ${filterPage.location.industry.industry} / ${filterPage.location.industry.sector} `;
      listTag.push(result);
    } else {
      const result = `Industry:  ${filterPage.location.industry.industry} `;
      listTag.push(result);
    }
  }

  if (filterPage?.flow_status) {
    const result = `Activity: : ${findItem(
      filterPage.flow_status,
      candidate_flow_status,
    )}`;
    listTag.push(result);
  }

  return listTag;
};

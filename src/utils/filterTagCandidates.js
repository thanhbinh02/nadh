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
  if (filterPage?.candidate_id) {
    const result = `ID: ${filterPage.candidate_id}`;
    listTag.push(result);
  }

  if (filterPage?.full_name) {
    const result = `Name: ${filterPage.full_name}`;
    listTag.push(result);
  }

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

  if (filterPage?.location?.industries) {
    if (filterPage?.location?.industries?.category) {
      const result = `Industry:  ${filterPage?.location?.industries.industry.label} / ${filterPage.location.industries.sector.label} / ${filterPage.location.industries.category.label}`;
      listTag.push(result);
    } else if (filterPage?.location?.industries?.sector) {
      const result = `Industry:  ${filterPage.location.industries.industry.label} / ${filterPage.location.industries.sector.label} `;
      listTag.push(result);
    } else {
      const result = `Industry:  ${filterPage.location.industries.industry.label} `;
      listTag.push(result);
    }
  }

  if (filterPage?.yob_from || filterPage?.yob_to) {
    if (filterPage?.yob_to && filterPage?.yob_from) {
      const result = `YOB: from ${filterPage.yob_from} to ${filterPage.yob_to}`;
      listTag.push(result);
    } else {
      if (filterPage?.yob_to) {
        const result = `YOB: from ${filterPage.yob_to}`;
        listTag.push(result);
      } else {
        const result = `YOB: to ${filterPage.yob_from}`;
        listTag.push(result);
      }
    }
  }

  if (filterPage?.flow_status) {
    const result = `Activity: ${findItem(
      filterPage.flow_status,
      candidate_flow_status,
    )}`;
    listTag.push(result);
  }

  if (filterPage?.current_company_text) {
    const result = `Recent company: ${filterPage.current_company_text}`;
    listTag.push(result);
  }

  if (filterPage?.current_position_text) {
    const result = `Recent position: ${filterPage.current_position_text}`;
    listTag.push(result);
  }

  if (filterPage?.industry_years_from || filterPage?.industry_years_to) {
    if (filterPage?.industry_years_to && filterPage?.industry_years_from) {
      const result = `Year of services: from ${filterPage.industry_years_from} to ${filterPage.industry_years_to}`;
      listTag.push(result);
    } else {
      if (filterPage?.industry_years_to) {
        const result = `Year of services: from ${filterPage.industry_years_to}`;
        listTag.push(result);
      } else {
        const result = `Year of services: to ${filterPage.industry_years_from}`;
        listTag.push(result);
      }
    }
  }

  if (filterPage?.management_years_from || filterPage?.management_years_to) {
    if (filterPage?.management_years_to && filterPage?.management_years_from) {
      const result = `Year of management: from ${filterPage.management_years_from} to ${filterPage.management_years_to}`;
      listTag.push(result);
    } else {
      if (filterPage?.management_years_to) {
        const result = `Year of management: from ${filterPage.management_years_to}`;
        listTag.push(result);
      } else {
        const result = `Year of management: to ${filterPage.management_years_from}`;
        listTag.push(result);
      }
    }
  }

  return listTag;
};

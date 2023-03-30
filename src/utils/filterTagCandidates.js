const labelIndustry = (filterPage) => {
  if (filterPage?.industry?.category) {
    const result = `Industry:  ${filterPage?.industry?.industry?.label} / ${filterPage?.industry?.sector?.label} / ${filterPage?.industry?.category?.label}`;
    return result;
  }

  if (filterPage?.industry?.sector) {
    const result = `Industry:  ${filterPage?.industry?.industry?.label} / ${filterPage?.industry?.sector?.label}`;
    return result;
  }

  if (filterPage?.industry?.industry) {
    const result = `Industry:  ${filterPage?.industry?.industry?.label}`;
    return result;
  }
};

const labelRange = (from, to, name) => {
  if (from !== undefined && to === undefined) {
    const result = `${name}: from ${from}`;
    return result;
  }

  if (from === undefined && to !== undefined) {
    const result = `${name}: to ${to}`;
    return result;
  }

  if (from !== undefined && to !== undefined) {
    const result = `${name}: from ${from} to ${to}`;
    return result;
  }
};

export const filterTagCandidates = (filterPage) => {
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
    const filterPriorityStatus = `Primary Status: ${filterPage?.priority_status?.label}}`;
    listTag.push(filterPriorityStatus);
  }

  if (filterPage?.language) {
    const result = filterPage?.language?.map((item) => item.label).join(', ');
    listTag.push(`Language: ${result}`);
  }

  if (filterPage?.location) {
    if (filterPage?.location?.city) {
      const result = `City:  ${filterPage.location.country.label}/${filterPage.location.city.label}`;
      listTag.push(result);
    } else {
      const result = `City:  ${filterPage.location.country.label}`;
      listTag.push(result);
    }
  }

  if (filterPage?.industry) {
    listTag.push(labelIndustry(filterPage));
  }

  if (filterPage?.yob_from || filterPage?.yob_to) {
    listTag.push(labelRange(filterPage?.yob_from, filterPage?.yob_to, 'YOB'));
  }

  if (filterPage?.flow_status) {
    const result = filterPage?.flow_status
      ?.map((item) => item.label)
      .join(', ');
    listTag.push(`Activity: ${result}`);
  }

  if (filterPage?.current_company) {
    const result = `Recent companies: ${filterPage.current_company}`;
    listTag.push(result);
  }

  if (filterPage?.current_position) {
    const result = `Recent positions: ${filterPage.current_position}`;
    listTag.push(result);
  }

  if (filterPage?.industry_years_from || filterPage?.industry_years_to) {
    listTag.push(
      labelRange(
        filterPage?.industry_years_from,
        filterPage?.industry_years_to,
        'Year of services',
      ),
    );
  }

  if (filterPage?.management_years_from || filterPage?.management_years_to) {
    listTag.push(
      labelRange(
        filterPage?.management_years_from,
        filterPage?.management_years_to,
        'Year of management',
      ),
    );
  }

  return listTag;
};

export const changeLocalCandidateToParams = (local) => {
  const findIndustryId = (industry) => {
    if (industry?.category) {
      return Number(industry?.category?.key);
    }
    if (industry?.sector) {
      return Number(industry?.sector?.key);
    }
    if (industry?.industry) {
      return Number(industry?.industry?.key);
    }
  };

  const findIndustryType = (industry) => {
    if (industry?.category) {
      return 3;
    }
    if (industry?.sector) {
      return 2;
    }
    if (industry?.industry) {
      return 1;
    }
  };

  const newValue = {
    page: local?.page,
    perPage: local?.perPage,
    candidate_id: local?.candidate_id,
    full_name: local?.full_name,
    priority_status: local?.priority_status?.key,
    language: local?.language?.map((item) => item.key).join(',') || undefined,
    country: local?.location?.country?.key || undefined,
    city: local?.location?.city?.key || undefined,
    industry_id: local?.industry ? findIndustryId(local?.industry) : undefined,
    industry_type: local?.industry
      ? findIndustryType(local?.industry)
      : undefined,
    yob_from: local?.yob_from || undefined,
    yob_to: local?.yob_to || undefined,
    flow_status:
      local?.flow_status?.map((item) => item.key).join(',') || undefined,
    current_company_text: local?.current_company,
    current_position_text: local?.current_position,
    industry_years_from: local?.industry_years_from,
    industry_years_to: local?.industry_years_to,
    management_years_from: local?.management_years_from,
    management_years_to: local?.management_years_to,
  };

  const result = {};

  for (const key in newValue) {
    if (newValue[key] !== undefined) {
      result[key] = newValue[key];
    }
  }

  return result;
};

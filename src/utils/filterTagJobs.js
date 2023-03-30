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

const labelSalary = (from, to, label) => {
  if (from !== undefined && to === undefined) {
    const result = `Salary Range: from ${from} ${label}`;
    return result;
  }

  if (from === undefined && to !== undefined) {
    const result = `Salary Range: to ${to} ${label}`;
    return result;
  }

  if (from !== undefined && to !== undefined) {
    const result = `Salary Range: from ${from} ${label} to ${to} ${label}`;
    return result;
  }
};

export const filterTagJobs = (filterPage) => {
  let listTag = [];

  if (filterPage?.job_id) {
    const result = `ID: ${filterPage.job_id}`;
    listTag.push(result);
  }

  if (filterPage?.title) {
    const result = `Title: ${filterPage.title}`;
    listTag.push(result);
  }

  if (filterPage?.quantity_from || filterPage?.quantity_to) {
    listTag.push(
      labelRange(
        filterPage?.quantity_from,
        filterPage?.quantity_to,
        'Quantity',
      ),
    );
  }

  if (filterPage?.target_day_from || filterPage?.target_day_to) {
    listTag.push(
      labelRange(
        filterPage?.target_day_from,
        filterPage?.target_day_to,
        'Open Date',
      ),
    );
  }

  if (filterPage?.end_day_from || filterPage?.end_day_to) {
    listTag.push(
      labelRange(
        filterPage?.end_day_from,
        filterPage?.end_day_to,
        'Expire Date',
      ),
    );
  }

  if (filterPage?.status) {
    const result = filterPage?.status.map((item) => item.label).join(', ');
    listTag.push(`Status: ${result}`);
  }

  if (filterPage?.client) {
    const result = filterPage?.client.map((item) => item.label).join(', ');
    listTag.push(`Client: ${result}`);
  }

  if (filterPage?.search_consultants) {
    const result = filterPage?.search_consultants
      .map((item) => item.label)
      .join(', ');
    listTag.push(`Search Consultant: ${result}`);
  }

  if (filterPage?.candidate_flows_status) {
    const result = filterPage?.candidate_flows_status
      .map((item) => item.label)
      .join(', ');
    listTag.push(`Activity: ${result}`);
  }

  if (filterPage?.experience_level) {
    const result = filterPage?.experience_level
      .map((item) => item.label)
      .join(', ');
    listTag.push(`Experience level: ${result}`);
  }

  if (filterPage?.mapping_by) {
    const result = filterPage?.mapping_by.map((item) => item.label).join(', ');
    listTag.push(`Mapping by: ${result}`);
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

  if (filterPage?.industry_year_from || filterPage?.industry_year_to) {
    listTag.push(
      labelRange(
        filterPage?.industry_year_from,
        filterPage?.industry_year_to,
        'Year of service',
      ),
    );
  }

  if (filterPage?.salary_from || filterPage?.salary_to) {
    const result = labelSalary(
      filterPage?.salary_from,
      filterPage?.salary_to,
      filterPage?.currency?.name,
    );
    listTag.push(result);
  }

  return listTag;
};

export const changeLocalJobToParams = (local) => {
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

  const newValue = {
    page: local?.page,
    perPage: local?.perPage,
    job_id: local?.job_id,
    title: local?.title,
    quantity_from: local?.quantity_from,
    quantity_to: local?.quantity_to,
    target_day_from: local?.target_day_from,
    target_day_to: local?.target_day_to,
    end_day_from: local?.end_day_from,
    end_day_to: local?.end_day_to,
    status: local?.status?.map((item) => item.key).join(',') || undefined,
    client: local?.client?.map((item) => item.key).join(',') || undefined,
    search_consultants:
      local?.search_consultants?.map((item) => item.key).join(',') || undefined,
    candidate_flows_status:
      local?.candidate_flows_status?.map((item) => item.key).join(',') ||
      undefined,
    experience_level:
      local?.experience_level?.map((item) => item.key).join(',') || undefined,
    mapping_by:
      local?.mapping_by?.map((item) => item.key).join(',') || undefined,
    country: local?.location?.country?.key || undefined,
    city: local?.location?.city?.key || undefined,
    industry_id: local?.industry ? findIndustryId(local?.industry) : undefined,
    industry_year_from: local?.industry_year_from || undefined,
    industry_year_to: local?.industry_year_to || undefined,
    currency: local?.currency?.id || undefined,
    salary_from: local?.salary_from || undefined,
    salary_to: local?.salary_to || undefined,
  };

  const result = {};

  for (const key in newValue) {
    if (newValue[key] !== undefined) {
      result[key] = newValue[key];
    }
  }

  return result;
};

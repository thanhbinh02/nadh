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

const labelJobs = (client_jobs_from, client_jobs_to) => {
  if (client_jobs_from !== undefined && client_jobs_to === undefined) {
    const result = `Job(s): from ${client_jobs_from}`;
    return result;
  }

  if (client_jobs_from === undefined && client_jobs_to !== undefined) {
    const result = `Job(s): to ${client_jobs_to}`;
    return result;
  }

  if (client_jobs_from !== undefined && client_jobs_to !== undefined) {
    const result = `Job(s): from ${client_jobs_from} to ${client_jobs_to}`;
    return result;
  }
};

const labelUpdatedOn = (from, to) => {
  if (from !== undefined && to === undefined) {
    const result = `Updated on: from ${from}`;
    return result;
  }

  if (from === undefined && to !== undefined) {
    const result = `Updated on: to ${to}`;
    return result;
  }

  if (from !== undefined && to !== undefined) {
    const result = `Updated on: from ${from} to ${to}`;
    return result;
  }
};

export const filterTagClients = (filterPage) => {
  let listTag = [];

  if (filterPage?.client_id) {
    const result = `ID: ${filterPage.client_id}`;
    listTag.push(result);
  }

  if (filterPage?.name) {
    const result = `Trade Name: ${filterPage.name}`;
    listTag.push(result);
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

  if (filterPage?.lead_consultants) {
    const result = filterPage?.lead_consultants
      .map((item) => item.label)
      .join(', ');
    listTag.push(`Lead Consultant: ${result}`);
  }

  if (filterPage?.tax_code) {
    const result = `Tax Code: ${filterPage.tax_code}`;
    listTag.push(result);
  }

  if (filterPage?.cpa) {
    const result = filterPage?.cpa.map((item) => item.label).join(', ');
    listTag.push(`CPA: ${result}`);
  }

  if (filterPage?.industry) {
    listTag.push(labelIndustry(filterPage));
  }

  if (filterPage?.client_jobs_from || filterPage?.client_jobs_to) {
    listTag.push(
      labelJobs(
        filterPage?.client_jobs_from || undefined,
        filterPage?.client_jobs_to || undefined,
      ),
    );
  }

  if (filterPage?.type) {
    const result = filterPage?.type.map((item) => item.label).join(', ');
    listTag.push(`Type: ${result}`);
  }

  if (filterPage?.status) {
    const result = filterPage?.status.map((item) => item.label).join(', ');
    listTag.push(`Status: ${result}`);
  }

  if (filterPage?.contact_person_name) {
    const result = `Contact Person's Name: ${filterPage.contact_person_name}`;
    listTag.push(result);
  }

  if (filterPage?.contact_person_title) {
    const result = `Contact Person's Title:  ${filterPage.contact_person_title}`;
    listTag.push(result);
  }

  if (filterPage?.account_status) {
    const result = `Activity: ${filterPage?.account_status?.label}`;
    listTag.push(result);
  }

  if (filterPage?.updated_on_from || filterPage?.updated_on_to) {
    listTag.push(
      labelUpdatedOn(
        filterPage?.updated_on_from || undefined,
        filterPage?.updated_on_to || undefined,
      ),
    );
  }

  if (filterPage?.update_last_by) {
    const result = filterPage?.update_last_by
      .map((item) => item.label)
      .join(', ');
    listTag.push(`Updated by: ${result}`);
  }

  return listTag;
};

export const changeLocalClientToParams = (local) => {
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
    account_status: local?.account_status?.key || undefined,
    client_id: local?.client_id || undefined,
    client_jobs_from: local?.client_jobs_from || undefined,
    client_jobs_to: local?.client_jobs_to || undefined,
    contact_person_name: local?.contact_person_name || undefined,
    contact_person_title: local?.contact_person_title || undefined,
    cpa: local?.cpa?.map((item) => item.key).join(',') || undefined,
    lead_consultants:
      local?.lead_consultants?.map((item) => item.key).join(',') || undefined,
    country: local?.location?.country?.key || undefined,
    city: local?.location?.city?.key || undefined,
    name: local?.name || undefined,
    status: local?.status?.map((item) => item.key).join(',') || undefined,
    tax_code: local?.tax_code || undefined,
    type: local?.type?.map((item) => item.key).join(',') || undefined,
    industry_id: local?.industry ? findIndustryId(local?.industry) : undefined,
    updated_on_from: local?.updated_on_from || undefined,
    updated_on_to: local?.updated_on_to || undefined,
  };

  const result = {};

  for (const key in newValue) {
    if (newValue[key] !== undefined) {
      result[key] = newValue[key];
    }
  }

  return result;
};

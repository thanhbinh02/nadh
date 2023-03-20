import axiosClient from './axiosClient';

export const getLocations = async (params) => {
  const url = '/api/locations';
  return await axiosClient.get(url, params);
};

export const getCategories = async (params) => {
  const url = '/api/categories';
  return await axiosClient.get(url, params);
};

export const getLanguages = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getHighestDegree = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

// Custom column
export const getListCustomColumnsCandidates = async () => {
  const url = '/api/user_pages?key_page=candidates';
  return await axiosClient.get(url);
};

export const getListCustomColumns = async (name) => {
  const url = `/api/user_pages?key_page=${name}`;
  return await axiosClient.get(url);
};

export const updateListCustomColumns = async (params) => {
  const url = `/api/user_pages`;
  return await axiosClient.put(url, params);
};

export const getNationality = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getPosition = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getDegree = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getSoftSkills = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getJobFunctionsSkills = async () => {
  const url =
    '/api/property_values?property_name=functions_skills&parent_id=null';
  return await axiosClient.get(url);
};

export const getPhoneNumber = async () => {
  const url = '/api/locations?type=4';
  return await axiosClient.get(url);
};

// property_values
export const postPropertyValue = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.post(url, params);
};
// https://lubrytics.com:8443/nadh-api-crm/api/property_values?property_name=nationality

// export const getNationalityTest = async () => {
//   const url = '/api/property_values?property_name=nationality';
//   return await axiosClient.get(url);
// };

// export const postNationalityTest = createAsyncThunk(
//   'nationality/postNationality',
//   async (value) =>
//     await postPropertyValue({
//       value,
//       name: 'nationality',
//     }),
// );

export const getNationalityTest = async (value) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, {
    params: {
      value: value,
      property_name: 'nationality',
    },
  });
};

export const postNationalityTest = async (value) => {
  const url = '/api/property_values';
  return await axiosClient.post(url, {
    value: value,
    name: 'nationality',
  });
};

export const getPositionTest = async (value) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, {
    params: {
      value: value,
      property_name: 'position',
    },
  });
};

export const getSchoolTest = async (value) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, {
    params: {
      value: value,
      property_name: 'school',
    },
  });
};

export const getMajorTest = async (value) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, {
    params: {
      value: value,
      property_name: 'major',
    },
  });
};

export const getCompany = async (value) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, {
    params: {
      value: value,
      property_name: 'company',
    },
  });
};

export const getUsers = async (params) => {
  const url = '/api/users';
  return await axiosClient.get(url, params);
};

export const postPropertyValues = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.post(url, params);
};

const ACTIVE = {
  id: 1,
  key: 1,
  value: 'Active',
  label: 'Active',
};

const OFF_LIMIT = {
  id: -1,
  key: -1,
  value: 'Off-Limit',
  label: 'Off-Limit',
};

const BLACK_LIST = {
  id: -2,
  key: -2,
  value: 'Blacklist',
  label: 'Blacklist',
};

const INACTIVE = {
  id: 5,
  key: 5,
  value: 'Inactive',
  label: 'Inactive',
};

export const priority_status = [ACTIVE, OFF_LIMIT, BLACK_LIST, INACTIVE];

const RAW = { id: 1, key: 1, label: 'Raw' };
const CALL = { id: 2, key: 2, label: 'Screening Call' };
const INTERVIEW_NADH = { id: 3, key: 3, label: 'Interview with NADH' };
const SHORT_LIST = { id: 4, key: 4, label: 'Shortlisting' };
const SUBMIT_CLIENT = { id: 5, key: 5, label: 'Submit to Client' };
const INTERVIEW_CLIENT = { id: 6, key: 6, label: 'Interview with Client' };
const REFERENCE_CHECK = { id: 7, key: 7, label: 'Reference Check' };
const NEGOTIATION = { id: 8, key: 8, label: 'Negotiation' };
const OFFER_ACCEPTED = { id: 9, key: 9, label: 'Offer Accepted' };
const PLACEMENT = { id: 10, key: 10, label: 'Placement' };
const FOLLOW_UP = { id: 11, key: 11, label: 'Follow-up' };
const RE_PLACEMENT = { id: 12, key: 12, label: 'Replacement' };
const CANDIDATE_REJECT = { id: -1, key: -1, label: 'Candidate Declined' };
const NADH_REJECT = { id: -2, key: -2, label: 'Rejected by NADH' };
const CLIENT_REJECT = { id: -3, key: -3, label: 'Rejected by Client' };
const CLIENT_CANCELED = { id: -4, key: -4, label: 'Client Canceled' };

export const candidate_flow_status = [
  RAW,
  CALL,
  INTERVIEW_NADH,
  SHORT_LIST,
  SUBMIT_CLIENT,
  INTERVIEW_CLIENT,
  REFERENCE_CHECK,
  NEGOTIATION,
  OFFER_ACCEPTED,
  PLACEMENT,
  FOLLOW_UP,
  RE_PLACEMENT,
  CANDIDATE_REJECT,
  NADH_REJECT,
  CLIENT_REJECT,
  CLIENT_CANCELED,
];

export const CUSTOM_COLUMNS = {
  candidates: [
    { title: 'candidate_id', label: 'ID', disabled: true },
    { title: 'full_name', label: 'Name', disabled: true },
    { title: 'priority_status', label: 'Primary Status' },
    { title: 'languages', label: 'Languages' },
    { title: 'highest_education', label: 'Highest degree' },
    { title: 'city', label: 'City' },
    { title: 'industry', label: 'Industry' },
    { title: 'yob', label: 'YOB' },
    { title: 'flow_status', label: 'Activity' },
    { title: 'current_employments_companies', label: 'Recent companies' },
    { title: 'current_employments_positions', label: 'Recent positions' },
    { title: 'industry_years', label: 'Year of services' },
    { title: 'management_years', label: 'Year of management' },
    { title: 'updated_on', label: 'Updated on' },
    { title: 'action', label: 'Action', disabled: true },
  ],
};

export const CUSTOM_COLUMNS_CANDIDATES = [
  { title: 'candidate_id', label: 'ID', disabled: true, check: true },
  { title: 'full_name', label: 'Name', disabled: true, check: true },
  { title: 'priority_status', label: 'Primary Status', check: true }, //
  { title: 'language', label: 'Language', check: true }, //
  { title: 'highest_education', label: 'Highest degree', check: true },
  { title: 'location', label: 'City', check: true }, //
  { title: 'industry', label: 'Industry', check: true }, //
  { title: 'yob', label: 'YOB', check: true }, //
  { title: 'flow_status', label: 'Activity', check: true }, //
  { title: 'current_company', label: 'Recent companies', check: true }, //
  { title: 'current_position', label: 'Recent positions', check: true },
  { title: 'industry_years', label: 'Year of services', check: true }, //
  { title: 'management_years', label: 'Year of management', check: true }, //
  { title: 'action', label: 'Action', disabled: true, check: true },
];

export const CUSTOM_COLUMNS_CLIENTS = [
  { title: 'client_id', label: 'ID', disabled: true, check: true },
  { title: 'name', label: 'Trade Name', disabled: true, check: true },
  { title: 'location', label: 'City', check: true },
  { title: 'lead_consultants', label: 'Lead Consultant', check: true },
  { title: 'account_status', label: 'Activity', check: true },
  { title: 'tax_code', label: 'Tax Code', check: true },
  { title: 'cpa', label: 'CPA', check: true },
  { title: 'industry', label: 'Industry', check: true },
  { title: 'client_jobs', label: 'Job(s)', check: true },
  { title: 'type', label: 'Type', check: true },
  { title: 'status', label: 'Status', check: true },
  {
    title: 'contact_person_name',
    label: "Contact Person's Name",
    check: true,
  },
  {
    title: 'contact_person_title',
    label: "Contact Person's Title",
    check: true,
  },
  { title: 'update_last_by', label: 'Updated by', check: true },
  { title: 'updated_on', label: 'Updated on', check: true },
  { title: 'action', label: 'Action', disabled: true, check: true },
];

export const CUSTOM_COLUMNS_JOBS = [
  { title: 'job_id', label: 'ID', disabled: true, check: true },
  { title: 'title', label: 'Title', check: true },
  { title: 'quantity', label: 'Quantity', check: true },
  { title: 'target_date', label: 'Open Date', check: true },
  { title: 'end_date', label: 'Expire Date', check: true },
  { title: 'status', label: 'Status', check: true },
  { title: 'client', label: 'Client', check: true },
  { title: 'search_consultants', label: 'Search Consultant', check: true },
  { title: 'candidate_flows_status', label: 'Activity', check: true },
  { title: 'experience_level', label: 'Experience level', check: true },
  { title: 'mapping_by', label: 'Mapping by', check: true },
  { title: 'location', label: 'City', check: true },
  { title: 'industry', label: 'Industry', check: true },
  { title: 'industry_years', label: 'Year of service', check: true },
  { title: 'salary', label: 'Salary Range', check: true },
  { title: 'action', label: 'Action', disabled: true, check: true },
];

export const TAG_CANDIDATES = [
  {
    title: 'candidate_id',
    tag: 'ID',
  },
  {
    title: 'full_name',
    tag: 'Name',
  },
  {
    title: 'priority_status',
    tag: 'Primary Status',
  },
  {
    title: 'language',
    tag: 'Language',
  },
  {
    title: 'countryCity',
    tag: 'City',
  },
  {
    title: 'industries',
    tag: 'Industry',
  },
  {
    title: 'yob',
    tag: 'YOB',
  },
  {
    title: 'flow_status',
    tag: 'Activity',
  },
  {
    title: 'current_company_text',
    tag: 'Recent company',
  },
  {
    title: 'current_position_text',
    tag: 'Recent position',
  },
  {
    title: 'industry_years',
    tag: 'Year of services',
  },
  {
    title: 'management_years',
    tag: 'Year of management',
  },
];

export const DATES = [
  { key: '01' },
  { key: '02' },
  { key: '03' },
  { key: '04' },
  { key: '05' },
  { key: '06' },
  { key: '07' },
  { key: '08' },
  { key: '09' },
  { key: '10' },
  { key: '11' },
  { key: '12' },
  { key: '13' },
  { key: '14' },
  { key: '15' },
  { key: '16' },
  { key: '17' },
  { key: '18' },
  { key: '19' },
  { key: '20' },
  { key: '21' },
  { key: '22' },
  { key: '23' },
  { key: '24' },
  { key: '25' },
  { key: '26' },
  { key: '27' },
  { key: '28' },
  { key: '29' },
  { key: '30' },
  { key: '31' },
];

export const MONTHS = [
  {
    key: '01',
    label: 'Jan',
  },
  {
    key: '02',
    label: 'Feb',
  },
  {
    key: '03',
    label: 'Mar',
  },
  {
    key: '04',
    label: 'Apr',
  },
  {
    key: '05',
    label: 'May',
  },
  {
    key: '06',
    label: 'Jun',
  },
  {
    key: '07',
    label: 'Jul',
  },
  {
    key: '08',
    label: 'Aug',
  },
  {
    key: '09',
    label: 'Sep',
  },
  {
    key: '10',
    label: 'Oct',
  },
  {
    key: '11',
    label: 'Nov',
  },
  {
    key: '12',
    label: 'Dec',
  },
];

export const GENDERS = [
  {
    key: 1,
    label: 'Male',
  },
  {
    key: 2,
    label: 'Female',
  },
  {
    key: 3,
    label: 'Complicated',
  },
];

export const MARITAL_STATUS = [
  {
    key: 1,
    label: 'Yes',
  },
  {
    key: -1,
    label: 'No',
  },
];

// relocating_willingness
export const READY_TO_MOVE = [
  {
    key: 1,
    label: 'Yes',
  },
  {
    key: -1,
    label: 'No',
  },
  {
    key: 2,
    label: 'Available',
  },
];

export const formatDate = (dob) => {
  if (dob) {
    const dateArr = dob.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const date = dateArr[2];
    return {
      year,
      month,
      date,
    };
  } else {
    return;
  }
};

export const ACCOUNT_STATUS = [
  {
    key: 1,
    label: 'Create Client',
    color: 'geekblue',
  },
  {
    key: 2,
    label: 'Tele Marketing',
    color: 'green',
  },
  {
    key: 3,
    label: 'Client Meeting',
    color: 'magenta',
  },
  {
    key: 4,
    label: 'Proposal Sent',
    color: 'cyan',
  },
  {
    key: 5,
    label: 'Follow Up',
    color: 'orange',
  },
  {
    key: 6,
    label: 'Sign Contract',
    color: 'purple',
  },
  {
    key: 7,
    label: 'Job Order Received',
    color: 'blue',
  },
];

export const CPA = [
  {
    key: 1,
    label: 'Retained Plus',
    color: 'green',
  },
  {
    key: 2,
    label: 'Retained Minus',
    color: 'magenta',
  },
  {
    key: 3,
    label: 'New',
    color: 'blue',
  },
  {
    key: 4,
    label: 'Prospecting',
    color: 'orange',
  },
  {
    key: 5,
    label: 'Lost',
    color: 'purple',
  },
];

export const TYPE_CLIENT = [
  {
    key: 1,
    label: 'Type A',
  },
  {
    key: 2,
    label: 'Type B',
  },
  {
    key: 3,
    label: 'Type C',
  },
  {
    key: 4,
    label: 'Type D',
  },
  {
    key: 5,
    label: 'Type T',
  },
  {
    key: 6,
    label: 'Type L',
  },
];

export const STATUS_CLIENT = [
  {
    key: 9,
    label: 'Active',
    color: 'green',
  },
  {
    key: 10,
    label: 'Off-limit',
    color: 'geekblue',
  },
  {
    key: 11,
    label: 'Blacklist',
    color: 'magenta',
  },
  {
    key: 12,
    label: 'Inactive',
    color: 'red',
  },
];

export const BENEFITS = [
  {
    key: 1,
    label: 'Over x month',
    name_radio: 'benefit_over_thirteen',
    name_text: 'benefit_over_thirteen_text',
    value: -1,
  },
  {
    key: 2,
    label: 'Lunch check',
    name_radio: 'benefit_lunch_check',
    name_text: 'benefit_lunch_check_text',
    value: -1,
  },
  {
    key: 3,
    label: 'Parking check',
    name_radio: 'benefit_car_parking',
    name_text: 'benefit_car_parking_text',
    value: -1,
  },
  {
    key: 4,
    label: 'Car allowance',
    name_radio: 'benefit_car_allowance',
    name_text: 'benefit_car_allowance_text',
    value: -1,
  },
  {
    key: 5,
    label: 'Phone allowance',
    name_radio: 'benefit_phone',
    name_text: 'benefit_phone_text',
    value: -1,
  },
  {
    key: 6,
    label: 'Laptop',
    name_radio: 'benefit_laptop',
    name_text: 'benefit_laptop_text',
    value: -1,
  },
  {
    key: 7,
    label: 'Share options',
    name_radio: 'benefit_share_option',
    name_text: 'benefit_share_option_text',
    value: -1,
  },
  {
    key: 8,
    label: 'Health cover',
    name_radio: 'benefit_health_cover',
    name_text: 'benefit_health_cover_text',
    value: -1,
  },
];

export const STATUS_JOB = [
  {
    key: 1,
    label: 'Opening',
    color: 'blue',
  },
  {
    key: 2,
    label: 'Done',
    color: 'green',
  },
  {
    key: 3,
    label: 'Processing',
    color: 'geekblue',
  },
  {
    key: 4,
    label: 'Pending',
    color: 'red',
  },
  {
    key: 5,
    label: 'Replacement',
    color: 'pink',
  },
  {
    key: -1,
    label: 'Closed',
    color: 'black',
  },
  {
    key: -2,
    label: 'Cancel',
    color: 'yellow',
  },
  {
    key: -3,
    label: 'Lost',
    color: 'orange',
  },
  {
    key: -4,
    label: 'Expired',
    color: 'magenta',
  },
  {
    key: 6,
    label: 'Reopening',
    color: 'cyan',
  },
];

export const EXPERIENCE_LEVEL = [
  { key: 1, label: 'Internship Level' },
  { key: 2, label: 'Entry Level' },
  { key: 3, label: 'Associate Level' },
  { key: 4, label: 'Mid-senior Level' },
  { key: 5, label: 'Director' },
  { key: 6, label: 'Executive' },
];

export const MONEY = [
  { name: 'USD', id: 1, color: 'cyan' },
  { name: 'VND', id: 2, color: 'magenta' },
  { name: 'JPY', id: 3, color: 'blue' },
  { name: 'EUR', id: 4, color: 'purple' },
];

export const TYPE_JOB = [
  { key: 1, label: 'Full-Time' },
  { key: 2, label: 'Contract' },
  { key: 3, label: 'Part-time' },
  { key: 4, label: 'Internship' },
  { key: 5, label: 'Temporary' },
  { key: 6, label: 'Other' },
];

export const changeMoney = (value, keyFrom, keyTo) => {
  let final;
  if (keyFrom !== keyTo) {
    if (keyFrom === 1) {
      if (keyTo === 2) {
        final = (value * 23300).toFixed(1);
      }
      if (keyTo === 3) {
        final = (value * 110).toFixed(1);
      }
      if (keyTo === 4) {
        final = (value * 0.9091).toFixed(1);
      }
    }

    if (keyFrom === 2) {
      if (keyTo === 1) {
        final = (value / 23300).toFixed(1);
      }
      if (keyTo === 3) {
        final = (value * 0.00472).toFixed(1);
      }
      if (keyTo === 4) {
        final = (value * 0.00004).toFixed(1);
      }
    }

    if (keyFrom === 3) {
      if (keyTo === 1) {
        final = (value * 0.0091).toFixed(1);
      }
      if (keyTo === 2) {
        final = (value * 211.8182).toFixed(1);
      }
      if (keyTo === 4) {
        final = (value * 0.0083).toFixed(2);
      }
    }

    if (keyFrom === 4) {
      if (keyTo === 1) {
        final = (value * 1.1).toFixed(1);
      }
      if (keyTo === 2) {
        final = (value * 25630).toFixed(1);
      }
      if (keyTo === 3) {
        final = (value * 121).toFixed(1);
      }
    }
  }
  if (final === 'NaN') {
    return 0;
  } else {
    return Number(final);
  }
};

export const getKeyWithLabel = (object) => {
  const result = {
    key: parseInt(object?.key),
    label: object?.label,
  };
  return result;
};

export const changeTime = (inputDateString) => {
  const date = new Date(inputDateString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hour = String(date.getUTCHours() + 7).padStart(2, '0');
  const minute = String(date.getUTCMinutes()).padStart(2, '0');
  const second = String(date.getUTCSeconds()).padStart(2, '0');

  const outputDateString = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  return outputDateString;
};

export const getKeyWithLabelArray = (array) => {
  const result = array?.map(({ key, label, value }) => ({ key: value, label }));
  return result;
};

export const changeDate = (value) => {
  if (value) {
    let dateObj = new Date(value);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let formattedDate =
      ('0' + day).slice(-2) + '/' + ('0' + month).slice(-2) + '/' + year;
    return formattedDate;
  }
};

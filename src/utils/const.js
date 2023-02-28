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
  id: -5,
  key: -5,
  value: 'Inactive',
  label: 'Inactive',
};

export const priority_status = [ACTIVE, OFF_LIMIT, BLACK_LIST, INACTIVE];

const RAW = { id: 1, key: '1', label: 'Raw' };
const CALL = { id: 2, key: '2', label: 'Screening Call' };
const INTERVIEW_NADH = { id: 3, key: '3', label: 'Interview with NADH' };
const SHORT_LIST = { id: 4, key: '4', label: 'Shortlisting' };
const SUBMIT_CLIENT = { id: 5, key: '5', label: 'Submit to Client' };
const INTERVIEW_CLIENT = { id: 6, key: '6', label: 'Interview with Client' };
const REFERENCE_CHECK = { id: 7, key: '7', label: 'Reference Check' };
const NEGOTIATION = { id: 8, key: '8', label: 'Negotiation' };
const OFFER_ACCEPTED = { id: 9, key: '9', label: 'Offer Accepted' };
const PLACEMENT = { id: 10, key: '10', label: 'Placement' };
const FOLLOW_UP = { id: 11, key: '11', label: 'Follow-up' };
const RE_PLACEMENT = { id: 12, key: '12', label: 'Replacement' };
const CANDIDATE_REJECT = { id: -1, key: '-1', label: 'Candidate Declined' };
const NADH_REJECT = { id: -2, key: '-2', label: 'Rejected by NADH' };
const CLIENT_REJECT = { id: -3, key: '-3', label: 'Rejected by Client' };
const CLIENT_CANCELED = { id: -4, key: '-4', label: 'Client Canceled' };

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
];

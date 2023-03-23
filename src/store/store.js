import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import locationsReducer from './locationsSlice';
import categoriesReducer from './categoriesSlice';
import candidatesReducer from './candidatesSlice';
import languagesReducer from './languagesSlice';
import highestDegreeReducer from './highestDegreeSlice';
import customColumnReducer from './customColumnSlice';
import paramsCandidatesReducer from './paramsCandidatesSlice';
import tagsCandidatesReducer from './tagsCandidatesSlice';
import nationalityReducer from './nationalitySlice';
import positionReducer from './positionSlice';
import degreeReducer from './degreeSlice';
import phoneNumberReducer from './phoneNumberSlice';
import softSkillsReducer from './softSkillsSlice';
import jobFunctionsSkillsReducer from './jobFunctionsSkillsSlice';
import createCandidateReducer from './createCandidateSlice';
import businessLineReducer from './businessLineSlice';
import detailCandidateReducer from './detailCandidateSlice';
import detailCandidateLocalReducer from './detailCandidateLocalSlice';
import schoolReducer from './schoolSlice';
import clientsReducer from './clientsSlice';
import tagsClientsReducer from './tagsClientsSlice';
import usersReducer from './usersSlice';
import majorReducer from './majorSlice';
import companyReducer from './companySlice';
import fileReducer from './fileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    locations: locationsReducer,
    categories: categoriesReducer,
    candidates: candidatesReducer,
    languages: languagesReducer,
    highestDegree: highestDegreeReducer,
    customColumn: customColumnReducer,
    paramsCandidates: paramsCandidatesReducer,
    tagsCandidates: tagsCandidatesReducer,
    nationality: nationalityReducer,
    position: positionReducer,
    degree: degreeReducer,
    phoneNumber: phoneNumberReducer,
    softSkills: softSkillsReducer,
    jobFunctionsSkills: jobFunctionsSkillsReducer,
    createCandidate: createCandidateReducer,
    businessLine: businessLineReducer,
    detailCandidate: detailCandidateReducer,
    detailCandidateLocal: detailCandidateLocalReducer,
    school: schoolReducer,
    clients: clientsReducer,
    tagsClients: tagsClientsReducer,
    users: usersReducer,
    major: majorReducer,
    company: companyReducer,
    file: fileReducer,
  },
});

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
  },
});

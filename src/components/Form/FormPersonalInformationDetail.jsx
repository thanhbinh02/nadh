import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchDegree } from '../../store/degreeSlice';
import { fetchPhoneNumber } from '../../store/phoneNumberSlice';
import { fetchCountries } from '../../store/locationsSlice';
import { FormPersonalInformation } from './FormPersonalInformation';
import { fetchNationality } from '../../store/nationalitySlice';
import { fetchPosition } from '../../store/positionSlice';

const FormPersonalInformationDetail = ({
  defaultValue,
  form,
  putCandidateType,
  putCandidatePositions,
  putCandidateEmail,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const degree = useSelector((state) => state.degree.data);
  const phoneNumber = useSelector((state) => state.phoneNumber.data);
  const countries = useSelector((state) => state.locations.countries);
  const cities = useSelector((state) => state.locations.cities);
  const districts = useSelector((state) => state.locations.districts);
  const createCandidate = useSelector((state) => state.detailCandidate.user);
  const keyNationality = useSelector(
    (state) => state.nationality.keyNationality,
  );
  const keyPosition = useSelector((state) => state.position.keyPosition);

  useEffect(() => {
    dispatch(fetchNationality());
    dispatch(fetchPosition());
    dispatch(fetchDegree());
    dispatch(fetchPhoneNumber());
    dispatch(fetchCountries({ type: 4 }));
  }, []);

  return (
    <FormPersonalInformation
      form={form}
      phoneNumber={phoneNumber}
      countries={countries}
      cities={cities}
      districts={districts}
      createCandidate={createCandidate}
      keyNationality={keyNationality}
      keyPosition={keyPosition}
      degree={degree}
      defaultValue={defaultValue}
      putCandidateType={putCandidateType}
      putCandidatePositions={putCandidatePositions}
      putCandidateEmail={putCandidateEmail}
      setOpen={setOpen}
    />
  );
};
export default FormPersonalInformationDetail;

import React from 'react';
import { useParams } from 'react-router';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { fetchDetailCandidateSlice } from '../../store/detailCandidateSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CandidateDetail = () => {
  const { candidate_id } = useParams();
  const dispatch = useDispatch();
  const detailCandidate = useSelector((state) => state.detailCandidate.data);

  useEffect(() => {
    console.log(candidate_id);
    dispatch(fetchDetailCandidateSlice(candidate_id));
  }, []);

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/candidates">Candidates List</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <span>Create Candidate</span>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

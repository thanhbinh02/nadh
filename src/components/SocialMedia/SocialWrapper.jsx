import { useState } from 'react';
import { SocialItem } from './SocialItem';

export const SocialWrapper = ({ data, job_id }) => {
  const [currentData, setCurrentData] = useState(data);

  return (
    <>
      <SocialItem
        data={data}
        job_id={job_id}
        name="website"
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
      <SocialItem
        data={data}
        job_id={job_id}
        name="facebook"
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
      <SocialItem
        data={data}
        job_id={job_id}
        name="linked"
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
      <SocialItem
        data={data}
        job_id={job_id}
        name="other"
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
    </>
  );
};

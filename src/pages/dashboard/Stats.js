import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading, StatsContainer, ChartContainer } from '../../components';
import { getStats } from '../../store/allJobs/allJobsSlice';

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (state) => state.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length && <ChartContainer />}
    </>
  );
};

export default Stats;

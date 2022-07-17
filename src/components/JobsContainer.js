import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Job from './Job';
import Loading from './Loading';
import { getAllJobs } from '../store/allJobs/allJobsSlice';
import { useEffect } from 'react';
import PageBtnConatiner from './PageBtnConatiner';

const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    totalJobs,
    numOfPages,
    page,
    searchStatus,
    searchType,
    sort,
    search,
  } = useSelector((state) => state.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    dispatch(getAllJobs());
  }, [dispatch, page, searchStatus, searchType, sort, search, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs found</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnConatiner />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default JobsContainer;

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { FormRow, FormRowSelect } from '../components';
import { handleInputChange, clearValues } from '../store/allJobs/allJobsSlice';

const SearchContainer = () => {
  const { search, searchStatus, searchType, sort, sortOptions } = useSelector(
    (store) => store.allJobs
  );
  const { statusOptions, jobTypeOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputChange({ name, value }));
  };

  return (
    <Wrapper>
      <h4>search form</h4>
      <form className="form">
        <div className="form-center">
          {/* search by position */}
          <FormRow
            type="input"
            name="search"
            id="search"
            value={search}
            onChange={inputChangeHandler}
          />
          {/* search by status */}
          <FormRowSelect
            name="searchStatus"
            id="searchStatus"
            value={searchStatus}
            onChange={inputChangeHandler}
            options={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            name="searchType"
            id="searchType"
            value={searchType}
            onChange={inputChangeHandler}
            options={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            id="sort"
            value={sort}
            onChange={inputChangeHandler}
            options={sortOptions}
          />
          <button
            type="button"
            className="btn btn-danger btn-block"
            onClick={() => dispatch(clearValues())}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;
export default SearchContainer;

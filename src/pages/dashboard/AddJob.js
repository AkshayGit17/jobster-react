import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { FormRow, FormRowSelect } from '../../components';
import { handleInputChange, clearValues } from '../../store/job/jobSlice';

const AddJob = () => {
  const {
    company,
    position,
    jobLocation,
    status,
    statusOptions,
    jobType,
    jobTypeOptions,
  } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!company || !position || !jobLocation) {
      toast.error('please fill out all fields');
      return;
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleInputChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onFormSubmit}>
        <h3></h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="company"
            id="company"
            value={company}
            onChange={onInputChange}
          />
          <FormRow
            type="text"
            name="position"
            id="position"
            value={position}
            onChange={onInputChange}
          />
          <FormRow
            type="text"
            name="jobLocation"
            id="jobLocation"
            value={jobLocation}
            labelText="job location"
            onChange={onInputChange}
          />
          <FormRowSelect
            name="status"
            id="status"
            value={status}
            onChange={onInputChange}
            options={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            id="jobType"
            value={jobType}
            onChange={onInputChange}
            options={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => {
                dispatch(clearValues());
              }}
            >
              clear
            </button>
            <button type="submit" className="btn btn-block submit-btn">
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default AddJob;

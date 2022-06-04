import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { FormRow } from '../../components';
import { updateUser } from '../../store/userSlice';

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((userData) => {
      return { ...userData, [name]: value };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, location } = userData;
    if (!name || !email || !location) {
      toast.error('please fill out all fields');
      return;
    }
    dispatch(updateUser(userData));
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onFormSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={onInputChange}
          />
          <FormRow
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={onInputChange}
          />
          <FormRow
            type="text"
            name="location"
            id="location"
            value={userData.location}
            onChange={onInputChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'please wait...' : 'save changes'}
          </button>
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

export default Profile;

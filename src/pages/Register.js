import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { Logo, FormRow } from '../components';
import { registerUser, loginUser } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => {
      return {
        ...values,
        [name]: value,
      };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('please fill out all fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues((values) => {
      return {
        ...values,
        isMember: !values.isMember,
      };
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onFormSubmit}>
        <Logo />
        <h3>{values.isMember ? 'login' : 'register'}</h3>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={onInputChange}
            labelText="name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={onInputChange}
          labelText="email"
        />
        <FormRow
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={onInputChange}
          labelText="password"
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;

import { useState } from 'react';
import styled from 'styled-components';
import { Logo } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const onChangeHandler = (e) => {
    console.log(e.target);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmitHandler}>
        <Logo />
        <h3>login</h3>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-input"
            value={values.name}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
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

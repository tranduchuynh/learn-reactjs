import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';

Register.propTypes = {

};

function Register(props) {

  const handleSubmit = (values) => {
    console.log('Form sumbit:', values)
  }

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
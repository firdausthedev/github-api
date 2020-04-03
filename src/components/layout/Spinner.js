//rafce
import React from 'react';
import spinner from './spinner.gif';
const Spinner = () => (
  <React.Fragment>
    <img src={spinner} alt='Loading...' style={loadingStyle} />
  </React.Fragment>
);

const loadingStyle = {
  width: '200px',
  margin: 'auto',
  display: 'block'
};

export default Spinner;

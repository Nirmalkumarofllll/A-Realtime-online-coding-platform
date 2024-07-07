import React from 'react';
import { Rings } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <Rings
      visible={true}
      height="80"
      width="80"
      color="#20b2aa"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Spinner;

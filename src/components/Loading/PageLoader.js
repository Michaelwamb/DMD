import React from 'react';
import { Spinner } from 'reactstrap';
import './Loading.css';

const PageLoader = () => {
  return (
    <div className="fp-container">
      <Spinner style={{ width: '20px', height: '20px', color: '#585757a3' }} />
    </div>
  );
};

export default PageLoader;

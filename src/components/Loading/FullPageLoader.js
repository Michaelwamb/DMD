import React, { useState } from 'react';
import PageLoader from './PageLoader';

const FullPageLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <PageLoader /> : null,
    () => setLoading(true),
    () => setLoading(false)
  ];
};

export default FullPageLoader;

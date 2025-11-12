import React from 'react';
import { Button } from 'react-bootstrap';

const BackToTop = () => {
  return (
    <Button href="#" className="btn btn-primary btn-lg-square back-to-top">
      <i className="bi bi-arrow-up"></i>
    </Button>
  );
};

export default BackToTop;
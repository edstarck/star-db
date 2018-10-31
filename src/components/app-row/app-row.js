import React from 'react';

import './app-row.css';

const Row = ({ left, right }) => {
  return (
    <div className="row mb2">
      <aside className="col-md-6">{left}</aside>
      <article className="col-md-6">{right}</article>
    </div>
  );
};

export default Row;

import React from 'react';
import { HeadingWrapper } from '../Styles/Styles';

const Heading = ({ title = '', subtitle = '' }) => {
  return (
    <HeadingWrapper>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </HeadingWrapper>
  );
};

export default Heading;

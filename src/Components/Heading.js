import React from 'react';
import { HeadingWrapper } from '../Styles/Styles';

const Heading = (props) => {
  return (
    <HeadingWrapper>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </HeadingWrapper>
  );
};

export default Heading;

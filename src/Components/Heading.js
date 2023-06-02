import React from 'react';
import styled from 'styled-components';

const Heading = () => {
  return (
    <Wrapper>
      <h1> The n-puzzle</h1>
      <p>Re-organize the numbers in ascending order</p>
    </Wrapper>
  );
};

export default Heading;

const Wrapper = styled.div`
  max-width: 80%;
`;

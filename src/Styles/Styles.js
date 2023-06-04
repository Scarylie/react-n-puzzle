import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  max-heigth: 1vh;
`;
export const HeadingWrapper = styled.div`
  max-width: 60%;
`;
export const WinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(133, 233, 156);
  background: linear-gradient(
    45deg,
    rgba(133, 233, 156, 1) 0%,
    rgba(9, 124, 139, 1) 35%,
    rgba(106, 9, 121, 1) 100%
  );
`;

export const GameWrapper = styled.div`
  display: grid;
  grid-template-row: repeat(auto-fit, minmax(2em, 1fr));
  grid-gap: 1px;
  margin: 0 auto;
  padding: 25px 0;
`;

export const ShuffleWrapper = styled.div`
  margin: 10px;
`;

export const Button = styled.button`
  font-size: 25px;
  margin: 1px;
  background-color: pink;
  border-radius: 10px;
  cursor: pointer;
  width: 70px;
  height: 70px;

  &:hover {
    border-color: pink;
  }
`;

export const NumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

export const EmptyButton = styled(Button)`
  visibility: hidden;
`;

export const ShuffleButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  box-shadow: 0 0 10px grey;
  cursor: pointer;
  color: grey;

  &:hover {
    background-color: white;
    color: black;
    box-shadow: 0 0 10px pink;
  }
`;

import styled from 'styled-components';

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
  max-width: 100%;
  display-flex;
`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 25px;
  margin: 1px;
  background-color: pink;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: grey;
    border-color: pink;
  }
`;

export const EmptyButton = styled(Button)`
  visibility: hidden;
`;

export const ShuffleButton = styled.button`
  margin: 10px auto;
  background-color: inherit;
  color: grey;
  font-size: 40px;
  cursor: pointer;
  border: none;
  padding: 0;

  &:hover {
    font-size: 42px;
    color: white;
  }
`;

export const ReplayButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border-color: pink;
  }
`;

import styled from "styled-components";

export const AppButton = styled.button`
  background-color: #85fae2;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  color: black;
  outline: none;
  height: 32px;
  width: 80px;
  
  :hover {
    cursor: pointer;
    background-color: #09d3ac;
    }

  :active,
  :active:hover,
  :active:focus {
    background-color: #08c49e;
    }
`;

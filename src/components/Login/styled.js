import styled from "styled-components";

export const LoginStyled = styled.div`
  border: 1px solid #ccc;
  padding: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 600px;
  margin: 0 auto;
  .Login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .input_text {
      width: 250px;
    }
  }
  @media screen and (max-width: 600px) {
    border: 1px solid #ccc;
    padding: 100px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    max-width: 300px;
    margin: 0 auto;
    .Login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      .input_text {
        width: 250px;
      }
    }
  }
`;

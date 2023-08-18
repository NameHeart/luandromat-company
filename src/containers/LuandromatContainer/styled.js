import styled from "styled-components";

export const LuandromatContainerStyled = styled.div`
  padding: 30px;
  .LuandromatContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .login_container {
    padding-top: 30px;
  }

  .coin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    max-width: 1200px;
  }
  .washing-machines {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center; /* จัดกลางแนวนอน */
  }
  @media screen and (max-width: 600px) {
    padding: 30px;
    .LuandromatContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .login_container {
      padding-top: 30px;
    }

    .coin-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      max-width: 1200px;
    }
    .washing-machines {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center; /* จัดกลางแนวนอน */
    }
  }
`;

import styled from "styled-components";

export const WashingMachineStyled = styled.div`
  .washin-machine {
    margin: 10px;
    width: 300px;
  }
  .washing-machine-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    gap: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 200px;
  }
  .cardimage {
    height: 150px;
    width: 200px;
  }

  .button {
    width: 150px;
    height: 40px;
    font-size: 18px;
  }

  .card-header {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .available {
    border-color: #4caf50;
  }

  .occupied {
    border-color: #f44336;
  }
  @media screen and (max-width: 600px) {
    .washin-machine {
      margin: 10px;
      width: 500px;
    }
    .washing-machine-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
    }

    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      gap: 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      width: 130px;
      font-size: 12px;
    }
    .cardimage {
      height: 80px;
      width: auto;
    }

    .button {
      width: 100px;
      height: 40px;
      font-size: 10px;
    }

    .card-header {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .available {
      border-color: #4caf50;
    }

    .occupied {
      border-color: #f44336;
    }
  }
`;

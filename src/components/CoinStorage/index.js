import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { CoinStorageStyled } from "./styled";

const CoinStorage = ({ onAddCoins, totalCoins, onResetCoins }) => {
  const handleAddOneCoin = () => {
    onAddCoins(1); // เพิ่ม 1 เหรียญ
    const newTotalCoins = totalCoins + 1;
    localStorage.setItem("totalCoins", newTotalCoins); // บันทึกข้อมูลใน Local Storage
  };

  return (
    <CoinStorageStyled>
      <div className="coin-storage">
        <h2>จำนวนเหรียญที่มี: {totalCoins}</h2>
        <div className="coin-buttons">
          <Button variant="success" onClick={handleAddOneCoin}>
            เพิ่ม Coin
          </Button>
          <Button variant="outline-warning" disabled={!totalCoins} onClick={onResetCoins}>
            รีเซ็ต Coin
          </Button>
        </div>
      </div>
    </CoinStorageStyled>
  );
};

export default CoinStorage;

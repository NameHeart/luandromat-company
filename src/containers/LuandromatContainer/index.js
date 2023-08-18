// App.js
import React, { useState, useEffect } from "react";
import WashingMachine from "../../components/WashingMachine";
import CoinStorage from "../../components/CoinStorage";
import Login from "../../components/Login";
import { LuandromatContainerStyled } from "./styled";
import Button from "react-bootstrap/Button";

const LuandromatContainer = () => {
  const [washingMachines, setWashingMachines] = useState([
    { id: 1, isAvailable: true, status: "online", image: "/images/laundry1.jpg" },
    { id: 2, isAvailable: true, status: "online", image: "/images/laundry2.jpg" },
    { id: 3, isAvailable: true, status: "offline", image: "/images/laundry3.jpg" },
    { id: 4, isAvailable: true, status: "online", image: "/images/laundry2.jpg" },
    { id: 5, isAvailable: true, status: "online", image: "/images/laundry3.jpg" },
    { id: 6, isAvailable: true, status: "online", image: "/images/laundry1.jpg" },
    { id: 7, isAvailable: true, status: "online", image: "/images/laundry3.jpg" },
    { id: 8, isAvailable: true, status: "online", image: "/images/laundry2.jpg" },
    { id: 9, isAvailable: true, status: "offline", image: "/images/laundry1.jpg" },
    { id: 10, isAvailable: true, status: "online", image: "/images/laundry2.jpg" },
    // เพิ่มเครื่องซักผ้าเพิ่มเติมตามต้องการ
  ]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูลผู้ใช้เข้าสู่ระบบอยู่หรือไม่
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem("username", user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("username");
  };

  const handleCoinDrop = () => {
    setTotalCoins(totalCoins - 1);

    localStorage.setItem("totalCoins", totalCoins - 1);

    // ตรวจสอบเวลาถอยหลัง และส่งสัญญาณไปยังกลุ่มไลน์ (ถ้าจำเป็น)
    setTimeout(() => {
      // ตรวจสอบเวลาอีกครั้งและส่งสัญญาณไปยังกลุ่มไลน์
    }, 60000);
  };

  useEffect(() => {
    // อ่านข้อมูลจาก Local Storage
    const storedTotalCoins = localStorage.getItem("totalCoins");
    if (storedTotalCoins !== null) {
      setTotalCoins(parseInt(storedTotalCoins)); // อัปเดตจำนวนเหรียญใน state
    }
  }, []);

  const handleWashingComplete = (machineId) => {
    // ทำการปรับสถานะเครื่องซักผ้าเมื่อซักเสร็จ
    const updatedMachines = washingMachines.map((machine) => (machine.id === machineId ? { ...machine, isAvailable: true } : machine));
    setWashingMachines(updatedMachines);
  };

  const handleAddCoins = (amount) => {
    const newTotalCoins = totalCoins + amount;
    setTotalCoins(newTotalCoins);

    // บันทึกข้อมูลใน Local Storage
    localStorage.setItem("totalCoins", newTotalCoins);
  };
  const handleResetCoins = () => {
    setTotalCoins(0); // รีเซ็ตจำนวนเหรียญใน state

    // บันทึกข้อมูลใน Local Storage
    localStorage.setItem("totalCoins", 0);
  };

  return (
    <LuandromatContainerStyled>
      <div className="LuandromatContainer">
        <h1>Luandromat Company</h1>
        {isLoggedIn ? (
          <div className="coin-container">
            <CoinStorage onAddCoins={handleAddCoins} totalCoins={totalCoins} onResetCoins={handleResetCoins} />
            <Button variant="danger" onClick={handleLogout}>
              ออกจากระบบ
            </Button>
            <div className="washing-machines">
              {washingMachines.map((machine) => (
                <WashingMachine
                  key={machine.id}
                  id={machine.id}
                  isAvailable={machine.isAvailable}
                  coins={machine.coins}
                  status={machine.status}
                  image={machine.image}
                  onSelect={handleCoinDrop}
                  onAddCoin={handleAddCoins}
                  totalCoins={totalCoins}
                  onWashingComplete={handleWashingComplete}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="login_container">
            <Login onLogin={handleLogin} />
          </div>
        )}
      </div>
    </LuandromatContainerStyled>
  );
};

export default LuandromatContainer;

import React, { useState, useEffect } from "react";
import "./styled.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { WashingMachineStyled } from "./styled";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WashingMachine = ({ id, isAvailable, onSelect, totalCoins, status, image }) => {
  const [machineSelected, setMachineSelected] = useState(false);
  const [coinDropped, setCoinDropped] = useState(false);
  const [washing, setWashing] = useState(false);
  const [countdown1, setCountdown1] = useState(10);
  const [countdown2, setCountdown2] = useState(120);

  const handleMachineSelect = () => {
    if (status === "online") {
      setMachineSelected(true);
    }
  };

  const handleCoinDrop = () => {
    if (machineSelected && !coinDropped && status === "online") {
      setCoinDropped(true);
      setCountdown1(10);
      onSelect(id);
      setTimeout(() => {
        setWashing(true);
        setCoinDropped(false);
        toast.info("กำลังเริ่มซักผ้า");
        sendMessage("ส่งสัญญาณไปยังกลุ่มไลน์เนื่องจากเหลือเวลาน้อยกว่า 60 วินาที");

        localStorage.setItem("countdown2", 120);
        localStorage.setItem("coinDropped", false);
        localStorage.setItem("Washing", true);
        localStorage.setItem("countdown1", 10);
      }, 10000);
    }
  };

  function sendMessage() {
    const accessToken =
      "FtwzWrclUvtSQpgV8FbkxMn1XRdAB0DclgzE5+QzVOt1FTOvPS5BPC0hLuvrMjo0a6Ixg09bE5yn50rcL5CkK1b7aBQpWkd1Olg+bFCRH6/lqQWQMueE/MoYhNdMOP29Yf3t1OOjNKlCNsja7LjzigdB04t89/1O/w1cDnyilFU="; // Replace with your actual Bearer Token

    const messageData = {
      to: "Uf0f29d578a2e0e376bb85818a3ed71df",
      messages: [
        {
          type: "text",
          text: "Hello, world1",
        },
        {
          type: "text",
          text: "Hello, world2",
        },
      ],
    };

    axios
      .post("https://api.line.me/v2/bot/message/push", messageData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Message sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }

  useEffect(() => {
    // อ่านค่า countdown2 จาก Local Storage
    const storedCountdown2 = localStorage.getItem("countdown2");
    if (storedCountdown2 !== null) {
      setCountdown2(parseInt(storedCountdown2));
      if (washing && parseInt(storedCountdown2) === 0) {
        setWashing(false);
      }
    }
  }, []);

  useEffect(() => {
    // เมื่อสถานะของเครื่องซักผ้าเป็น "offline" ให้ปิดใช้งานปุ่ม
    if (status === "offline") {
      setMachineSelected(false);
    }
  }, [status]);

  useEffect(() => {
    let interval1;

    if (coinDropped && countdown1 > 0) {
      interval1 = setInterval(() => {
        setCountdown1((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(interval1);
    }

    return () => {
      clearInterval(interval1);
    };
  }, [coinDropped, countdown1]);

  useEffect(() => {
    let interval2;

    if (washing && countdown2 > 0) {
      interval2 = setInterval(() => {
        setCountdown2((prevCountdown) => {
          return prevCountdown - 1;
        });
      }, 1000);
    } else if (washing && countdown2 === 0) {
      setWashing(false);
      setMachineSelected(false);
      toast.success("ซักผ้าเสร็จสิ้น");
    }

    return () => {
      clearInterval(interval2);
    };
  }, [washing, countdown2]);

  useEffect(() => {
    // ตรวจสอบสถานะการซักผ้าและ countdown2 เพื่อแสดงผลถ้ามีค่าที่ต้องการ
    if (washing && countdown2 > 0) {
      setMachineSelected(true);

      // ตรวจสอบเงื่อนไขสำหรับการส่งข้อความไปยัง Line
      if (countdown2 <= 60) {
        sendMessage("ส่งสัญญาณไปยังกลุ่มไลน์เนื่องจากเหลือเวลาน้อยกว่า 60 วินาที");
      }
    }
  }, [washing, countdown2]);

  return (
    <WashingMachineStyled>
      <div className="washing-machine-container">
        <div className={`washing-machine ${isAvailable ? "available" : "occupied"}`}>
          <Card className="card">
            <Card.Img className="cardimage" variant="top" src={image} />
            <Card.Body>
              <Card.Text>เครื่องซักผ้ารหัส {id}</Card.Text>
              <Card.Text>สถานะ: {status}</Card.Text>
              {machineSelected && (
                <div className="card-content">
                  {washing ? (
                    <div>
                      <p>กำลังซักผ้า...</p>
                      <p>เหลือเวลา: {countdown2}</p>
                    </div>
                  ) : (
                    <Button className="button" variant="outline-info" disabled={coinDropped || washing} onClick={handleCoinDrop}>
                      {" "}
                      {coinDropped ? `เหลือเวลา: ${countdown1}` : "หยอดเหรียญ"}
                    </Button>
                  )}
                </div>
              )}
              {!machineSelected && (
                <>
                  {totalCoins <= 0 ? (
                    <div>
                      <p>กรุณาเติม Coin ก่อนใช้งาน</p>
                    </div>
                  ) : (
                    <div className="card-content">
                      <Button variant="primary" className="button" disabled={coinDropped || washing || status === "offline"} onClick={handleMachineSelect}>
                        เลือกเครื่องซักผ้า
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </div>

        <ToastContainer />
      </div>
    </WashingMachineStyled>
  );
};

export default WashingMachine;

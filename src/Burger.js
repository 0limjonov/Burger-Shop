import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import Menu from "./Components/Menu";
import { toPng } from "html-to-image";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Burger = ({ data, setData }) => {
  // JAVASCRIPT part start

  // VARIABLES START
  
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const burgerData = JSON.parse(localStorage.getItem("burger")) || [];
  const getBurger = JSON.parse(localStorage.getItem("burger")) || [];
  const [formdata, setFormdata] = useState({
    ism: "",
    tel: "",
    
  });
  // VARIABLES END

  const handleScreenshot = useCallback(() => {
    toPng(ref.current)
      .then(async (dataUrl) => {
        try {
          // Convert dataUrl to Blob object
          const blob = await fetch(dataUrl).then(res => res.blob());
          
          const token = "7046532538:AAEvXetjmN0GrXV3_wqoCDT-Y_RbxvxXkNs";
          const chatId = "@burger_channel_amaliyot";
          const formData = new FormData();
          formData.append("chat_id", chatId);
          formData.append("photo", blob, "menu.png");
          
          await axios.post(`https://api.telegram.org/bot${token}/sendPhoto`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
        } catch (error) {
          console.error("Error sending image to Telegram:", error);
        }
      })
      .catch((err) => {
        console.error("Error converting screenshot to image:", err);
      });
  }, [ref]);
  
  

  // AGAR MALUMOT BO'LMASA EKRANGA SO'Z QAYTARADI
  if (burgerData.length === 0) {
    return (
      <div className="noneProduct">
        <p>No products have been added yet :(</p>
      </div>
    );
  }
  // PLUS FUNCTION START
  function plus(id, index) {
    burgerData.map((item) => {
      if (item.id === id) {
        item.count++;
        localStorage.setItem("burger", JSON.stringify(burgerData));
      }
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }
  // PLUS FUNCTION END

  // MINUS FUNCTION START

  function minus(id) {
    burgerData.map((item) => {
      if (item.id === id) {
        if (item.count > 0) {
          item.count--;
          localStorage.setItem("burger", JSON.stringify(burgerData));
        }
      }
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }

  // MINUS FUNCTION END

  // JAVASCRIPT part end

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    handleScreenshot();
    e.preventDefault();

    if (formdata.ism.trim() === "" || formdata.tel.trim() === "") {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    try {
      const token = "7046532538:AAEvXetjmN0GrXV3_wqoCDT-Y_RbxvxXkNs";
      const chatId = "@burger_channel_amaliyot";
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: `Burger \nIsmi: ${formdata.ism}\nTelefon raqam: ${formdata.tel}\nmiqdori: ${formdata.son}\nnarxi: ${formdata.narx}\nnomi: ${formdata.nomi}`,
      });

      setFormdata({
        ism: "",
        tel: "",
      });
      toast.success("Ma'lumotlar muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("xatolik yuz berdi:", error);
      toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi");
    }
  };

  const handleCloseClick = () => {
    setFormdata({
      ism: "",
      tel: "",
    });
    document.querySelector(".burger-cart").style.zIndex = -1;
  };

  return (
    // HTML part start
    <>
    <ToastContainer/>
      <div className="burgerPage">
        {burgerData.map((item, index) => {
          return (
            <div className="card" key={index}>
              <div className="title">
                <b> {item.name}</b>
                <p>narxi: {item.price}</p>
                <p>soni: {item.count} </p>
                <p>umumiy narxi: {item.count * item.price}</p>
              </div>
              <img src={item.image} alt={item.name} />
              <div className="count">
                <button onClick={(id) => plus(item.id)}>+</button>
                <button onClick={(id) => minus(item.id)}>-</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="checkout-burger">
        {getBurger.map((item, index) => {
          if (item.count > 0) {
            return (
              <div className="order-burger" key={index}>
                <span>Nomi: {item.name}</span>
                <span>Soni: {item.count}</span>
                <span>Narxi: {item.price * item.count}</span>
                <button
                  onClick={() => {
                    document.querySelector(".burger-cart").style.zIndex = 1;
                    setFormdata({
                      ...formdata,
                      nomi: item.name,
                      narx: item.price * item.count,
                      son: item.count,
                    });
                  }}
                >
                  Buyurtma berish
                </button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <div className="burger-cart" ref={ref}>
        <form onSubmit={handleSubmit}>
          <h1>Burger</h1>
          <label>
            <input
              type="text"
              name="ism"
              placeholder="Ismingizni kiriting"
              value={formdata.ism}
              onChange={handlechange}
            />
          </label>
          <label>
            <input
              type="number"
              name="tel"
              placeholder="Raqamingizni kiriting"
              value={formdata.tel}
              onChange={handlechange}
            />
          </label>

          <span>Nomi: {formdata.nomi}</span>
          <span>Narxi: {formdata.narx}</span>
          <span>Soni: {formdata.son}</span>
          <button
            type="submit"
            onClick={() =>
              (document.querySelector(".burger-cart").style.zIndex = -1)
            }
          >
            Yuborish
          </button>
          <button type="button" onClick={handleCloseClick}>
            Yopish
          </button>
        </form>
      </div>

      <Menu />
    </>

    // HTML part end
  );
};

export default Burger;

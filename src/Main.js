// IMPORTS START

import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, Link } from "react-router-dom";

import logo from "./logo.png";
import Burger from "./Burger";
import Drink from "./Drink";
import Sweet from "./Sweet";
import Input from "./Input";

// IMPORTS END

const Main = ({
  sweetData,
  setSweetData,
  drinkData,
  setDrinkData,
  burgerData,
  setBurgerData,
}) => {
  // VARIABLES START

  // const [totalPrice, setTotalPrice] = useState(0);

  const [data, setData] = useState({});

  useEffect(() => {
    burgerData.map((item) => {
      return item.count > 0 ? setData(item) : setData(null);
    });
  }, [burgerData]);
  useEffect(() => {
    drinkData.map((item) => {
      return item.count > 0 ? setData(item) : setData(null);
    });
  }, [drinkData]);
  useEffect(() => {
    sweetData.map((item) => {
      return item.count > 0 ? setData(item) : setData(null);
    });
  }, [sweetData]);

  // VARIABLES END

  // SUBMIT FUNKSIYA START

  // SUBMIT FUNKSIYA END

  // /TOTAL PRICE CHIQARADIGAN START
  // useEffect(() => {
  //   function total() {
  //     const categories = ["burger", "drink", "sweet"];
  //     let total = 0;
  //     categories.forEach((item) => {
  //       const data = JSON.parse(localStorage.getItem(item)) || [];
  //       data.forEach((item) => {
  //         total += item.count * item.price;
  //       });
  //     });
  //     setTotalPrice(total);
  //   }

  //   total();
  // }, []);

  // /TOTAL PRICE CHIQARADIGAN END

  return (
    // wrapper start
    <div className="wrapper">
      {/* sitebar start */}
      <div className="sitebar">
        <a href="/" className="logo">
          <img src={logo} alt="" />
          <p>Burger Cafe</p>
        </a>
        <div className="links">
          <NavLink activeClassName="active" to="/">
            Burgers
          </NavLink>
          <NavLink activeClassName="active" to="/drink">
            Drinks
          </NavLink>
          <NavLink activeClassName="active" to="/sweet">
            Sweets
          </NavLink>
        </div>

        <Link className="modal" to="/input">
          Add New
        </Link>
      </div>
      {/* sitebar end */}

      {/* komponents start */}
      <Routes>
        <Route
          path="/"
          element={<Burger data={burgerData} setData={setBurgerData} />}
        />
        <Route
          path="/drink"
          element={<Drink data={drinkData} setData={setDrinkData} />}
        />
        <Route
          path="/sweet"
          element={<Sweet data={sweetData} setData={setSweetData} />}
        />
        <Route path="/input" element={<Input />} />
      </Routes>

      {/* komponents end */}
    </div>
    // wrapper end
  );
};

export default Main;

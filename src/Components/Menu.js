import React, { useCallback } from "react";
// import { toPng } from "html-to-image";

function Menu() {
  // const ref = useRef();
  const burgerData = JSON.parse(localStorage.getItem("burger")) || [];
  const drinkData = JSON.parse(localStorage.getItem("drink")) || [];
  const sweetData = JSON.parse(localStorage.getItem("sweet")) || [];

  // const handleScreenshot = useCallback(() => {
  //   toPng(ref.current)
  //     .then((dataUrl) => {
  //       console.log(dataUrl);
  //       const link = document.createElement("a");
  //       link.download = "menu.png";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [ref]);

  return (
    <div className="menu" >
      {burgerData.map((item, id) => {
        if (item.count > 0) {
          return (
            <div className="menuTitle" key={id}>
              <b>nomi: {item.count > 0 ? item.name : ""}</b>
              <h3>soni: {item.count > 0 ? item.count : ""} </h3>
              <p>
                umumiy narxi: {item.count > 0 ? item.count * item.price : ""}
              </p>
            </div>
          );
        } else {
          return "";
        }
      })}
      {drinkData.map((item, id) => {
        if (item.count > 0) {
          return (
            <div className="menuTitle" key={id}>
              <b>nomi: {item.count > 0 ? item.name : ""}</b>
              <h3>soni: {item.count > 0 ? item.count : ""} </h3>
              <p>
                umumiy narxi: {item.count > 0 ? item.count * item.price : ""}
              </p>
            </div>
          );
        } else {
          return "";
        }
      })}
      {sweetData.map((item, id) => {
        if (item.count > 0) {
          return (
            <div className="menuTitle" key={id}>
              <b>nomi: {item.count > 0 ? item.name : ""}</b>
              <h3>soni: {item.count > 0 ? item.count : ""} </h3>
              <p>
                umumiy narxi: {item.count > 0 ? item.count * item.price : ""}
              </p>
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
}

export default Menu;

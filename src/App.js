import React, { useState } from "react";

import Main from "./Main";

function App() {
  const [sweetData, setSweetData] = useState(
    JSON.parse(localStorage.getItem("sweet")) || []
  );
  const [drinkData, setDrinkData] = useState(
    JSON.parse(localStorage.getItem("drink")) || []
  );
  const [burgerData, setBurgerData] = useState(
    JSON.parse(localStorage.getItem("burger")) || []
  );

  return (
    <div className="App">
      <Main
        sweetData={sweetData}
        setSweetData={setSweetData}
        drinkData={drinkData}
        setDrinkData={setDrinkData}
        burgerData={burgerData}
        setBurgerData={setBurgerData}
      />
    </div>
  );
}

export default App;

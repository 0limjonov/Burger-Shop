import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Input = () => {
  const image = useRef();
  const name = useRef();
  const price = useRef();
  const [category, setCategory] = useState("burger");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      image.current.value === "" ||
      name.current.value === "" ||
      price.current.value === ""
    ) {
      alert("Please fill out all fields");
    } else {
      const key = category.toString();
      const data = JSON.parse(localStorage.getItem(key)) || [];
      const collector = {
        image: image.current.value,
        name: name.current.value,
        price: price.current.value,
        count: 0,
        id: Date.now(),
      };
      data.push(collector);
      localStorage.setItem(key, JSON.stringify(data));
      image.current.value = "";
      name.current.value = "";
      price.current.value = "";
    }
    navigate(category === "burger" ? "/" : "/" + category);
  }
  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <input ref={image} type="text" placeholder="Image" />
        <input ref={name} type="text" placeholder="Name" />
        <input ref={price} min={0} type="number" placeholder="Price" />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="burger">Burgers</option>
          <option value="drink">Drinks</option>
          <option value="sweet">Sweets</option>
        </select>
        <button>Add</button>
      </form>
    </div>
  );
};

export default Input;

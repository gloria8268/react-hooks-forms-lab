import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedName, setSelectedName] = useState("");

  const [itemArray, setArray] = useState([])

  function handleItemFormSubmit(newItem) {
    setArray([...itemArray, newItem]);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(event) {
    setSelectedName(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    const lowercaseSearchText = selectedName.toLowerCase();
    const lowercaseItemName = item.name.toLowerCase();

    if (selectedCategory === "All") return lowercaseItemName.includes(lowercaseSearchText);
    return item.category === selectedCategory && lowercaseItemName.includes(lowercaseSearchText);
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchTextChange={handleSearchChange}  />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

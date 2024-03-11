// ShoppingListWithImmer.js
import React, { useState } from 'react';
import { useImmer } from 'use-immer';

export default function ShoppingListWithImmer() {
  // Initialize the shopping list state with useImmer
  const [shoppingList, setShoppingList] = useImmer([]);

  // State for the input fields
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  // Adds a new item to the shopping list
  function addItem() {
    setShoppingList(draft => {
      draft.push({
        id: Date.now(), // Simple ID generation for demo purposes
        name: name,
        quantity: quantity,
        details: {
          category: category,
          notes: notes,
        },
      });
    });
    // Clear input fields after adding an item
    setName('');
    setQuantity('');
    setCategory('');
    setNotes('');
  }

  // Updates an existing item's attributes
  function updateItem(id, newName, newQuantity, newCategory, newNotes) {
    setShoppingList(draft => {
      const item = draft.find(item => item.id === id);
      if (item) {
        item.name = newName;
        item.quantity = newQuantity;
        item.details.category = newCategory;
        item.details.notes = newNotes;
      }
    });
  }

  // Removes an item from the shopping list by id
  function removeItem(id) {
    setShoppingList(draft => {
      return draft.filter(item => item.id !== id);
    });
  }

  // Handle input changes
  const handleInputChange = (e, setter) => setter(e.target.value);

  // Render the shopping list and form for adding new items
  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          value={name}
          onChange={e => handleInputChange(e, setName)}
          placeholder="Item name"
        />
        <input
          value={quantity}
          onChange={e => handleInputChange(e, setQuantity)}
          placeholder="Quantity"
        />
        <input
          value={category}
          onChange={e => handleInputChange(e, setCategory)}
          placeholder="Category"
        />
        <input
          value={notes}
          onChange={e => handleInputChange(e, setNotes)}
          placeholder="Notes"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
}

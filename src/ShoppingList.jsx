import React, { useState } from "react";

function ShoppingList() {

    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [isToggle, setIsToggle] = useState({});
    const [hovered, setHovered] = useState({});

    function handleInputChange(event) {
        setNewItem(event.target.value);

    }

    function addItem() {
        if(newItem.trim() === "") return;

        const newItemObj = {
            id: Date.now(),
            name:newItem,
        };

        setList(l => [...l , newItemObj]);
        setNewItem("");
    }

    function deleteItem(id) {
        setList(l => l.filter(item => item.id !== id));

        setIsToggle(t => {
            const updatedToggle = {...t};
            delete updatedToggle[id];
            return updatedToggle;
        });

        setHovered(h => {
            const updatedHovered = {...h};
            delete updatedHovered[id];
            return updatedHovered;
        });
    }

    function toggle(id) {
        setIsToggle(t => ({
            ...t, [id]: !t[id],
        }));
    }

    function handleMouseEnter(id) {
        setHovered(h => ({
            ...h, [id]: true,
        }));
    }

    function handleMouseLeave(id) {
        setHovered(h => ({
            ...h, [id]: false,
        }));
    }

    console.log(isToggle);
    console.log(hovered);

    return (
        <>
            <div className="container">
                <h1>Shopping List</h1>

                <input type="text"
                    onChange={handleInputChange}
                    placeholder="Enter item..."
                    value={newItem} />

                <button onClick={addItem}
                    className="add-button">
                    Add
                </button>

                <div className="list-container">
                    <ul>
                        {
                            list.map((item) => (
                                <li key={item.id}>
                                    <span>
                                        {item.name}
                                    </span>
                                    <button className="buy-button"
                                        onClick={() => toggle(item.id)}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}
                                        style={{
                                            backgroundColor: isToggle[item.id]
                                            ? (hovered[item.id] ? "hsl(278, 67%, 32%)" : "hsl(278, 67%, 42%)")
                                            : (hovered[item.id] ? "hsl(134, 67%, 37%)" : "hsl(134, 67%, 47%)")
                                        }}>
                                        {isToggle[item.id] ? "Bought" : "To Buy"}
                                    </button>
                                    <button className="delete-button"
                                        onClick={() => deleteItem(item.id)}>
                                        Delete
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );

}

export default ShoppingList;
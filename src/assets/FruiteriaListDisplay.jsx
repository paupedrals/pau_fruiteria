import { useState } from 'react';
import FruitesListJson from './FruitesList.json';
import './styles.css'; // Assuming you're using a separate CSS file

function FruiteriaListDisplay() {
    const [shoppingList, setShoppingList] = useState([]);

    // Handle the "Buy" button click
    const handleBuy = (fruit) => {
        setShoppingList([...shoppingList, fruit]); // Add selected fruit to the shopping list
    };

    // Handle the "Remove" button click for reducing quantity by 1
    const handleRemove = (fruitName) => {
        const updatedList = [...shoppingList];
        const indexToRemove = updatedList.findIndex(fruit => fruit.nom === fruitName);

        if (indexToRemove !== -1) {
            updatedList.splice(indexToRemove, 1); // Remove only one instance of the fruit
            setShoppingList(updatedList);
        }
    };

    // Group items by fruit name, calculate quantity and total price for each
    const groupedShoppingList = shoppingList.reduce((acc, fruit) => {
        const found = acc.find(item => item.nom === fruit.nom);
        if (found) {
            found.quantity += 1;
            found.totalPrice += fruit.preu;
        } else {
            acc.push({ nom: fruit.nom, preu: fruit.preu, quantity: 1, totalPrice: fruit.preu });
        }
        return acc;
    }, []);

    // Calculate the overall total price of the shopping list
    const totalPrice = groupedShoppingList.reduce((total, fruit) => total + fruit.totalPrice, 0);

    return (
        <>
            <h1>Fruit Shop</h1>
            <div className="main-container">
                <div className="fruit-container">
                    {
                        FruitesListJson.map((fruita, index) => (
                            <div className="fruit-box" key={index}>
                                <div className="fruit-details">
                                    <span>{fruita.nom}</span>
                                    <span>{fruita.preu}€</span>
                                </div>
                                <button 
                                    className="fruit-button" 
                                    onClick={() => handleBuy(fruita)}
                                >
                                    Buy
                                </button>
                            </div>
                        ))
                    }
                </div>

                {/* Shopping List Section */}
                <div className="shopping-list">
                    <h2>Your Shopping List</h2>
                    {groupedShoppingList.length > 0 ? (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Fruita</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedShoppingList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nom}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.totalPrice.toFixed(2)}€</td>
                                            <td>
                                                <button onClick={() => handleRemove(item.nom)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3>Total Price: {totalPrice.toFixed(2)}€</h3>
                        </>
                    ) : (
                        <p>Your shopping list is empty.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default FruiteriaListDisplay;

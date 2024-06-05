import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null)

/**
 * StoreContextProvider is a context provider that provides the application's global state.
 * It manages the cart items and the food list.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children components.
 * @returns - The StoreContext.Provider component.
 */
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    /**
     * Adds an item to the cart.
     * If the item is not in the cart, it adds it with a quantity of 1.
     * Otherwise, it increments the quantity by 1.
     * If the user is authenticated, it also sends a request to the server to add the item to the cart.
     *
     * @param {string} itemId - The ID of the item to add.
     * @returns - A promise that resolves when the item is added to the cart.
     */
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    /**
     * Removes an item from the cart.
     * If the item is in the cart, it decrements the quantity by 1.
     * If the quantity becomes 0, it removes the item from the cart.
     * If the user is authenticated, it also sends a request to the server to remove the item from the cart.
     *
     * @param {string} itemId - The ID of the item to remove.
     * @returns - A promise that resolves when the item is removed from the cart.
     */
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 1) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        } else {
            const newCartItems = { ...cartItems };
            delete newCartItems[itemId];
            setCartItems(newCartItems);
        }
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    /**
     * Calculates the total amount of the cart items.
     *
     * @returns {number} The total amount of the cart items.
     */
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    /**
     * Fetches the food list from the server.
     *
     * @returns {Promise<void>} - A promise that resolves when the food list is fetched.
     */
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }

    /**
     * Load the cart data from the server if the user is authenticated.
     *
     * @param {string} token - The authentication token.
     * @returns {Promise<void>} - A promise that resolves when the cart data is loaded.
     */
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    /**
     * Load the initial data when the component mounts.
     * Fetches the food list and loads the cart data if the user is authenticated.
     */
    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
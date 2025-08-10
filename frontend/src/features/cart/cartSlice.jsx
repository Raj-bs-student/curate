import { createSlice } from '@reduxjs/toolkit';

// Helper function to save cart to localStorage
const saveCartToStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Helper function to get cart from localStorage
const getCartFromStorage = () => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    return [];
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: getCartFromStorage(), 
    totalQuantity: getCartFromStorage().reduce((total, item) => total + item.quantity, 0),
    totalAmount: getCartFromStorage().reduce((total, item) => total + (item.price * item.quantity), 0),
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      
      if (!existingItem) {
        state.items.push({ 
          _id: newItem._id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          countInStock: newItem.countInStock,
          quantity: 1,
          totalPrice: newItem.price 
        });
        state.totalQuantity++;
      } else {
        if (existingItem.quantity < existingItem.countInStock) {
          existingItem.quantity++;
          existingItem.totalPrice += newItem.price;
          state.totalQuantity++;
        }
      }
      
      // Recalculate total amount
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      
      // Save to localStorage
      saveCartToStorage(state.items);
    },
    
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item._id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
        
        // Recalculate total amount
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        
        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },
    
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === id);
      
      if (existingItem && quantity > 0 && quantity <= existingItem.countInStock) {
        const oldQuantity = existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        
        state.totalQuantity = state.totalQuantity - oldQuantity + quantity;
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        
        // Save to localStorage
        saveCartToStorage(state.items);
      }
    },
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


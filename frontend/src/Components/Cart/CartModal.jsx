import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart, updateItemQuantity, clearCart } from '../../features/cart/cartSlice.jsx';

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeItemFromCart(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-4 bg-zinc-700 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-gray-400">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="w-8 h-8 bg-zinc-600 text-white rounded hover:bg-zinc-500"
                    >
                      -
                    </button>
                    <span className="text-white w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="w-8 h-8 bg-zinc-600 text-white rounded hover:bg-zinc-500"
                      disabled={item.quantity >= item.countInStock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-600 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Total Items: {totalQuantity}</span>
                <span className="text-white text-xl font-bold">₹{totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Clear Cart
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;

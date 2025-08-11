import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonMinimalist from "../Micro/ButtonMinimalist.jsx";
import AuthModal from "../Auth/AuthModal.jsx";
import CartModal from "../Cart/CartModal.jsx";
import { logout } from "../../features/auth/authSlice.jsx";


const Header = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex align-center items-center px-10 py-8 h-[10vw] place-content-between">
        <div className="flex justify-self-start gap-2 align-center">
          <ButtonMinimalist title="Shop" to="/shop"/>
          <ButtonMinimalist title="About" />
          <ButtonMinimalist title="Lookbook" />
        </div>

        <div className="flex gap-2 items-center">
          {isAuthenticated ? (
            <>
              <ButtonMinimalist 
                title={`Bag/${totalQuantity}`} 
                onClick={() => setShowCartModal(true)}
              />
              <ButtonMinimalist title="Logout" onClick={handleLogout} />
            </>
          ) : (
            <>
              <ButtonMinimalist
                title="Login"
                onClick={() => handleAuthClick("login")}
              />
              <ButtonMinimalist
                title="Sign Up"
                onClick={() => handleAuthClick("register")}
              />

              <ButtonMinimalist 
                title={`Bag/${totalQuantity}`} 
                onClick={() => setShowCartModal(true)}
              />
            </>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
      
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </>
  );
};

export default Header;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './Components/Screen/MainScreen.jsx';
import ShopPage from './Components/Screen/ShopPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
}

export default App;
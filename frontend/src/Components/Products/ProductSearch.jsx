import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchKeyword } from '../../features/products/productsSlice.jsx';

const ProductSearch = () => {
  const dispatch = useDispatch();
  const { searchKeyword, loading } = useSelector(state => state.products);
  const [localSearch, setLocalSearch] = useState(searchKeyword);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchKeyword(localSearch));
    dispatch(fetchProducts({ keyword: localSearch, pageNumber: 1 }));
  };

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors duration-200"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default ProductSearch;

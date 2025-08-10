import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpperBorder from "../Micro/UpperBorder.jsx";
import ProductCard from "../Main/ProductCard.jsx";
import { fetchProducts } from '../../features/products/productsSlice.jsx';

const NewArrivalsSection = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    // Fetch products when component mounts
    dispatch(fetchProducts({ pageNumber: 1 }));
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <UpperBorder title="New Arrivals" buttonTitle="Discover"/>
        <div className="flex justify-center items-center px-20 py-20">
          <div className="text-white text-xl">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <UpperBorder title="New Arrivals" buttonTitle="Discover"/>
        <div className="flex justify-center items-center px-20 py-20">
          <div className="text-red-400 text-xl">Error loading products: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UpperBorder title="New Arrivals" buttonTitle="Discover"/>
      <div className="flex flex-wrap px-20 py-10 gap-10">
        {products && products.length > 0 ? (
          products.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="text-white text-xl">No products available</div>
        )}
      </div>
    </div>
  );
};

export default NewArrivalsSection;

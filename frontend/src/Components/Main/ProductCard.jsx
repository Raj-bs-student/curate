import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/cart/cartSlice.jsx'

// --- Helper: Icon for the button ---
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);


// --- The Main Product Card Component ---
const ProductCard = ({ product }) => {

  const dispatch = useDispatch();

  const handleQuickAdd = () => {
    dispatch(addItemToCart(product));
  }
 


  const { name, price, images } = product;
  const imageCount = images.length;

  // Total time in milliseconds for one full cycle through all images.
  const CYCLE_DURATION = 10000; // 10 seconds

  // State to track the current active image and the overall progress percentage.
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // This effect sets up a timer to update the progress bar and active image.
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev >= 100 ? 0 : prev + 0.5; // Increment progress

        // Determine which image should be active based on the progress.
        // The progress is divided into segments, one for each image.
        const imageSegmentWidth = 100 / imageCount;
        const newActiveIndex = Math.min(
          Math.floor(newProgress / imageSegmentWidth),
          imageCount - 1
        );
        
        setActiveImageIndex(newActiveIndex);

        return newProgress;
      });
    }, CYCLE_DURATION / 200); // Update progress every 50ms for a smooth animation

    // Cleanup function to clear the interval when the component unmounts.
    return () => clearInterval(interval);
  }, [imageCount]); // Dependency array ensures this effect runs only once.

  return (
    <div className="w-full max-w-sm bg-zinc-800 text-white rounded-2xl shadow-2xl overflow-hidden font-sans">
      
      {/* Segmented Progress Bar Container */}
      <div className="relative top-0 left-0 flex w-full items-center gap-1.5 px-4 pt-3">
        {images.map((_, index) => {
          const imageSegmentWidth = 100 / imageCount;
          
          // Check if the current segment is completed
          const isCompleted = index < activeImageIndex;
          
          // Check if the current segment is the active one
          const isActive = index === activeImageIndex;

          // Calculate the fill percentage for the active segment
          const segmentStartProgress = index * imageSegmentWidth;
          const progressInSegment = ((progress - segmentStartProgress) / imageSegmentWidth) * 100;
          
          return (
            <div key={index} className="h-[3px] flex-1 bg-zinc-700 rounded-full overflow-hidden">
              {/* This inner div represents the fill of the progress bar segment */}
              {(isCompleted || isActive) && (
                <div
                  className="h-full bg-white rounded-full transition-all duration-150 ease-linear"
                  style={{ width: isCompleted ? '100%' : `${progressInSegment}%` }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Image Gallery and Quick Add Button */}
      <div className="relative aspect-square mt-2" onClick={handleQuickAdd}>
        {/* This container holds the images and clips them. */}
        <div className="w-full h-full overflow-hidden">
          {/* This inner div acts as a "film strip" that moves vertically. */}
          <div
            className="w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateY(-${activeImageIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`${name} - view ${index + 1}`}
                className="w-full h-full object-cover"
                // Handle image loading errors with a fallback
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/1a202c/ff0000?text=Error'; }}
              />
            ))}
          </div>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto">
          <button className="flex items-center justify-center px-6 py-3 bg-zinc-900 bg-opacity-50 backdrop-blur-sm text-white rounded-full text-sm font-semibold hover:bg-opacity-70 transition-all duration-300 shadow-lg">
            <PlusIcon />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6 pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-100">{name}</h3>
          <p className="text-lg font-medium text-gray-300">{price}</p>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---

export default ProductCard;

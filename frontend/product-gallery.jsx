import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const products = [
  {
    id: 1,
    name: "FRAGMENT",
    price: "160€",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AZkdkUxAIwpj3K6cKh1lJGEwfivyPP.png",
    badges: ["New", "Hoodie"]
  },
  {
    id: 2,
    name: "URBAN CLASSIC",
    price: "120€",
    image: "/black-urban-jacket.png",
    badges: ["Popular", "Jacket"]
  },
  {
    id: 3,
    name: "MINIMAL TEE",
    price: "45€",
    image: "/minimalist-white-t-shirt.png",
    badges: ["Essential", "T-Shirt"]
  },
  {
    id: 4,
    name: "STREET WEAR",
    price: "89€",
    image: "/streetwear-cargo-pants.png",
    badges: ["Trending", "Pants"]
  }
]

export default function ProductGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  
  const CYCLE_DURATION = 4000 // 4 seconds per image
  const PROGRESS_INTERVAL = 50 // Update progress every 50ms
  
  useEffect(() => {
    const startCycle = () => {
      let currentProgress = 0
      const progressIncrement = (100 / CYCLE_DURATION) * PROGRESS_INTERVAL
      
      progressRef.current = setInterval(() => {
        currentProgress += progressIncrement
        setProgress(currentProgress)
        
        // Check if we should transition to next image
        const threshold = ((currentIndex + 1) / products.length) * 100
        
        if (currentProgress >= threshold && !isTransitioning) {
          setIsTransitioning(true)
          
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
            setIsTransitioning(false)
          }, 300)
        }
        
        // Reset progress when cycle completes
        if (currentProgress >= 100) {
          currentProgress = 0
          setProgress(0)
        }
      }, PROGRESS_INTERVAL)
    }
    
    startCycle()
    
    return () => {
      if (progressRef.current) {
        clearInterval(progressRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    };
  }, [currentIndex, isTransitioning])
  
  const handleQuickAdd = () => {
    // Add to cart logic here
    console.log(`Added ${products[currentIndex].name} to cart`)
  }
  
  const currentProduct = products[currentIndex]
  
  return (
    <div
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200">
        <div
          className="h-full bg-black transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }} />
      </div>
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {currentProduct.badges?.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-black/80 text-white hover:bg-black/90 backdrop-blur-sm">
              {badge}
            </Badge>
          ))}
        </div>
        
        {/* Image with transition effect */}
        <div className="relative w-full h-full">
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isTransitioning 
                ? 'transform translate-y-full opacity-0' 
                : 'transform translate-y-0 opacity-100'
            }`}>
            <Image
              src={currentProduct.image || "/placeholder.svg"}
              alt={currentProduct.name}
              fill
              className="object-cover"
              priority />
          </div>
          
          {/* Next image sliding in from top */}
          {isTransitioning && (
            <div
              className="absolute inset-0 transform -translate-y-full animate-in slide-in-from-top duration-500">
              <Image
                src={products[(currentIndex + 1) % products.length].image || "/placeholder.svg"}
                alt={products[(currentIndex + 1) % products.length].name}
                fill
                className="object-cover" />
            </div>
          )}
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={handleQuickAdd}
            className="bg-white text-black hover:bg-gray-100 shadow-lg backdrop-blur-sm border border-gray-200">
            Quick Add
          </Button>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {currentProduct.name}
        </h3>
        <p className="text-2xl font-semibold text-gray-900">
          {currentProduct.price}
        </p>
        
        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {products.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-black' 
                  : 'bg-gray-300'
              }`} />
          ))}
        </div>
      </div>
    </div>
  );
}

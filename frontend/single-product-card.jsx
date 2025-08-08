'use client';
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Single product with multiple images
const product = {
  id: 1,
  name: "FRAGMENT HOODIE",
  price: "160€",
  badges: ["New", "Limited"],
  images: [
    {
      id: 1,
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AZkdkUxAIwpj3K6cKh1lJGEwfivyPP.png",
      alt: "Fragment Hoodie - Front View"
    },
    {
      id: 2,
      url: "/fragment-hoodie-back.png",
      alt: "Fragment Hoodie - Back View"
    },
    {
      id: 3,
      url: "/fragment-hoodie-side.png", 
      alt: "Fragment Hoodie - Side View"
    },
    {
      id: 4,
      url: "/fragment-hoodie-detail.png",
      alt: "Fragment Hoodie - Detail View"
    }
  ]
}

export default function SingleProductCard() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const progressRef = useRef(null)
  
  const CYCLE_DURATION = 4000 // 4 seconds per image
  const PROGRESS_INTERVAL = 50 // Update progress every 50ms
  const totalImages = product.images.length
  
  useEffect(() => {
    const startCycle = () => {
      let currentProgress = 0
      const progressIncrement = (100 / CYCLE_DURATION) * PROGRESS_INTERVAL
      
      progressRef.current = setInterval(() => {
        currentProgress += progressIncrement
        setProgress(currentProgress)
        
        // Calculate which image should be shown based on progress
        const imageThreshold = ((currentImageIndex + 1) / totalImages) * 100
        
        if (currentProgress >= imageThreshold && !isTransitioning) {
          setIsTransitioning(true)
          
          setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % totalImages)
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
    };
  }, [currentImageIndex, isTransitioning, totalImages])
  
  const handleQuickAdd = () => {
    console.log(`Added ${product.name} to cart`)
    // Add to cart logic here
  }
  
  const currentImage = product.images[currentImageIndex]
  const nextImage = product.images[(currentImageIndex + 1) % totalImages]
  
  return (
    <div
      className="w-full max-w-md mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div
          className="h-full bg-white transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }} />
      </div>
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-gray-800 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.badges?.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm font-medium">
              {badge}
            </Badge>
          ))}
        </div>
        
        {/* Image with transition effect */}
        <div className="relative w-full h-full">
          {/* Current Image */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              isTransitioning 
                ? 'transform translate-y-full opacity-0' 
                : 'transform translate-y-0 opacity-100'
            }`}>
            <Image
              src={currentImage.url || "/placeholder.svg?height=600&width=450&query=black hoodie front view"}
              alt={currentImage.alt}
              fill
              className="object-cover"
              priority />
          </div>
          
          {/* Next image sliding in from top */}
          {isTransitioning && (
            <div
              className="absolute inset-0 transform -translate-y-full animate-in slide-in-from-top duration-500">
              <Image
                src={nextImage.url || "/placeholder.svg?height=600&width=450&query=black hoodie back view"}
                alt={nextImage.alt}
                fill
                className="object-cover" />
            </div>
          )}
          
          {/* Gradient overlay for better button visibility */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <Button
            onClick={handleQuickAdd}
            className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg backdrop-blur-sm border border-gray-200 font-semibold px-6 py-2">
            Quick Add
          </Button>
        </div>
      </div>
      {/* Static Product Info */}
      <div className="p-6 text-center bg-gray-900">
        <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
          {product.name}
        </h3>
        <p className="text-2xl font-semibold text-white mb-4">
          {product.price}
        </p>
        
        {/* Image Progress Indicators */}
        <div className="flex justify-center gap-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-gray-600'
              }`} />
          ))}
        </div>
        
        {/* Image Counter */}
        <div className="mt-3 text-sm text-gray-400">
          {currentImageIndex + 1} / {totalImages}
        </div>
      </div>
    </div>
  );
}

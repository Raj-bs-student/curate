import UpperBorder from "../Micro/UpperBorder.jsx"
import ProductCard from "../Main/ProductCard.jsx"
import AiImage from "../../assets/Gemini_Generated_Image_fapaylfapaylfapa.png"

const NewArrivalsSection = () => {

const productsData = [{
  name: 'Monochrome Dream',
  price: 'Rs 129.99',
  images: [
    AiImage,
    'https://placehold.co/600x600/2d3748/ffffff?text=Image+2',
    'https://placehold.co/600x600/4a5568/ffffff?text=Image+3',
    'https://placehold.co/600x600/718096/ffffff?text=Image+4',
    'https://placehold.co/600x600/a0aec0/1a202c?text=Image+5',
  ],
}];

  return (
    <div>
      <UpperBorder title="New Arrivals" buttonTitle="Discover"/>
      <div className="flex flex-wrap px-20 py-10 gap-10">
        {productsData.map((productData, index) => (<ProductCard key={index} product={productData} />))}
      </div>
    </div>
  )
}

export default NewArrivalsSection

import BlurEffect from 'react-progressive-blur';

const BackgroundVideoSection = () => {

  const VideoSrc = "https://cdn.shopify.com/videos/c/o/v/ca375a1da1f54edbabad68bbb8e91fc7.mp4"

  const VideoInverseStyle = {
    height: '50vh',

  }
  return (
    <div className="relative w-screen h-screen overflow-hidden">
    <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vh] transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
{/* First video - normal */}
<video src={VideoSrc} autoPlay loop muted className="absolute top-0 left-0 w-full h-[60%] object-cover" />

{/* Second video - flipped and positioned below */}
        <div className="absolute top-1/2 left-0 w-full h-[40%] overflow-hidden z-10">

<video src={VideoSrc} autoPlay loop muted className="object-cover transform -scale-y-100 blur-sm" />
        {/* blur overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black mask-b-from-0% ">
        </div>
        </div>
    </div>

    </div>
  )
}

export default BackgroundVideoSection

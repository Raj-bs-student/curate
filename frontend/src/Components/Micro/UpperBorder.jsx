const UpperBorder = ({title, buttonTitle}) => {
  return (
    // border on a div on three sides, top, left and right
    <>
    
    <div className="border-x-1 border-t-1 border-[rgba(255,255,255,0.2)] h-3 mx-20"></div>
    <div className="flex justify-between items-center text-white px-20 py-5">
     
    <h1>{title}</h1>
    <button className="text-white rounded border-1 border-[rgba(255,255,255,0.2)] px-4 py-2 text-center">{buttonTitle}</button>
    </div>
    </>
  )
}

export default UpperBorder

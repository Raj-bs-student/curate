const SectionDetails = ({title, buttonTitle}) => {
  return (
    <div className="flex justify-between items-center text-white px-20 py-5">
     
    <h1>{title}</h1>
    <button className="text-white rounded border-1 border-[rgba(255,255,255,0.2)] px-4 py-2 text-center">{buttonTitle}</button>
    </div>

  )
}

export default SectionDetails

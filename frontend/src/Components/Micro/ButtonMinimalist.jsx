

const ButtonMinimalist = (props) => {
  return (
    <button type="button" className="hover:bg-zinc-800 h-[80%] px-3 rounded text-white border-[1px] border-[rgba(255,255,255,0.1)]">{props.title || "Click me" }</button>
  )
}

export default ButtonMinimalist

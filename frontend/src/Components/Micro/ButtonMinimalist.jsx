

const ButtonMinimalist = ({ title = "Click me", onClick, ...props }) => {
  return (
    <button 
      type="button" 
      className="hover:bg-zinc-800 h-[2em] px-3 rounded text-white border-[1px] border-[rgba(255,255,255,0.1)] backdrop-blur-3xl transition-colors duration-200"
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  );
};

export default ButtonMinimalist;

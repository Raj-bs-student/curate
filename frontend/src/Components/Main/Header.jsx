
import  ButtonMinimalist  from '../Micro/ButtonMinimalist.jsx';


const Header = () => {
  return (
    <div className='flex align-center p-4 h-[15%] place-content-between'>
      <div className='flex justify-self-start gap-2 align-center'  >
        <ButtonMinimalist title='Shop' />
        <ButtonMinimalist title='About' />
        <ButtonMinimalist title='Lookbook' />
      </div>
      <div className="flex gap-2">
        <ButtonMinimalist title='Cart' />
        <ButtonMinimalist title='Bag/0' />
      </div>
    </div>
  )
}

export default Header

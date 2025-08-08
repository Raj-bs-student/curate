
import  ButtonMinimalist  from '../Micro/ButtonMinimalist.jsx';


const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 flex align-center px-20 py-8 h-[15vw] place-content-between'>
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

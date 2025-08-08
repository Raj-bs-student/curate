import Header from '../Main/Header.jsx';
import BackgroundVideoSection from '../Micro/BackgroundVideoSection.jsx';
import InfoSection from '../Micro/InfoSection.jsx';
import NewArrivalsSection from '../Main/NewArrivalsSection.jsx';

const MainScreen = () => {
  return (
    <div className="bg-zinc-900 w-screen flex flex-col relative z-10 absolute">
      <Header />
      <BackgroundVideoSection />
      <InfoSection />
      <NewArrivalsSection/>
    </div>
  )
}

export default MainScreen

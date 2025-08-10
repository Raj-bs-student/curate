import Header from '../Main/Header.jsx';
import BackgroundVideoSection from '../Micro/BackgroundVideoSection.jsx';
import InfoSection from '../Micro/InfoSection.jsx';
import NewArrivalsSection from '../Main/NewArrivalsSection.jsx';
import ShowcaseSection from '../Main/ShowcaseSection.jsx';
import End from '../Main/End.jsx';

const MainScreen = () => {
  return (
    <div className="bg-zinc-900 w-screen flex flex-col relative z-10">
      <Header />
      <BackgroundVideoSection />
      <InfoSection />
      <NewArrivalsSection/>
      <ShowcaseSection />
      <End />
    </div>
  )
}

export default MainScreen

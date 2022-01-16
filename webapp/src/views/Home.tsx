import { FC } from 'react';

import HomeNavbar from '../components/navbar/HomeNavbar';
import HomeFooter from '../components/footer/HomeFooter';
import About from '../components/home/About';
import Benefits from '../components/home/Benefits';
import Video from '../components/home/Video';
import ContuctUs from '../components/home/ContuctUs';
import Newsletter from '../components/home/Newsletter';
import LogoBar from '../components/home/LogoBar';
import Roadmap from '../components/home/Roadmap';
import Team from '../components/home/Team';

const Home: FC = () => (
  <>
    <HomeNavbar />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <About />
      <LogoBar />
      <Benefits />
      <Video />
      <Roadmap />
      <Team />
      <ContuctUs />
      <Newsletter />
    </div>
    <HomeFooter />
  </>
);

export default Home;

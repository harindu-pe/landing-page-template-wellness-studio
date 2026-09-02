import Cursor from '@/components/Cursor';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Membership from '@/components/Membership';
import Method from '@/components/Method';
import Room from '@/components/Room';
import ScrollReveals from '@/components/ScrollReveals';
import SectionRail from '@/components/SectionRail';
import Sessions from '@/components/Sessions';
import SmoothScroll from '@/components/SmoothScroll';

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ScrollReveals />
      <Cursor />
      <SectionRail />
      <Header />

      <main>
        <Hero />
        <Method />
        <Room />
        <Sessions />
        <Membership />
      </main>
    </>
  );
}

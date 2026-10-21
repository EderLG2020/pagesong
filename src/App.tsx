import { SECTION_IDS } from './config/navigation'
import { useActiveSection } from './hooks/useActiveSection'
import { SideNav } from './components/layout/SideNav'
import { SiteFooter } from './components/layout/SiteFooter'
import { Hero } from './components/sections/Hero/Hero'
import { Pricing } from './components/sections/Pricing/Pricing'
import { Products } from './components/sections/Products/Products'
import { About } from './components/sections/About/About'

export default function App() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <>
      <Hero active={active} />
      <SideNav active={active} />
      <main>
        <Pricing />
        <Products />
        <About />
      </main>
      <SiteFooter />
    </>
  )
}

import { TopBar } from './TopBar'
import { MainHeader } from './MainHeader'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <TopBar />
      <MainHeader />
    </header>
  )
}

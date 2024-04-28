import { Link, useQueryParams } from 'raviger';
import { FC } from 'react';
import { DarkModeController, useDarkMode } from './DarkModeController';
import { ModeToggle } from './DarkModeToggle';


export function Nav() {
  const [{ q }] = useQueryParams()
  const { backgroundColor } = useDarkMode();
  return (
    <nav className={'text-white flex p-1'} style={{ backgroundColor }}>
      <Link className={'p-4 py-2'} href={'/'}>
        Home
      </Link>
      <Link className={'p-4 py-2'} href={`/search?q=${q}`}>
        Search
      </Link>
      <Link className={'p-4 py-2'} href={`/claim`}>
        Claim
      </Link>
      <Link className={'p-4 py-2'} href={'/about'}>
        About
      </Link>
      <div className="flex-1"></div>
      <ModeToggle />
    </nav>
  )
}


export const StoryBookNav: FC = () => (
  <DarkModeController>
    <Nav />
  </DarkModeController>
)
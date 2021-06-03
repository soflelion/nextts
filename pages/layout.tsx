import { NextPage } from 'next'

interface content {
  children: JSX.Element
}

const Layout: NextPage<content> = ({ children }) => (
  <>
    <header>
      <div>Menu</div>
    </header>
    {children}
    <footer>Sofiane - Nextts</footer>
  </>
)

export default Layout

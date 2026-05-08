import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="dot"></span> COMPANYNAME
      </div>
      <nav className="nav-links">
        <Link to="/">HOME</Link>
        <a href="https://www.meesho.com" target="_blank" rel="noopener noreferrer">ABOUT US</a>
        <a href="https://www.myntra.com" target="_blank" rel="noopener noreferrer">SHOP</a>
        <a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer">LOGIN</a>
        <button className="menu-btn">&#8801;</button> {/* Hamburger icon */}
      </nav>
    </header>
  );
}

export default Header;

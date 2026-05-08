import shoppingImg from '../assets/shopping_woman.png';

function Hero() {
  return (
    <main className="hero">
      <div className="hero-left">
        <div className="image-circle">
          <img src={shoppingImg} alt="Happy Shopper" className="shopper-img" />
        </div>
        {/* Background decorative shapes can be added here or in CSS */}
        <div className="shape circle-sm"></div>
        <div className="shape circle-md border-only"></div>
        <div className="shape line-1"></div>
        <div className="shape line-2"></div>
      </div>
      
      <div className="hero-right">
        <h3 className="special-offer">SPECIAL OFFER</h3>
        <h1 className="mega-sale">
          MEGA <br /> <span className="text-yellow">SALE</span>
        </h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.
        </p>
        {/* Redirecting to Myntra as a generic shopping site */}
        <a href="https://www.myntra.com" target="_blank" rel="noopener noreferrer" className="shop-now-btn">
          SHOP NOW
        </a>
      </div>
    </main>
  );
}

export default Hero;

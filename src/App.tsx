import React, { ChangeEvent } from "react";
import "./App.css";

function App() {
  const [price, setPrice] = React.useState<number>(16);
  const [isMonthly, setIsMonthly] = React.useState<boolean>(true);
  const MAX = 32;
  const MIN = 1;

  function displayPageViews(price: number): string {
    const unit = 100 / 16;
    return `${Math.round(price * unit)}K`;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(event.target.value));
  }

  function handleToggle() {
    setIsMonthly(!isMonthly);
  }

  const bg = React.useMemo(() => {
    return (
      "linear-gradient(to right, hsl(174, 77%, 80%) 0%, hsl(174, 77%, 80%) " +
      (price / (MAX - MIN)) * 100 +
      "%, hsl(224, 65%, 95%) " +
      price +
      "%, hsl(224, 65%, 95%) 100%)"
    );
  }, [price]);

  return (
    <main className="pricing__container">
      <header className="pricing__header">
        <h1 className="pricing__title">Simple, traffic-based pricing</h1>
        <p className="pricing__subtitle">
          Sign-up for our 30-day trial. No credit card required.
        </p>
      </header>
      <article className="pricing__card">
        <div className="pricing__card__top">
          <header className="pricing__card__header">
            <div className="header__left">
              {displayPageViews(price)} Pageviews
            </div>
            <div className="header__right">
              <span className="header__right--large">${price.toFixed(2)}</span>
              <p> / month</p>
            </div>
          </header>

          <div className="pricing__card__range">
            <input
              className="range"
              aria-label="pricing range"
              style={{
                background: bg,
              }}
              type="range"
              min={MIN}
              max={MAX}
              step={100 / MAX / 100}
              defaultValue={price}
              onChange={handleChange}
            />
          </div>
          <div className="pricing__card__toggle">
            <p>Monthly Billing </p>
            <label htmlFor="toggle" className="toggle__switch">
              <input
                type="checkbox"
                role="switch"
                id="toggle"
                value={isMonthly.toString()}
                checked={isMonthly}
                aria-checked={isMonthly}
                onChange={handleToggle}
              />
              <span className="toggle__slider"></span>
            </label>
            <p>
              Yearly Billing
              <span className="toggle__discount_flag"> 25% discount</span>
            </p>
          </div>
        </div>
        <footer className="pricing__card__footer">
          <ul className="list">
            <li>Unlimited websites</li>
            <li> 100% data ownership</li>
            <li> Email reports</li>
          </ul>
          <button className="button"> Start my trial</button>
        </footer>
      </article>
    </main>
  );
}

export default App;

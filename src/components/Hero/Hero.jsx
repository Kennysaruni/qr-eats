import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Hero.css";
import image from "../../assets/hero.png";
import { data } from "../../data/data.js";

function Hero() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("https://qr-eats-iota.vercel.app/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  // const restaurants = data.restaurants

  // Group restaurants into rows of 3
  const groupedRestaurants = [];
  for (let i = 0; i < restaurants.length; i += 3) {
    groupedRestaurants.push(restaurants.slice(i, i + 3));
  }

  return (
    <div className="container">
      <div className="img-title-container">
        <img src={image} alt="Hero" className="hero-image" />
        <div className="text-container">
          <h1 className="title">Discover Your Favourite Eats</h1>
          <p className="description">Scan & Order directly from your restaurants</p>
          <input type="text" placeholder="Search Restaurants" />
        </div>
      </div>

      <div className="images">
        {groupedRestaurants.map((group, index) => (
          <div className="restaurant-row" key={index}>
            {group.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                  <img
                    src={restaurant.logo}
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                </Link>
                <p>{restaurant.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;

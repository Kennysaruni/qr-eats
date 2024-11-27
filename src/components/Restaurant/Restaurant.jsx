
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Restaurant.css";
import qr from '../../assets/qrartcafe.png';

function Restaurant() {
  const { id } = useParams();  // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetch(`https://qr-eats-iota.vercel.app/restaurants/${id}`) // Use the dynamic ID in the fetch URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Throw an error if status is not OK
        }
        return response.json();
      })
      .then((data) => setRestaurant(data))
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
        setError(error.message);
      });
  }, [id]); // Re-fetch the data if the ID changes

  if (!restaurant) {
    return <p>Loading...</p>; // Loading state while fetching
  }

  return (
    <div className="container">
      <h1 className="title">{restaurant.name}'s Menu</h1>
      <h3>Featured Menu Items</h3>
      <div className="images-foods">
        {restaurant.categories.food.map((item, index) => (
          <div key={index} className="image">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="image"
            />
            <p>{item.name}</p>
            <p className="price">KES {item.price}</p>
          </div>
        ))}
      </div>
      
      <div className="beverages">
        <h3>Beverages</h3>
        <div className="images-foods">
          {restaurant.categories.beverages.map((item, index) => (
            <div key={index} className="image">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="image"
              />
              <p>{item.name}</p>
              <p className="price">KES {item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="qr-code">
        <div className="scan">Scan QR for Menu</div>
        <img src={restaurant.qrCode} alt="QR Code" />
      </div>
    </div>
  );
}

export default Restaurant;


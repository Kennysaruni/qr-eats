
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Restaurant.css";
import qr from '../../assets/qrartcafe.png';
import data from "../../../db.json"

function Restaurant() {
  const { id } = useParams();  // Get the restaurant ID from the URL

  const restaurant = data.restaurants.find((restaurant) => restaurant.id === parseInt(id))

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


// import React, { useEffect, useState } from "react";
// import "./Restaurant.css";
// import qr from '../../assets/qrartcafe.png'
// import { useParams } from "react-router-dom";

// function Restaurant() {
//   const {id} = useParams()
//  const [restaurant, setRestaurant] = useState([])

//   useEffect(() => {
//     fetch(`http://localhost:3000/restaurants/${id}`)
//     .then( r => r.json())
//     .then(data => setRestaurant(data))
//   },[])

//   console.log(restaurant)

//   return (
//     <div className="container">
//       <h1 className="title"> {restaurant.name}Menu</h1>
//       <h3>Featured Menu Items</h3>
//       <div className="images">
//         <div className="image">
//           <img
//             src="https://images.pexels.com/photos/3724/food-morning-breakfast-orange-juice.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//             alt="croissant"
//             className="image"
//           />
//           <p>Butter Croissant</p>
//           <p className="price">KES 290</p>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.pexels.com/photos/351962/pexels-photo-351962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//             alt="croissant"
//             className="image"
//           />
//           <p>Cinnamon Roll</p>
//           <p className="price">KES 290</p>
//         </div>
//         <div className="image">
//           <img
//             src="https://images.pexels.com/photos/5639547/pexels-photo-5639547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//             className="image"
//           />
//           <p>Chicken Pie</p>
//           <p className="price">KES 390</p>
//         </div>
//       </div>
//       <div className="beverages">
//         <h3>Beverages</h3>

//         <div className="images">
//           <div className="image">
//             <img
//               src="https://tarasmulticulturaltable.com/wp-content/uploads/2017/05/Chai-Ya-Tangawizi-Kenyan-Ginger-Tea-2-of-3-1.jpg"
//               alt="kenyan tea"
//               className="image"
//             />
//             <p>Kenyan Tea</p>
//             <p className="price">KES 290</p>
//           </div>
//           <div className="image">
//             <img
//               src="https://www.seriouseats.com/thmb/TwX7Qc3nfwMXeHICikZNFENChCE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2018__06__20180613-coffee-vs-espresso-vicky-wasik-3-1500x1125-418fa2a14e7249b18040c2c34bf8569c.jpg"
//               alt="Espresso"
//               className="image"
//             />
//             <p>Espresso</p>
//             <p className="price">KES 200</p>
//           </div>
//           <div className="image">
//             <img
//               src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//               className="image"
//             />
//             <p>Cappuccino</p>
//             <p className="price">KES 290</p>
//           </div>
//         </div>
//       </div>
//       <div className="qr-code">
//         <div className="scan">Scan QR for Menu</div>
//         <img src={qr} alt="" />
//       </div>
//     </div>
//   );
// }

// export default Restaurant;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Restaurant.css";
import qr from '../../assets/qrartcafe.png';

function Restaurant() {
  const { id } = useParams();  // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetch(`http://localhost:3000/restaurants/${id}`) // Use the dynamic ID in the fetch URL
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


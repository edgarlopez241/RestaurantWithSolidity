import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import React, {useState, useEffect} from "react";
import { AbiRestaurantFoodAddres } from "../config";
import RestaurantFood from '../utils/abi/Restaurant.json'

export default function Home() {
//  const dishes = [
//    {
//      url:
//        "https://eatyourworld.com/images/content_images/images/gallo-pinto.jpg",
//      name: "Gallo Pinto",
//      country: "Comida típica de Costa Rica",
//    },
//  ];

//en esta variable, vamos a guardar los platos que tengamos 
  const [dishes, setDishes] = useState([]);


    const getAllDishes = async () =>{
      //aqui le estamos definiendo el proveedor 
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.STAGING_ALCHEMY_KEY
      );

      //aqui estamos creando un contrato, 
      //el cual va a interactuar con con el abi y el provider
      const contract = new ethers.Contract(
        AbiRestaurantFoodAddres,
        RestaurantFood.abi,
        provider
      )

      //aqui le realiza un llamado al metodo del smartcontract, para obtener las comidas que previamente guardamos
      const dishes = await contract.getAllRestaurantFood();
      console.log("epa")
      console.log(dishes);
      //aqui actualizamos el stage del contract  
      setDishes(dishes);
    };

    //aqui usamos el useEffect, para una vez que arranque la app nos pinte en pantalla lo que queremos ver
    useEffect(()=>{
      getAllDishes();
    },[] )

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {dishes.map((food, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img style={{ height: "20rem" }} src={food.foodUrl} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {food.foodName}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p>{dishes.name}</p>
                  <p className="text-gray-400">{food.originCountry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

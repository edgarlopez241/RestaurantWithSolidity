import "../styles/globals.css";
import Link from "next/link";
import React, {useEffect,useState} from "react";
import styles from "../styles/Home.module.css";
import {ethers} from "ethers";


function MyApp({ Component, pageProps }) {
  const[walletAccount, setWalletAccount]= useState("");
  const [isConnectedToSepolia, setConnectedToSepolia]= useState(true);
  const checkIfMetamaskIsConnected = async () =>{
    const {ethereum} = window;

    if(!ethereum){
      console.log("Check if metamask was installed");
    }else{
      console.log("Metamask was installed");
      ethereum.on("chainChanged", function(networkId){
        if(parseInt(networkId)!==11155111){
          setConnectedToSepolia(false)
        }else{
          setConnectedToSepolia(true)
        }
      })
    }
    const accounts = await ethereum.request({method:"eth_accounts"});
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    
    if(accounts.length != 0){
      setWalletAccount(accounts[0]);
    }else {
      console.log("Not authorized account");
    }
  }

  useEffect(()=>{
    checkIfMetamaskIsConnected();
  },[])
  
  const connectMetamask = async () =>{
    try{
      const {ethereum} = window;
      if(!ethereum){
        alert("Get Metamask");
        return;
      }
      
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      }) 
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      {!isConnectedToSepolia &&(
        <div className={styles.container}>
          <div className={styles.wrongNetwork}>
            <h1>Network Wrong</h1>
            <p>{""}
              pleace connecte to sepolia network in your metamask; 
            </p>
          </div>
          </div>
      )}
      {(!walletAccount && setConnectedToSepolia)&& (
        <div className={styles.container}>
          <button 
          className={styles.walletButton}
          onClick={connectMetamask}
          >
            Log In
          </button>
          </div>
      )}

{(walletAccount && isConnectedToSepolia)&& (
  <div>
  <main>
    <nav className="border-b p-6">
      <p className="text-4xl font-bold">Platzi Eaters</p>
      <div className="flex mt-4">
        <Link href="/">
          <a className="mr-4 text-pink-500">Inicio</a>
        </Link>
        <Link href="/add-dish">
          <a className="mr-6 text-pink-500">Agregar platillos</a>
        </Link>
        <Link href="/my-dishes">
          <a className="mr-6 text-pink-500">Mis platillos</a>
        </Link>
      </div>
    </nav>
  </main>
  <Component {...pageProps} />
</div>

)}
  
    </div>
  );
}

export default MyApp;

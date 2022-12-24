import React, { useEffect, useState } from 'react'

const Wallet = () => {
     const [walletAddress ,setWalletAddress]= useState("");
     const connectWallet = async ()=>{
          if(typeof window!="undefined" && typeof window.ethereum !="undefined"){
               try {
                    /**Metamask is installed*/
                    const accounts =await window.ethereum.request({method :"eth_requestAccounts",});
                    setWalletAddress(accounts[0]);
                    // console.log(accounts[0]);
                    
               } catch (err) {
                    console.log(err.message);
               }
          }else{
               /**Metamask is not installed */
               console.log("Please install Metamask");
          }
     }
          

          /**Stay connected on refresing page and components */
          const keepConnected  = async ( )=>{
               if(typeof window!="undefined" && typeof window.ethereum !="undefined"){
                    try {
                         /**Metamask is installed */
                         const accounts = await window.ethereum.request({method :"eth_accounts",});
                         if(accounts.length > 0 ){
                              setWalletAddress(accounts[0])
                         } else {
                              console.log("connect to metamask")
                         }
                    } catch (error) {
                         console.log(error.message);     
                    }
               }else{
                    /**Metamask is not installed*/
                    console.log("Please install metamask")
               }
          }

          /**listen to wallet events on changing accounts and disconnect wallet */
          const addWalletListener = async () =>{
               if(typeof window!="undefined" && typeof window.ethereum!="undefined"){
                    /**handling metamask events */
                    window.ethereum.on("accountsChanged",
                    (accounts)=>setWalletAddress(accounts[0]));
                    console.log("account changed");
               }else{
                    /**
                     * Metamask is not installe , or
                     * Metask is disconnected 
                     */
                    setWalletAddress("");
                    console.log("you're Disconnected");
               }
          }

          useEffect(() => {
            /**calling function keep connected on refreshing page very time  */
            keepConnected();
            /**calling function addWalletListener so we can refresh the component on event updating state */
            addWalletListener();
          });

  return (
    <div>
          { walletAddress && walletAddress.length > 0  ?
          <p>Add: {walletAddress.substring(0,6)}...{walletAddress.substring(40)}</p> : 
          <button onClick={connectWallet}>connect wallet</button> }
    </div>
  )
}

export default Wallet; 
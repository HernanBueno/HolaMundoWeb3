import { useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";

export default function Home() {
  const { activate, active, deactivate, error, account, chainID } =
    useWeb3React();

  const connect = useCallback(() => {
      activate(connector);
      localStorage.setItem("previouslyConnected", true);
    }, [activate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

 

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  if (error) {
    return <p>Error</p>;
  }
  return (
    <div className={styles.container}>
      <h1> Web3 prueba </h1>
      {active ? (
        <>
          <button onClick={disconnect}>Disconnect from wallet</button>
          <p>
            Connected to network ID : {chainID} <br />
            Your account : {account}
          </p>
        </>
      ) : (
        <button onClick={connect}> Connect Wallet </button>
      )}
    </div>
  );
}

import { useWeb3Context } from "../context/web3Context";

const Home = () => {
  const { address, connect, disconnect } = useWeb3Context();
  return (
    <div className="container mt-5">
      <h2 className="text-center pt-5 mb-3">Login demo with Metamask</h2>
      <div className="p-4">
        {address ? (
          <> 
            <div className="border m-3 p-3 mx-auto" style={{maxWidth: "500px"}}>
              <div className="mb-2">Address: {address}</div>
              <div className="mb-2">Name: AAA</div>
              <div className="mb-2">Email: test@example.com</div>
            </div>
            <div className="text-center mt-5">
              <button className="btn btn-danger" onClick={disconnect}>Logout</button>
            </div>
          </>
        ) : (
          <div className="mt-5 text-center">
            <button className="btn btn-primary" onClick={connect}>Connect Wallet</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

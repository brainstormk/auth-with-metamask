import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useWeb3Context } from "./context/web3Context";

import Home from './pages/Home'

function App() {
  const { connect, hasCachedProvider } = useWeb3Context();

  useEffect(() => {
    if (hasCachedProvider()) {
      // then user DOES have a wallet
      connect().then((msg) => {
        if (msg.type === "error") {
          alert(msg);
        }
      });
    } else {
      // then user DOES NOT have a wallet
    }
    // We want to ensure that we are storing the UTM parameters for later, even if the user follows links
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="crt">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

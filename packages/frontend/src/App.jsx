import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useWeb3Context } from "./context/web3Context";
import { useAxios } from "./hooks/useAxios";

import Home from "./pages/Home";
import { fetchUserInfoAsync, setUser } from "./state/auth";
import { fetchProfile } from "./state/auth/fetchUser";
import { useSignIn } from "./state/auth/hooks";
import { useAuthState } from "./state/hooks";

function App() {
  const dispatch = useDispatch();
  const { address, connect, hasCachedProvider } = useWeb3Context();
  const { user, token } = useAuthState();

  useAxios();
  useSignIn()

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

  useEffect(() => {
    if (address && (!user?.name || user?.address !== address?.toLowerCase()) && !token) {
      dispatch(fetchUserInfoAsync(address));
    }
  }, [address, user?.name, user?.address, token, dispatch]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await fetchProfile(address)
      dispatch(setUser(data))
    }

    if(address && token) fetchUserInfo()
  }, [address, token, dispatch])

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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useWeb3Context } from "../context/web3Context";
import { loggedOut, setUser } from "../state/auth";
import { useAuthState } from "../state/hooks";
import { fetchProfile } from "../state/auth/fetchUser";

const Home = () => {
  const dispatch = useDispatch();
  const { address, connect, disconnect } = useWeb3Context();
  const { user } = useAuthState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user?.name, user?.email]);

  const handleDisconnect = async () => {
    disconnect();
    dispatch(loggedOut());
    localStorage.removeItem("authToken");
  };

  const handleUpdate = async () => {
    if (!name || !email || name === "" || email === "") {
      alert("Please fill name & email");
      return;
    }

    const res = await axios.post("/api/user/register", { address, name, email });
    if (res.data.status) {
      const data = await fetchProfile(address);
      dispatch(setUser(data));
    } else {
      alert(res.data.message)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center pt-5 mb-3">Login demo with Metamask</h2>
      <div className="p-4">
        {address ? (
          <>
            <div className="border m-3 p-3 mx-auto" style={{ maxWidth: "500px" }}>
              <div className="mb-2">Address: {address}</div>

              {user?.isRegistered === undefined ? (
                <div className="mt-3">Loading...</div>
              ) : (
                <>
                  <div className="mb-2">
                    <span>Name:</span>
                    {user?.name ? (
                      <span className="ml-3">{user?.name}</span>
                    ) : (
                      <input className="ml-3" value={name} onChange={(e) => setName(e.target.value)} />
                    )}
                  </div>
                  <div className="d-flex mb-2">
                    <span className="mr-1">Email: </span>
                    {user?.email ? (
                      <span className="ml-3">{user?.email}</span>
                    ) : (
                      <input className="ml-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                    )}
                  </div>
                </>
              )}

              {user?.isRegistered !== undefined && !user.isRegistered && (
                <button className="btn btn-primary mt-2 ml-5" onClick={handleUpdate}>
                  Submit
                </button>
              )}
            </div>
            <div className="text-center mt-5">
              <button className="btn btn-danger" onClick={handleDisconnect}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="mt-5 text-center">
            <button className="btn btn-primary" onClick={connect}>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

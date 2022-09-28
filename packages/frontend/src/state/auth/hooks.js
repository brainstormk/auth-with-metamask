import axios from "axios";
import Querystring from "query-string";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAuthState } from "../hooks";
import { loggedIn, loggedOut, setLoading, setUser } from ".";
import { fetchProfile } from "./fetchUser";
import { useWeb3Context } from "../../context/web3Context";

export const useSignIn = async () => {
  const dispatch = useDispatch();

  const { address: account, provider } = useWeb3Context();
  const { user, token, dataLoading } = useAuthState();

  useEffect(() => {
    if (!account || !provider || token) return;

    if (dataLoading) {
      console.log("already signing");
      return;
    }
    if (!user?.nonce) {
      console.log("nonce is invalid");
      return;
    }

    if (user?.address && user?.address === account?.toLowerCase()) {
      dispatch(loginUser(account, user.nonce, provider.getSigner()));
    }
  }, [dataLoading, user?.address, user?.nonce, account, token, provider, dispatch]);
};

export const loginUser = (account, nonce, signer) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const signature = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`);

    if (signature) {
      const { data } = await axios.post(`/api/login`, Querystring.stringify({ address: account, signature }));
      const { token } = data;
      if (token) {
        dispatch(loggedIn(token));
        localStorage.setItem("authToken", token);
      }
    }
  } catch (err) {
    dispatch(setLoading(false));
    console.log(err);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(loggedOut());
  localStorage.removeItem("authToken");
};

import axios from "axios";

export const fetchUser = async (address) => {
  try {
    const res = await axios.get(`/api/user/${address}`);
    return res.data.user;
  } catch (error) {
    return null;
  }
};

export const fetchProfile = async (address) => {
  try {
    const res = await axios.post(`/api/me/profile`, {address});
    return res.data;
  } catch (error) {
    return null;
  }
};

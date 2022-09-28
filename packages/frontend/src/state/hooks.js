import { useSelector } from "react-redux";

// auth
export const useAuthState = () => useSelector((state) => state.auth);

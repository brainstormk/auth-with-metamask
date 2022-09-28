import axios from 'axios'
import { useDispatch } from 'react-redux';
import { removeToken } from '../state/auth';
import { useAuthState } from '../state/hooks';

export function useAxios() {
  const dispatch = useDispatch();
  const { token } = useAuthState();
  /* eslint no-param-reassign: [2, { "props": false }] */
  axios.interceptors.request.use(request => {
    if(request.url?.indexOf('http') < 0) {
      request.url = process.env.REACT_APP_API_URL + request.url
      
      if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
    
    request.timeout = 300000;
    
    return request
  })
  
  axios.interceptors.response.use(response => {
    return Promise.resolve(response);
  }, error => {
    console.log(error)

    if (error.response?.status === 401 || error.response?.status === 403) {
      dispatch(removeToken())
      // window.location.reload();
    }
  
    return Promise.reject(error)
  })
}

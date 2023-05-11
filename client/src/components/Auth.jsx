import checkToken from '@/utils/checkToken';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Auth({ children }) {
  const { logged_in } = useSelector(state => state.user);

  useEffect(() => {
    if (!logged_in) {
      checkToken().then((res) => {
      }).catch((err) => {
        console.log(err);
      })
    };
  }, [])
  return (
    <>{children}</>
  )
}

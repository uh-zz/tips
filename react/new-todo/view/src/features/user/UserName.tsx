import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUser } from './userSlice';

export const UserName = () => {
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.user.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div style={{ width: 200, height: 200, backgroundColor: 'pink' }}>
      {user.name ? user.name : status + '...'}
    </div>
  );
};

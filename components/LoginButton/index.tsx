import React from 'react';
import styles from './LoginButton.module.scss';
import Icon3D from '../Icon3D';

const LoginButton: React.FC = () => {
  return (
    <button className={styles['login-button']}>
      <Icon3D name="person" size={18} className={styles['login-button__icon']} />
      <span className={styles['login-button__text']}>Login</span>
    </button>
  );
};

export default LoginButton; 
"use client";

import styles from './login.module.css'
import { useEffect, useState } from 'react';
import useAxios from "axios-hooks";
// import { toast} from 'react-toastify';



interface Data {
  tokens: {
    email: string;
    password: string;
    token: string;
  };
}

interface TokenProps {
  params: {
    token: string;
  },
  searchParams: string;
}


export default function Token({ params, searchParams }: TokenProps) {
  console.log(params.token)
  // return <div>Token: {params.token}</div>
  //Variables de username y password
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

  //Request de changePasswordUser
  const [, login] = useAxios<Data>(
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/change-password`,
      method: "PUT",
    },
    { manual: true }
  );



  //Acción de hacer login
  const changePasswordUser = async (usrEmail: string, usrPassword: string, resetToken: string) => {
    const data = await login({
      data: {
        usrEmail: usrEmail,
        usrPassword: usrPassword,
        resetToken: resetToken
      },
    });
    console.log(data.data);

  };


  //Operación al persionar el botón del login
  function submitLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log('El valor del input es:', emailValue, passwordValue,params.token);
    //changePasswordUser(emailValue, passwordValue, params.token);

    if(emailValue.length==0){
      console.log('no email')
      return 
    }

    if(passwordValue.length==0){
      console.log('no pw')
      return 
    }

    if(confirmPasswordValue.length==0){
      console.log('confirmalo we')
      return 
    }

    if (passwordValue !== confirmPasswordValue) {
      console.log('contrasenas deben ser iguales')
      // toast('Las contraseñas deben ser las mismas',{
      //   position:'top-center',autoClose: 100, draggable: true});
      return;
    }

    changePasswordUser(emailValue, passwordValue, params.token);


  }

  function handleInputEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(event.target.value);
  }

  function handleInputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(event.target.value);
  }


  function handleInputConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPasswordValue(event.target.value);
  }

  return (
    <div className={styles['flex-container']}>
      <div className={styles['left-column']}>

      </div>
      <div className={styles['right-column']}>
        <div className={styles['logo-container']}>
          <img src="/assets/logo.png" alt="Logo" />
        </div>
        <div className={styles['welcome-container']}>
          <p className={styles.welcome}>Cambiar Contraseña</p>
        </div>

        <div className={styles['username-container']}>
          <p className={styles.username}>Email de usuario</p>

          <div className={styles['input-container']}>
            <input
              type="text"
              placeholder="Introduzca su nombre de usuario"
              value={emailValue}
              onChange={handleInputEmailChange}
              className={styles['input-field']
              }
            />
          </div>
        </div>

        <div className={styles['password-container']}>
          <div className={styles['password-text-container']}>
            <p className={styles.password}>Contraseña</p>
          </div>
          <div className={styles['input-container']}>
            <input
              type="password"
              placeholder="Introduzca su contraseña"
              value={passwordValue}
              onChange={handleInputPasswordChange}
              className={styles['input-field']}
            />
          </div>
        </div>

        <div className={styles['password-container']}>
          <div className={styles['password-text-container']}>
            <p className={styles.password}>Confirmar contraseña</p>
          </div>
          <div className={styles['input-container']}>
            <input
              type="password"
              placeholder="Confirme su contraseña"
              value={confirmPasswordValue}
              onChange={handleInputConfirmPasswordChange}
              className={styles['input-field']}
            />
          </div>
        </div>

        <button onClick={submitLogin} className={`${styles['login-button']}`}>
          Cambiar Contraseña
        </button>


      </div>
    </div>
  )



}

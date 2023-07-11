"use client";

import styles from './login.module.css'
import { useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import { useAuthContext } from '../context/authContext';
import Data from '../interfaces/data';
import User from '../interfaces/user';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../context/userContext';





export default function LoginPage() {
    const { setUser } = useUserContext();
    const router = useRouter();

    //Variables de username y password
    const [usernameValue, setusernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');


    //Token como contexto
    const { token, setToken } = useAuthContext();


    //Request de login
    const [, login] = useAxios<Data>(
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/login`,
            method: "POST",
        },
        { manual: true }
    );



    //Acción de hacer login
    const loginUser = async (username: string, password: string) => {
        try {
            const data = await login({
                data: {
                    usrEmail: username,
                    usrPassword: password
                },
            });
            const userData = data.data.user;
            console.log(data.data);
            setToken(data.data.tokens.accessToken);

            const user: User = {
                nombre: userData.usrNombre,
                apPaterno: userData.usrApPaterno,
                apMaterno: userData.usrApMaterno,
                ci: userData.usrCi,
                fechaNacimiento: userData.usrFechaNacimiento,
                sexo: userData.usrSexo,
                direccion: userData.usrDireccion,
                celular: userData.usrCelular,
                email: userData.usrEmail,
                tipoUsuario: userData.usrTipoUsuario,
                foto: userData.usrFoto,
                estado: userData.usrEstado,
            };

            setUser(user);
            router.push('/inicio');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                let errorMessage = error.response.data.message;
                if (Array.isArray(errorMessage)) {
                    errorMessage = errorMessage.join(', ');
                }

                toast.error(errorMessage);
            } else {
                toast.error("Error en el servidor. Por favor, inténtalo de nuevo más tarde.");
            }
        }
    };


    //Operación al persionar el botón del login
    function submitLogin(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        //console.log('El valor del input es:', usernameValue, passwordValue);
        loginUser(usernameValue, passwordValue);

    }






    function handleInputUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setusernameValue(event.target.value);
    }

    function handleInputPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPasswordValue(event.target.value);
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
                    <p className={styles.welcome}>Bienvenido de vuelta</p>
                </div>

                <div className={styles['username-container']}>
                    <p className={styles.username}>Email</p>

                    <div className={styles['input-container']}>
                        <input
                            type="text"
                            placeholder="Introduzca su email"
                            value={usernameValue}
                            onChange={handleInputUsernameChange}
                            className={styles['input-field']
                            }
                        />
                    </div>
                </div>

                <div className={styles['password-container']}>
                    <div className={styles['password-text-container']}>
                        <p className={styles.password}>Contraseña</p>
                        <p onClick={e => router.push('/recover-password')} className={styles['forgot-password']}>¿Has olvidado tu contraseña?</p>
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

                <button onClick={submitLogin} className={`${styles['login-button']}`}>
                    Iniciar sesión
                </button>
                <button onClick={e => router.push('/register')} className={`${styles['login-button']}`}>
                    Registrarse
                </button>

            </div>
            <ToastContainer />
        </div>
    )
}
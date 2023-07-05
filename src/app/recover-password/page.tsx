"use client";

import styles from './login.module.css'
import { useEffect, useState } from 'react';
import useAxios from "axios-hooks";

interface Data {
    tokens: {
        accessToken: string;
    };
}

export default function RecoverPasswordPage() {

    //Variables de username y password
    const [emailValue, setemailValue] = useState('');
    const [, reset_password] = useAxios<Data>(
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}api/mail/recover-password`,
            method: "POST",
        },
        { manual: true }
    );



    //Acción de hacer reset_password
    const resetPasswordUser = async (usrEmail: string) => {
        const data = await reset_password({
            data: {
                usrEmail: usrEmail
            },
        });
        console.log(data.data);
    };


    //Operación al persionar el botón del reset_password
    function submitreset_password(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        //console.log('El valor del input es:', emailValue, passwordValue);
        resetPasswordUser(emailValue);

    }

    function handleInputUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setemailValue(event.target.value);
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
                    <p className={styles.welcome}>Olvidaste tu contraseña</p>
                </div>

                <div className={styles['email-container']}>
                    <p className={styles.username}>Email de usuario</p>

                    <div className={styles['input-container']}>
                        <input
                            type="text"
                            placeholder="Introduzca su email de usuario"
                            value={emailValue}
                            onChange={handleInputUsernameChange}
                            className={styles['input-field']
                            }
                        />
                    </div>
                </div>


                <button onClick={submitreset_password} className={`${styles['reset-button']}`}>
                    Enviar Email de Recuperación
                </button>
                

            </div>
        </div>
    )
}
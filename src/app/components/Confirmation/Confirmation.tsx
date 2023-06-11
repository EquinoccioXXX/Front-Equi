"use client";

import { useEffect, useState } from 'react';
import styles from './Confirmation.module.css'

interface ConfirmationPageProps {
    productName: string;
    quantity: number;
    id: string;
    date: string;
    time: string;
    username: string;
    price: number;
    discount: number;
    onAccept: () => void;
    isVisible: boolean;
}

const Confirmation: React.FC<ConfirmationPageProps> = ({
    productName,
    quantity,
    id,
    date,
    time,
    username,
    price,
    discount,
    onAccept,
    isVisible,
}) => {

    const [isComponentVisible, setIsComponentVisible] = useState(isVisible);



    const handleReject = () => {
        // Lógica para rechazar la venta
        console.log('Venta rechazada');
        setIsComponentVisible(false);
    };

    useEffect(() => {
        setIsComponentVisible(isVisible);
    }, [isVisible]);

    if (!isComponentVisible) {
        return null; // Devolver null si el componente no debe ser visible
    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Confirmación de Venta</h2>
            <p className={styles.data}>Producto: {productName}</p>
            <p className={styles.data}>Cantidad: {quantity}</p>
            <p className={styles.data}>ID: {id}</p>
            <p className={styles.data}>Fecha: {date}</p>
            <p className={styles.data}>Hora: {time}</p>
            <p className={styles.data}>Usuario: {username}</p>
            <p className={styles.data}>Precio: {price}</p>
            <p className={styles.data}>Descuento: {discount}</p>
            <div className={styles.buttonContainer}>
                <button className={`${styles.button} ${styles.acceptButton}`} onClick={onAccept}>
                    Aceptar
                </button>
                <button className={`${styles.button} ${styles.rejectButton}`} onClick={handleReject}>
                    Rechazar
                </button>
            </div>
        </div>
    );
};

export default Confirmation;
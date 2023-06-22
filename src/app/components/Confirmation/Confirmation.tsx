"use interface";

import { useState } from 'react';
import styles from './Confirmation.module.css';

interface SalesData {
  VentIdVent: number;
  VentProducto: string;
  VentCantidad: number;
  VentSubTotal: number;
  VentTotal: number;
  VentUser: string;
  VentObs: string;
  VentFecha: string;
}

interface ConfirmationPageProps {
  salesData: SalesData;
  onAccept: () => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Confirmation: React.FC<ConfirmationPageProps> = ({ salesData, isVisible, onAccept, setIsVisible }) => {

  const handleReject = () => {
    // Lógica para rechazar la venta
    console.log('Venta rechazada');
    setIsVisible(false);
  };

  return isVisible ? (
    <div className={styles['modalContainer']}>
      <div className={styles['modal']}>
        <div className={styles['modalContent']}>
          <h2 className={styles['title']}>Confirmación de Venta</h2>
          <p className={styles['data']}>ID: {salesData.VentIdVent}</p>
          <p className={styles['data']}>Producto: {salesData.VentProducto}</p>
          <p className={styles['data']}>Cantidad: {salesData.VentCantidad}</p>
          <p className={styles['data']}>Subtotal: {salesData.VentSubTotal}</p>
          <p className={styles['data']}>Total: {salesData.VentTotal}</p>
          <p className={styles['data']}>Usuario: {salesData.VentUser}</p>
          <p className={styles['data']}>Observaciones: {salesData.VentObs}</p>
          <p className={styles['data']}>Fecha: {salesData.VentFecha}</p>
          <div className={styles['buttonContainer']}>
            <button className={`${styles['button']} ${styles['acceptButton']}`} onClick={onAccept}>
              Aceptar
            </button>
            <button className={`${styles['button']} ${styles['rejectButton']}`} onClick={handleReject}>
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Confirmation;

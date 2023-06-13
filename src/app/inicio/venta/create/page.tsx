"use client";
import TopBar from '@/app/components/TopBar/TopBar';
import React, { useState } from 'react';
import styles from './createSalesPage.module.css';

interface SalesData {
    VentIdVent: string;
    VentTotal: string;
    VentSubTotal: string;
    VentIdPedido: string;
    VentCodFactura: string;
    VentFecha: string;
}

const CreateSalesPage = () => {
    const [salesData, setSalesData] = useState<SalesData>({
        VentIdVent: '',
        VentTotal: '',
        VentSubTotal: '',
        VentIdPedido: '',
        VentCodFactura: '',
        VentFecha: new Date().toISOString(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSalesData({
            ...salesData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de campos numéricos
        if (
            !isNaN(Number(salesData.VentIdVent)) &&
            !isNaN(Number(salesData.VentTotal)) &&
            !isNaN(Number(salesData.VentSubTotal)) &&
            !isNaN(Number(salesData.VentIdPedido))
        ) {
            // Aquí puedes realizar la lógica para enviar los datos de la venta al servidor

            // Luego puedes resetear los campos del formulario
            setSalesData({
                VentIdVent: '',
                VentTotal: '',
                VentSubTotal: '',
                VentIdPedido: '',
                VentCodFactura: '',
                VentFecha: new Date().toISOString(),
            });
        }
    };

    return (
        <>
            <TopBar />
            <div className={styles['flex-container']}>
                <div className={styles['content-container']}>
                    <form className={styles['form-container']} onSubmit={handleSubmit}>
                        <div className={styles['inputs-container']}>
                            <div className={styles['column']}>
                                <label htmlFor="id">ID:</label>
                                <input
                                    type="number"
                                    id="id"
                                    name="VentIdVent"
                                    value={salesData.VentIdVent}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="total">Total:</label>
                                <input
                                    type="number"
                                    id="total"
                                    name="VentTotal"
                                    value={salesData.VentTotal}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="subtotal">Subtotal:</label>
                                <input
                                    type="number"
                                    id="subtotal"
                                    name="VentSubTotal"
                                    value={salesData.VentSubTotal}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="pedido">ID del Pedido:</label>
                                <input
                                    type="number"
                                    id="pedido"
                                    name="VentIdPedido"
                                    value={salesData.VentIdPedido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="factura">Código de Factura:</label>
                                <input
                                    type="text"
                                    id="factura"
                                    name="VentCodFactura"
                                    value={salesData.VentCodFactura}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles['buttons-container']}>
                            <button type="submit" className={styles['button-submit']}>
                                Confirmar
                            </button>
                            <button type="button" className={styles['button-submit']} onClick={handleSubmit}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateSalesPage;

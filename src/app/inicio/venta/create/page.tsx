"use client";

import TopBar from '@/app/components/TopBar/TopBar';
import React, { useState, useEffect } from 'react';
import styles from './createSalesPage.module.css';
import Confirmation from '../../../components/Confirmation/Confirmation';
import useAxios from 'axios-hooks';
import { useUserContext } from '../../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Producto {
    nombre: string;
    precio: number;
}

interface SalesData {
    VentIdVent: number;
    VentProducto: string;
    VentCantidad: number;
    VentSubTotal: number;
    VentTotal: number;
    VentUser: string;
    VentObs: string;
    VentFecha: string;
    VentCodFactura: string;
    VentIdPedido: number
}

const productos: Producto[] = [
    { nombre: 'Producto 1', precio: 10 },
    { nombre: 'Producto 2', precio: 20 },
    { nombre: 'Producto 3', precio: 30 },
    { nombre: 'Producto 4', precio: 40 },

];

const CreateSalesPage = () => {
    const { user } = useUserContext();
    const [salesData, setSalesData] = useState<SalesData>({
        VentIdVent: 0,
        VentProducto: '',
        VentCantidad: 0,
        VentSubTotal: 0,
        VentTotal: 0,
        VentUser: user ? user.nombre : "Indefinido",
        VentObs: '',
        VentFecha: new Date().toLocaleString(),
        VentCodFactura: "200 doscientos",
        VentIdPedido: 200
    });
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    useEffect(() => {
        const subtotal = getProductPrice(salesData.VentProducto) * salesData.VentCantidad;
        const total = calculateTotal(subtotal, salesData.VentCantidad);
        setSalesData((prevData) => ({
            ...prevData,
            VentSubTotal: subtotal,
            VentTotal: total,
        }));
    }, [salesData.VentProducto, salesData.VentCantidad]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setSalesData({
            ...salesData,
            [e.target.name]: e.target.value,
        });
    };

    const [, create] = useAxios<SalesData>(
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}api/ventas`,
            method: "POST",
        },
        { manual: true }
    );



    const CreateSale = async () => {
        try {
            const data = await create({
                data: {
                    ...salesData,
                    VentCantidad: parseInt(salesData.VentCantidad)
                },
            });
            console.log(data.data);
            toast.success('Venta creada exitosamente'); // Mostrar toast de éxito
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al crear la venta'); // Mostrar toast de error
        }
    };



    const handleProductButtonClick = (productName: string) => {
        const selectedProduct = productos.find((product) => product.nombre === productName);

        if (selectedProduct) {
            setSalesData({
                ...salesData,
                VentProducto: selectedProduct.nombre,
            });
        }
    };

    const handleDiscountCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const discount = e.target.checked ? 20 : 0;
        const subtotal = getProductPrice(salesData.VentProducto) * salesData.VentCantidad;
        const total = calculateTotal(subtotal, salesData.VentCantidad, discount);

        setSalesData({
            ...salesData,
            VentSubTotal: subtotal,
            VentTotal: total,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConfirmationVisible(true);
    };

    const handleAcceptSale = () => {
        CreateSale()
        setIsConfirmationVisible(false);
    };

    const getProductPrice = (productName: string) => {
        const product = productos.find((p) => p.nombre === productName);
        return product ? product.precio : 0;
    };

    const calculateTotal = (subtotal: number, quantity: number, discount: number = 0) => {
        const partialTotal = subtotal * quantity;
        const total = partialTotal * (100 - discount) / 100;
        return total;
    };

    return (
        <>
            <TopBar />
            <div className={styles['flex-container']}>
                <div className={styles['content-container']}>
                    <form className={styles['form-container']} onSubmit={handleSubmit}>
                        <div className={styles['inputs-container']}>
                            <div className={styles['column']}>
                                <label htmlFor="product">Producto:</label>
                                <div className={styles['buttons-row']}>
                                    {productos.map((product) => (
                                        <button
                                            key={product.nombre}
                                            type="button"
                                            className={styles['product-button']}
                                            onClick={() => handleProductButtonClick(product.nombre)}
                                        >
                                            {product.nombre}
                                        </button>
                                    ))}
                                </div>
                                <select
                                    name="VentProducto"
                                    value={salesData.VentProducto}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar producto</option>
                                    {productos.map((product) => (
                                        <option key={product.nombre} value={product.nombre}>
                                            {product.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="quantity">Cantidad:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="VentCantidad"
                                    value={salesData.VentCantidad.toString()}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="discount">Descuento:</label>
                                <div className={styles['checkbox-container']}>
                                    <input
                                        type="checkbox"
                                        id="discount"
                                        onChange={handleDiscountCheckboxChange}
                                    />
                                    <label className={styles['checkbox-label']} htmlFor="discount">Aplicar descuento</label>
                                </div>
                            </div>
                            <div className={styles['observations-container']}>
                                <label className={styles['observations-label']} htmlFor="observations">Observaciones:</label>
                                <textarea
                                    id="observations"
                                    name="VentObs"
                                    value={salesData.VentObs}
                                    onChange={handleChange}
                                    className={styles['observations-textarea']}
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className={styles['buttons-container']}>
                            <button type="submit" className={styles['submit-button']}>
                                Realizar venta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isConfirmationVisible && (
                <Confirmation
                    salesData={salesData}
                    onAccept={handleAcceptSale}
                    isVisible={isConfirmationVisible}
                    setIsVisible={setIsConfirmationVisible}
                />
            )}
            <ToastContainer />
        </>
    );
};

export default CreateSalesPage;

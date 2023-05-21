"use client";
import styles from './inventarioReporte.module.css'
import React, { useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import axios from 'axios';
import TopBar from '../../../components/TopBar/TopBar';

export default function InventarioReportePage() {
    const [formState, setFormState] = useState({
        fecha: "",
        producto: "",
        cantidad: "",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted with state:", formState);
        const now = new Date();
        //Obtener la fecha actual
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        console.log(formattedDate);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };


    const [{ data, loading, error }, downloadReport] = useAxios<>(
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}api/report/inventory`,
            method: 'GET',
            responseType: 'blob',
        },
        { manual: true }
    );

    const handleClick = () => {
        downloadReport();
    };

    useEffect(() => {
        if (data) {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        }
    }, [data]);



    return (
        <div className={styles['flex-container']}>
            <TopBar />
            <div className={styles['content-container']}>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-container']}>
                        <div className={styles['inputs-container']}>
                            <div className={styles['column']}>
                                <label htmlFor="proveedor">Proveedor:</label>
                                <select
                                    id="fecha"
                                    name="fecha"
                                    value={formState.fecha}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                >
                                    <option value="">Sin orden</option>
                                    <option value="reciente">Más reciente</option>
                                    <option value="antiguo">Más antiguo</option>
                                </select>

                                <label htmlFor="producto">Producto:</label>
                                <select
                                    id="producto"
                                    name="producto"
                                    value={formState.producto}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                >
                                    <option value="">Sin orden</option>
                                    <option value="ascendente">Ascendente</option>
                                    <option value="descendente">Descendente</option>
                                </select>

                                <label htmlFor="cantidad">Tipo de ingreso:</label>
                                <select
                                    id="cantidad"
                                    name="cantidad"
                                    value={formState.cantidad}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                >
                                    <option value="">Sin orden</option>
                                    <option value="mayorAMenor">De mayor a menor</option>
                                    <option value="menorAMAyor">De menor a mayor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={styles['buttons-container']}>
                        <input type="submit" value="Generar reporte con filtros" className={styles['button-submit']} />
                        <button className={styles['button-submit']} onClick={handleClick}>Generar reporte general</button>
                    </div>
                </form>
            </div>
        </div >
    )
}
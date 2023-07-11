"use client";
import styles from './ventaReporte.module.css'
import React, { useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import axios from 'axios';
import TopBar from '../../../components/TopBar/TopBar';
import querystring from "querystring";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VentaReportePage() {
    const [formState, setFormState] = useState({
        fechaInicio: "",
        fechaFin: "",
        campo: "",
        producto: "",
        cantidad: "",
        orden: "",
        ci: "",
    });

    interface QueryParams {
        userCI?: string;
        date1?: string;
        date2?: string;
        field?: string;
        producto?: string;
        cantidad?: string;
        asc?: string;
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted with state:", formState);
        const queryParams: QueryParams = {};
        if (formState.ci) {
            queryParams.userCI = formState.ci;
        }
        if (formState.fechaInicio) {
            const fechaInicio = new Date(formState.fechaInicio);
            const month = fechaInicio.getUTCMonth() + 1;
            const day = fechaInicio.getUTCDate();
            const year = fechaInicio.getUTCFullYear();
            queryParams.date1 = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
        }

        if (formState.fechaFin) {
            const fechaFin = new Date(formState.fechaFin);
            const month = fechaFin.getUTCMonth() + 1;
            const day = fechaFin.getUTCDate();
            const year = fechaFin.getUTCFullYear();
            queryParams.date2 = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
        }

        if (formState.campo) {
            queryParams.field = formState.campo;
        }

        if (formState.orden) {
            if (formState.orden === "ascendente") {
                queryParams.asc = "true";
            } else if (formState.orden === "descendente") {
                queryParams.asc = "false";
            }
        }

        if (formState.producto) {
            queryParams.producto = formState.producto;
        }

        if (formState.cantidad) {
            queryParams.cantidad = formState.cantidad;
        }




        const queryString = querystring.stringify(queryParams as querystring.ParsedUrlQueryInput, "&");
        console.log(queryString);

        try {
            toast.info('La descarga está comenzando...', {
                autoClose: 2000, // Duración del mensaje en milisegundos (opcional)
            });
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/report/user/sales?${queryString}`, {
                responseType: 'blob',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };





    return (
        <div className={styles['flex-container']}>
            <TopBar />
            <div className={styles['content-container']}>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-container']}>
                        <div className={styles['inputs-container']}>
                            <div className={styles['column']}>
                                <label htmlFor="ci">CI:</label>
                                <input
                                    id="ci"
                                    name="ci"
                                    value={formState.ci}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required // Hace que el campo sea obligatorio
                                />
                                <label htmlFor="fechaInicio">Fecha inicio:</label>
                                <input
                                    type="date"
                                    id="fechaInicio"
                                    name="fechaInicio"
                                    value={formState.fechaInicio}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                />

                                <label htmlFor="fechaFin">Fecha fin:</label>
                                <input
                                    type="date"
                                    id="fechaFin"
                                    name="fechaFin"
                                    value={formState.fechaFin}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                />

                                <label htmlFor="campo">Campo:</label>
                                <input
                                    id="campo"
                                    name="campo"
                                    value={formState.campo}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                />

                                <label htmlFor="producto">Producto:</label>
                                <input
                                    id="producto"
                                    name="producto"
                                    value={formState.producto}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                />

                                <label htmlFor="cantidad">Cantidad:</label>
                                <input
                                    id="cantidad"
                                    name="cantidad"
                                    type="number"
                                    value={formState.cantidad}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                />


                                <label htmlFor="orden">Orden:</label>
                                <select
                                    id="orden"
                                    name="orden"
                                    value={formState.orden}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                >
                                    <option value="">Sin orden</option>
                                    <option value="ascendente">Ascendente</option>
                                    <option value="descendente">Descendente</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={styles['buttons-container']}>
                        <input type="submit" value="Generar reporte con filtros" className={styles['button-submit']} />
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div >
    )
}
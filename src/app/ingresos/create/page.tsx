"use client";
import styles from './create.module.css'
import React, { useState } from 'react';
import useAxios from "axios-hooks";
import TopBar from '../../components/TopBar/TopBar';

export default function CreateIngresoPage() {
    const [formState, setFormState] = useState({
        fechaIngreso: "",
        cantidad: "",
        precioUnidad: "",
        descripcion: "",
        proveedor: "",
        producto: "",
        tipoIngreso: "",
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


    return (
        <div className={styles['flex-container']}>
            <TopBar />
            <div className={styles['content-container']}>
                <form onSubmit={handleSubmit}>
                    <div className={styles['form-container']}>
                        <div className={styles['inputs-container']}>
                            <div className={styles['column']}>
                                <label htmlFor="fechaIngreso">Fecha de ingreso:</label>
                                <input
                                    type="date"
                                    id="fechaIngreso"
                                    name="fechaIngreso"
                                    value={formState.fechaIngreso}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                />

                                <label htmlFor="cantidad">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidad"
                                    name="cantidad"
                                    value={formState.cantidad}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                />

                                <label htmlFor="precioUnidad">Precio por unidad:</label>
                                <input
                                    type="number"
                                    id="precioUnidad"
                                    name="precioUnidad"
                                    value={formState.precioUnidad}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                />

                                <label htmlFor="descripcion">Descripción:</label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    value={formState.descripcion}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                />
                            </div>
                            <div className={styles['column']}>
                                <label htmlFor="proveedor">Proveedor:</label>
                                <select
                                    id="proveedor"
                                    name="proveedor"
                                    value={formState.proveedor}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                >
                                    <option value="">Seleccione un proveedor</option>
                                    <option value="proveedor1">Proveedor 1</option>
                                    <option value="proveedor2">Proveedor 2</option>
                                    <option value="proveedor3">Proveedor 3</option>
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
                                    <option value="">Seleccione un producto</option>
                                    <option value="producto1">Producto 1</option>
                                    <option value="producto2">Producto 2</option>
                                    <option value="producto3">Producto 3</option>
                                </select>

                                <label htmlFor="tipoIngreso">Tipo de ingreso:</label>
                                <select
                                    id="tipoIngreso"
                                    name="tipoIngreso"
                                    value={formState.tipoIngreso}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                >
                                    <option value="">Seleccione un tipo de ingreso</option>
                                    <option value="tipo1">Tipo 1</option>
                                    <option value="tipo2">Tipo 2</option>
                                    <option value="tipo3">Tipo 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Enviar" className={styles['button-submit']} />
                </form>
            </div>
        </div >
    )
}
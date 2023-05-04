"use client";
import styles from './register.module.css'
import React, { useState } from 'react';
import useAxios from "axios-hooks";
import { useAuthContext } from '../../context/authContext';
import Data from '../../interfaces/data';

//Interfaz para el tipo de dato del formulario

interface FormData {
    InvFechaRegsitro: string;
    InvNumFactura: string;
    InvCantidad: string;
    InvPrecioPorUnidad: number;
    InvDescripcionIngreso: number;
    InvCodControl: string;
    InvNumAutorizacion: string;
    InvIdProveedor: string;
    InvIdProducto: string;
    InvTipoIngreso: string;
}

export default function LoginPage() {

    //Token como contexto
    const { token, setToken } = useAuthContext();

    //useState para controlar el estado del formulario
    const [formData, setFormData] = useState({
        InvFechaRegsitro: '',
        InvNumFactura: '',
        InvCantidad: '',
        InvPrecioPorUnidad: '',
        InvDescripcionIngreso: '',
        InvCodControl: '',
        InvNumAutorizacion: '',
        InvIdProveedor: '',
        InvIdProducto: '',
        InvTipoIngreso: ''
    });

    //UseState para controlar el estado de los errores
    const [errors, setErrors] = useState({
        InvFechaRegsitro: '',
        InvNumFactura: '',
        InvCantidad: '',
        InvPrecioPorUnidad: '',
        InvDescripcionIngreso: '',
        InvCodControl: '',
        InvNumAutorizacion: '',
        InvIdProveedor: '',
        InvIdProducto: '',
        InvTipoIngreso: ''
    });

    //Control de llenado del formulario
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        // Solo permitir números en InvCantidad e InvPrecioPorUnidad
        if (name === 'InvCantidad' || name === 'InvPrecioPorUnidad') {
            if (!(/^\d+$/.test(value))) {
                return;
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    //Verificación de los inputs al formulario y en caso de ser aceptados mandar el formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newErrors = {
            InvFechaRegsitro: '',
            InvNumFactura: '',
            InvCantidad: '',
            InvPrecioPorUnidad: '',
            InvDescripcionIngreso: '',
            InvCodControl: '',
            InvNumAutorizacion: '',
            InvIdProveedor: '',
            InvIdProducto: '',
            InvTipoIngreso: ''
        };

        if (!formData.InvFechaRegsitro) {
            newErrors.InvFechaRegsitro = 'La fecha es requerida';
        }

        if (!formData.InvNumFactura) {
            newErrors.InvNumFactura = 'Numero de factura requerida';
        }

        if (!formData.InvFechaRegsitro) {
            newErrors.InvCantidad = 'La cantidad del producto es requerido';
        }

        if (!formData.InvPrecioPorUnidad) {
            newErrors.InvPrecioPorUnidad = 'El precio por unidad es requerido';
        }

        if (!formData.InvCodControl) {
            newErrors.InvCodControl = 'El codigo es requerido';
        }

        if (!formData.InvNumAutorizacion) {
            newErrors.InvNumAutorizacion = 'Numero de autorizacion es requerido';
        }

        if (!formData.InvIdProveedor) {
            newErrors.InvIdProveedor = 'El Id del proveedor es requerido';
        }

        if (!formData.InvIdProducto) {
            newErrors.InvIdProducto = 'El Id del producto es requerido';
        }

        if (!formData.InvTipoIngreso) {
            newErrors.InvTipoIngreso = 'El tipo de ingreso es requerido';
        }

        setErrors(newErrors);

        console.log(newErrors)
        if (Object.values(newErrors).every((val) => val === '')) {
            // submit the form
            await RegisterUser()

        }
    };

    //Preparación de request al servidor
    const [, register] = useAxios<Data>(
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}api/inventory/create`,
            method: "POST",
        },
        { manual: true }
    );



    //Acción de hacer register
    const RegisterUser = async () => {
        const fechaObj: Date = new Date(formData.InvFechaRegsitro);
        const nuevaFecha: string = fechaObj.toLocaleDateString('es-ES');

        const data = await register({

            data: {
                "InvFechaRegsitro": String(nuevaFecha),
                "InvNumFactura": String(formData.InvNumFactura),
                "InvCantidad": parseInt(formData.InvCantidad),
                "InvPrecioPorUnidad": parseInt(formData.InvPrecioPorUnidad),
                "InvDescripcionIngreso": String(formData.InvDescripcionIngreso),
                "InvCodControl": String(formData.InvCodControl),
                "InvNumAutorizacion": String(formData.InvNumAutorizacion),
                "InvIdProveedor": String(formData.InvIdProveedor),
                "InvIdProducto": String(formData.InvIdProducto),
                "InvTipoIngreso": String(formData.InvTipoIngreso)

            }
            ,
        });
        console.log(data.data);
        setToken(data.data.tokens.accessToken);

    };


    return (
        <div className={styles['container']}>
            <form onSubmit={handleSubmit} className={styles["register-form"]}>
                <div className={styles['welcome-container']}>
                    <p className={styles.welcome}>Agregar Item</p>
                </div>
                <div className={styles["row"]}>
                    <div className={styles["col"]}>
                        <label htmlFor="idProd">Fecha de Registro:</label>
                        <div className={styles['input-container']}>
                            <input type="date" name="InvFechaRegsitro" value={formData.InvFechaRegsitro} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvFechaRegsitro && <span className={styles['error']}>{errors.InvFechaRegsitro}</span>}

                        <label htmlFor="apellido_paterno">Numero Factura:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvNumFactura" value={formData.InvNumFactura} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvNumFactura && <span className={styles['error']}>{errors.InvNumFactura}</span>}


                        <label htmlFor="apellido_materno">Cantidad:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvCantidad" value={formData.InvCantidad} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvCantidad && <span className={styles['error']}>{errors.InvCantidad}</span>}


                        <label htmlFor="carnet_identidad">Precio por Unidad:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvPrecioPorUnidad" value={formData.InvPrecioPorUnidad} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvPrecioPorUnidad && <span className={styles['error']}>{errors.InvPrecioPorUnidad}</span>}


                        <label htmlFor="fecha_nacimiento">Descripcion Ingreso:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvDescripcionIngreso" value={formData.InvDescripcionIngreso} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvDescripcionIngreso && <span className={styles['error']}>{errors.InvDescripcionIngreso}</span>}

                        <label htmlFor="fecha_nacimiento">Codigo de Control:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvCodControl" value={formData.InvCodControl} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvCodControl && <span className={styles['error']}>{errors.InvCodControl}</span>}

                        <label htmlFor="fecha_nacimiento">Numero de Autorizacion:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvNumAutorizacion" value={formData.InvNumAutorizacion} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvNumAutorizacion && <span className={styles['error']}>{errors.InvNumAutorizacion}</span>}

                        <label htmlFor="fecha_nacimiento">Id del Proveedor:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvIdProveedor" value={formData.InvIdProveedor} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvIdProveedor && <span className={styles['error']}>{errors.InvIdProveedor}</span>}

                        <label htmlFor="fecha_nacimiento">Id del Producto:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvIdProducto" value={formData.InvIdProducto} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvIdProducto && <span className={styles['error']}>{errors.InvIdProducto}</span>}

                        <label htmlFor="fecha_nacimiento">Tipo de Ingreso:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="InvTipoIngreso" value={formData.InvTipoIngreso} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.InvTipoIngreso && <span className={styles['error']}>{errors.InvTipoIngreso}</span>}



                    </div>


                    <button type="submit" className={styles['button-submit']}>Registrar</button>

                </div>
            </form>
        </div>

    );
};


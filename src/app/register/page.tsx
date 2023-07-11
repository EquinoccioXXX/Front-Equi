"use client";
import styles from './register.module.css'
import React, { useState } from 'react';
import useAxios from "axios-hooks";
import { useAuthContext } from '../context/authContext';
import Data from '../interfaces/data';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosResponse, AxiosError } from 'axios';//Interfaz para el tipo de dato del formulario

interface FormData {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    carnet_identidad: string;
    fecha_nacimiento: string;
    sexo: string;
    direccion: string;
    celular: string;
    email: string;
    password: string;
    foto: string;
    repeat_password: string;
}

export default function LoginPage() {
    const router = useRouter();

    //Token como contexto
    const { token, setToken } = useAuthContext();

    //useState para controlar ek estado del formulario
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        carnet_identidad: '',
        fecha_nacimiento: '',
        sexo: '',
        direccion: '',
        celular: '',
        email: '',
        password: '',
        foto: '',
        repeat_password: ''
    });

    //UseState para controlar el estado de los errores
    const [errors, setErrors] = useState<FormData>({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        carnet_identidad: '',
        fecha_nacimiento: '',
        sexo: '',
        direccion: '',
        celular: '',
        email: '',
        password: '',
        foto: '',
        repeat_password: '',
    });

    //Control de llenado del formulario
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    //Verificación de los inputs al formulario y en caso de ser aceptados mandar el formulario
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newErrors = {
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            carnet_identidad: '',
            fecha_nacimiento: '',
            sexo: '',
            direccion: '',
            celular: '',
            email: '',
            password: '',
            foto: '',
            repeat_password: ''
        };

        if (!formData.nombre) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.apellido_paterno) {
            newErrors.apellido_paterno = 'El apellido paterno es requerido';
        }

        if (!formData.apellido_materno) {
            newErrors.apellido_materno = 'El apellido materno es requerido';
        }

        if (!formData.carnet_identidad) {
            newErrors.carnet_identidad = 'El carnet de identidad es requerido';
        } else if (formData.carnet_identidad.length < 7) {
            newErrors.carnet_identidad = 'El carnet de identidad debe tener por lo menos 7 carácteres';
        }

        if (!formData.fecha_nacimiento) {
            newErrors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
        }
        // } else if (!isValidFechaDeNacimiento(formData.fecha_nacimiento)) {
        //     newErrors.fecha_nacimiento = 'Introduzca una fecha válida';
        // }

        if (!formData.apellido_materno) {
            newErrors.apellido_materno = 'El apellido materno es requerido';
        }

        if (formData.sexo === "") {
            newErrors.sexo = 'Seleccione una opción';
        }

        if (!formData.direccion) {
            newErrors.direccion = 'La dirección es requerdida';
        }

        if (!formData.celular) {
            newErrors.celular = 'El número de celular es requerido';
        } else if (!isValidCelular(formData.celular + "")) {
            newErrors.celular = 'Número de celular inválido';
        }

        if (!formData.email) {
            newErrors.email = 'Email es requerido';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Formato inválido de email';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerdida';
        }

        if (!formData.foto) {
            newErrors.foto = 'La url de imágen es requerdida';
        }

        if (!formData.repeat_password) {
            newErrors.repeat_password = 'Se requiere repetir la contraseña';
        } else if (formData.repeat_password != formData.password) {
            newErrors.repeat_password = 'Las contraseñas no son iguales';
        }



        setErrors(newErrors);

        console.log(newErrors)
        if (Object.values(newErrors).every((val) => val === '')) {
            // submit the form
            RegisterUser()

        }
    };

    //Preparación de request al servidor
    const [, register] = useAxios<Data>(
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/register`,
            method: "POST",
        },
        { manual: true }
    );



    //Acción de hacer register
    const RegisterUser = async () => {
        const fechaObj: Date = new Date(formData.fecha_nacimiento);
        //const nuevaFecha: string = fechaObj.toLocaleDateString('es-ES');
        const newSexo: string = (formData.sexo == "masculino") ? 'm' : 'f'


        try {
            const data = await register({

                data: {
                    "usrNombre": formData.nombre,
                    "usrApPaterno": formData.apellido_paterno,
                    "usrApMaterno": formData.apellido_materno,
                    "usrCi": formData.carnet_identidad,
                    "usrFechaNacimiento": fechaObj,
                    "usrSexo": newSexo,
                    "usrDireccion": formData.direccion,
                    "usrCelular": formData.celular,
                    "usrTipoUsuario": "Administrador",
                    "usrEmail": formData.email,
                    "usrPassword": formData.password,
                    "usrFoto": formData.foto,
                    "usrEstado": true
                }
                ,
            });
            console.log(data.data);
            setToken(data.data.tokens.accessToken);
            router.push('/login');
        } catch (error: any) {
            if (isAxiosError(error) && error.response) {
                const errorMessage = (error.response.data.message as string[]).join(', ');
                toast.error(errorMessage);
            }
        }
    };
    function isAxiosError(error: any): error is AxiosError {
        return error && error.isAxiosError;
    }


    //Verificacion de email correcto
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    //Verificación de celular válido
    const isValidCelular = (cel: string): boolean => {
        const celRegex = /^(\+\d{1,3}( )?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/;
        return celRegex.test(cel);
    };

    return (
        <div className={styles['container']}>
            <form onSubmit={handleSubmit} className={styles["register-form"]}>
                <div className={styles["row"]}>
                    <div className={styles["col"]}>
                        <label htmlFor="nombre">Nombre:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.nombre && <span className={styles['error']}>{errors.nombre}</span>}

                        <label htmlFor="apellido_paterno">Apellido Paterno:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.apellido_paterno && <span className={styles['error']}>{errors.apellido_paterno}</span>}


                        <label htmlFor="apellido_materno">Apellido Materno:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.apellido_materno && <span className={styles['error']}>{errors.apellido_materno}</span>}


                        <label htmlFor="carnet_identidad">Carnet de Identidad:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="carnet_identidad" value={formData.carnet_identidad} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.carnet_identidad && <span className={styles['error']}>{errors.carnet_identidad}</span>}


                        <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                        <div className={styles['input-container']}>
                            <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.fecha_nacimiento && <span className={styles['error']}>{errors.fecha_nacimiento}</span>}

                        <label htmlFor="foto">Dirección de la imagen:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="foto" value={formData.foto} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.foto && <span className={styles['error']}>{errors.foto}</span>}


                    </div>

                    <div className={styles["col"]}>
                        <label htmlFor="sexo">Sexo:</label>
                        <div className={styles['input-container']}>
                            <select name="sexo" value={formData.sexo} onChange={handleInputChange} className={styles['input-field']}>
                                <option value="">-- Seleccione --</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                        {errors.sexo && <span className={styles['error']}>{errors.sexo}</span>}


                        <label htmlFor="direccion">Dirección:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.direccion && <span className={styles['error']}>{errors.direccion}</span>}


                        <label htmlFor="celular">Celular:</label>
                        <div className={styles['input-container']}>
                            <input type="text" name="celular" value={formData.celular} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.celular && <span className={styles['error']}>{errors.celular}</span>}


                        <label htmlFor="email">Email:</label>
                        <div className={styles['input-container']}>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.email && <span className={styles['error']}>{errors.email}</span>}


                        <label htmlFor="password">Contraseña:</label>
                        <div className={styles['input-container']}>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.password && <span className={styles['error']}>{errors.password}</span>}

                        <label htmlFor="repeat_password">Repetir contraseña:</label>
                        <div className={styles['input-container']}>
                            <input type="password" name="repeat_password" value={formData.repeat_password} onChange={handleInputChange} className={styles['input-field']} />
                        </div>
                        {errors.repeat_password && <span className={styles['error']}>{errors.repeat_password}</span>}

                    </div>
                    <button type="submit" className={styles['button-submit']}>Registrar</button>

                </div>
            </form>

            <ToastContainer />
        </div>

    );
};


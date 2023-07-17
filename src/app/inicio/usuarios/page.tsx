"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './usuarios.module.css';
import TopBar from '@/app/components/TopBar/TopBar';

interface User {
    usrNombre: string;
    usrApPaterno: string;
    usrApMaterno: string;
    usrCi: string;
    usrFechaNacimiento: string;
    usrSexo: string;
    usrDireccion: string;
    usrCelular: string;
    usrTipoUsuario: string;
    usrEmail: string;
    usrPassword: string;
    usrFoto: string;
    usrEstado: boolean;
}

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState<User>({
        usrNombre: '',
        usrApPaterno: '',
        usrApMaterno: '',
        usrCi: '',
        usrFechaNacimiento: '',
        usrSexo: '',
        usrDireccion: '',
        usrCelular: '',
        usrTipoUsuario: '',
        usrEmail: '',
        usrPassword: '',
        usrFoto: '',
        usrEstado: false,
    });
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/users`);
            const data: User[] = response.data;

            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
            setUsers([]);
            toast.error('Error al obtener los usuarios');
        }
    };

    const handleEditModal = (user: User) => {
        setEditUser(user);
        setShowEditModal(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setEditUser((prevState) => ({
            ...prevState,
            [name]: inputValue,
        }));
    };


    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/edit`,
                editUser
            );

            const updatedUsers = users.map((user) =>
                user.usrCi === editUser.usrCi ? response.data : user
            );

            setUsers(updatedUsers);
            setShowEditModal(false);
            toast.success('Usuario actualizado exitosamente');
        } catch (error) {
            console.error('Error:', error);

            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message.join('. ');
                toast.error(errorMessage);
            } else {
                toast.error('Error al actualizar el usuario');
            }
        }
    };

    const handleDeleteModal = (user: User) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDelete = async (user: User) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/users/${user.usrCi}`);
            toast.success('El usuario se eliminó correctamente');
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Ocurrió un error al eliminar el usuario');
        }
    };

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.content}>
                <div className={styles.contentBox}>
                    <h1 className={styles.title}>Página de Administración de Usuarios</h1>

                    {users.length > 0 ? (
                        <div className={styles.result}>
                            <h2>Usuarios:</h2>
                            {users.map((user) => (
                                <div key={user.usrCi} className={`${styles.resultItem} ${styles.mobileResultItem}`}>
                                    <div className={styles.resultProperties}>
                                        <div className={styles.resultField}>
                                            <b>CI: </b>
                                            {user.usrCi}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Nombre: </b>
                                            {user.usrNombre}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Apellido Paterno: </b>
                                            {user.usrApPaterno}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Apellido Materno: </b>
                                            {user.usrApMaterno}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Email: </b>
                                            {user.usrEmail}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Tipo de Usuario: </b>
                                            {user.usrTipoUsuario}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Estado: </b>
                                            {user.usrEstado ? 'Activo' : 'Inactivo'}
                                        </div>
                                    </div>
                                    <div className={`${styles.resultButtons} ${styles.centeredButtons}`}>
                                        <button className={styles.editButton} onClick={() => handleEditModal(user)}>
                                            Editar
                                        </button>
                                        <button className={styles.deleteButton} onClick={() => handleDeleteModal(user)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>No se encontraron usuarios</div>
                    )}
                </div>
            </div>
            {showModal && selectedUser && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Confirmar eliminación</h3>
                        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                        <div className={styles.modalButtons}>
                            <button className={`${styles.modalButton} ${styles.confirmButton}`} onClick={() => handleDelete(selectedUser)}>
                                Confirmar
                            </button>
                            <button className={`${styles.modalButton} ${styles.cancelButton}`} onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Editar usuario</h3>
                        <form className={styles.form}>
                            <div className={styles.formField}>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    id="nombre"
                                    type="text"
                                    name="usrNombre"
                                    value={editUser.usrNombre}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                                <input
                                    id="apellidoPaterno"
                                    type="text"
                                    name="usrApPaterno"
                                    value={editUser.usrApPaterno}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="apellidoMaterno">Apellido Materno</label>
                                <input
                                    id="apellidoMaterno"
                                    type="text"
                                    name="usrApMaterno"
                                    value={editUser.usrApMaterno}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="ci">CI</label>
                                <input
                                    id="ci"
                                    type="text"
                                    name="usrCi"
                                    value={editUser.usrCi}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                <input
                                    id="fechaNacimiento"
                                    type="text"
                                    name="usrFechaNacimiento"
                                    value={editUser.usrFechaNacimiento}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="sexo">Sexo</label>
                                <input
                                    id="sexo"
                                    type="text"
                                    name="usrSexo"
                                    value={editUser.usrSexo}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    id="direccion"
                                    type="text"
                                    name="usrDireccion"
                                    value={editUser.usrDireccion}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="celular">Celular</label>
                                <input
                                    id="celular"
                                    type="text"
                                    name="usrCelular"
                                    value={editUser.usrCelular}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="tipoUsuario">Tipo de Usuario</label>
                                <input
                                    id="tipoUsuario"
                                    type="text"
                                    name="usrTipoUsuario"
                                    value={editUser.usrTipoUsuario}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="usrEmail"
                                    value={editUser.usrEmail}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    id="password"
                                    type="text"
                                    name="usrPassword"
                                    value={editUser.usrPassword}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="foto">URL de la Foto</label>
                                <input
                                    id="foto"
                                    type="text"
                                    name="usrFoto"
                                    value={editUser.usrFoto}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="estado">Estado</label>
                                <input
                                    id="estado"
                                    type="checkbox"
                                    name="usrEstado"
                                    checked={editUser.usrEstado}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className={styles.modalButtons}>
                                <button className={`${styles.modalButton} ${styles.confirmButton}`} onClick={handleEdit}>
                                    Guardar
                                </button>
                                <button className={`${styles.modalButton} ${styles.cancelButton}`} onClick={() => setShowEditModal(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default UserManagementPage;

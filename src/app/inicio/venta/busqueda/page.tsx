"use client";
import styles from './busqueda.module.css'
import { useState } from 'react';
import axios from 'axios';
import TopBar from '@/app/components/TopBar/TopBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SearchResult {
    _id: string;
    VentUser: string;
    VentProducto: string;
    VentCantidad: number;
    VentTotal: number;
    VentSubTotal: number;
    VentObs: string;
    VentFecha: string;
}

const SearchPage: React.FC = () => {
    const [searchId, setSearchId] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editResult, setEditResult] = useState<SearchResult>({
        _id: '',
        VentUser: '',
        VentProducto: '',
        VentCantidad: 0,
        VentTotal: 0,
        VentSubTotal: 0,
        VentObs: '',
        VentFecha: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);


    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/ventas`);
            const data: SearchResult[] = response.data;

            const filteredResults = data.filter((result) =>
                result._id.includes(searchId)
            );

            setResults(filteredResults);
        } catch (error) {
            console.error('Error:', error);
            setResults([]);
            toast.info('No se encontraron resultados', {
                autoClose: 2000,
            });
        }
    };

    const handleEditModal = (result: SearchResult) => {
        // Formatear la fecha en un formato válido para el campo de fecha
        const formattedDate = result.VentFecha.split('.')[0];
        
        setEditResult({
          ...result,
          VentFecha: formattedDate,
        });
        setShowEditModal(true);
      };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditResult(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Para campos de texto (textarea)
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditResult(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/ventas/${editResult._id}`,
                editResult
            );

            // Actualizar los resultados en el estado con los datos actualizados
            const updatedResults = results.map(result =>
                result._id === editResult._id ? response.data : result
            );

            setResults(updatedResults);
            setShowEditModal(false);
            toast.success('Resultado actualizado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al actualizar el resultado');
        }
    };

    const handleDeleteModal = (result: SearchResult) => {
        setSelectedResult(result);
        setShowModal(true);
    };

    const handleDelete = async (result: SearchResult) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}api/ventas/${result._id}`);
            toast.success('El resultado se eliminó correctamente');
            setShowModal(false);
            handleSearch(); // Obtener los resultados actualizados
        } catch (error) {
            console.error('Error:', error);
            toast.error('Ocurrió un error al eliminar el resultado');
        }
    };

    return (
        <div className={styles.container}>
            <TopBar />

            <div className={styles.content}>
                <div className={styles.contentBox}>
                    <h1 className={styles.title}>Página de Búsqueda</h1>
                    <div className={styles.inputRow}>
                        <input
                            className={styles.inputId}
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Ingrese el ID"
                        />
                        <button className={styles.buttonSearch} onClick={handleSearch}>
                            Buscar
                        </button>
                    </div>

                    {results.length > 0 ? (
                        <div className={styles.result}>
                            <h2>Resultados:</h2>
                            {results.map((result) => (
                                <div key={result._id} className={`${styles.resultItem} ${styles.mobileResultItem}`}>
                                    <div className={styles.resultProperties}>
                                        <div className={styles.resultField}>
                                            <b>ID: </b>
                                            {result._id}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Usuario: </b>
                                            {result.VentUser}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Producto: </b>
                                            {result.VentProducto}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Cantidad: </b>
                                            {result.VentCantidad}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Total: </b>
                                            {result.VentTotal} Bs.
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Subtotal: </b>
                                            {result.VentSubTotal} Bs.
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>Observaciones: </b>
                                            {result.VentObs}
                                        </div>
                                        <div className={styles.resultField}>
                                            <b>VentFecha: </b>
                                            {result.VentFecha}
                                        </div>
                                    </div>
                                    <div className={`${styles.resultButtons} ${styles.centeredButtons}`}>
                                        <button className={styles.editButton} onClick={() => handleEditModal(result)}>
                                            Editar
                                        </button>
                                        <button className={styles.deleteButton} onClick={() => handleDeleteModal(result)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>No se encontraron resultados</div>
                    )}
                </div>
            </div>
            {showModal && selectedResult && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Confirmar eliminación</h3>
                        <p>¿Estás seguro de que deseas eliminar este resultado?</p>
                        <div className={styles.modalButtons}>
                            <button className={`${styles.modalButton} ${styles.confirmButton}`} onClick={() => handleDelete(selectedResult)}>
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
                        <h3>Editar resultado</h3>
                        <form className={styles.form}>
                            <div className={styles.formField}>
                                <label htmlFor="producto">Producto</label>
                                <input
                                    id="producto"
                                    type="text"
                                    name="VentProducto"
                                    value={editResult.VentProducto}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="cantidad">Cantidad</label>
                                <input
                                    id="cantidad"
                                    type="number"
                                    name="VentCantidad"
                                    value={editResult.VentCantidad}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="subtotal">Subtotal</label>
                                <input
                                    id="subtotal"
                                    type="number"
                                    name="VentSubTotal"
                                    value={editResult.VentSubTotal}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="total">Total</label>
                                <input
                                    id="total"
                                    type="number"
                                    name="VentTotal"
                                    value={editResult.VentTotal}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="usuario">Usuario</label>
                                <input
                                    id="usuario"
                                    type="text"
                                    name="VentUser"
                                    value={editResult.VentUser}
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="observaciones">Observaciones</label>
                                <textarea
                                    id="observaciones"
                                    name="VentObs"
                                    value={editResult.VentObs}
                                    onChange={handleTextareaChange}
                                    style={{ padding: '5px' }}
                                />
                            </div>

                            <div className={styles.formField}>
                                <label htmlFor="fecha">Fecha</label>
                                <input
                                    id="fecha"
                                    type="datetime-local"
                                    name="VentFecha"
                                    value={editResult.VentFecha} // Establecer el valor del campo de fecha con editResult.VentFecha
                                    onChange={handleInputChange}
                                    style={{ padding: '5px' }}
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

export default SearchPage;
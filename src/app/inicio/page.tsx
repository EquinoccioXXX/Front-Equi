"use client";
import styles from './inicio.module.css'
import Card from '../components/Card/Card'
import Image from 'next/image';
import React, { useState } from 'react';
import Link from "next/link";
import useAxios from "axios-hooks";
import TopBar from '../components/TopBar/TopBar';

const InicioPage = () => {
    return (
        <div className={styles['flex-container']}>
            <TopBar />
            <div className={styles['content']}>
                <div className={styles['columns']}>
                    <p className={styles.title}>Inicio</p>
                    <div className={styles['inicio-container']}>
                        <Card image="/assets/ventas.jpg" title="Venta" link='/inicio' />
                        <Card image="/assets/pedidos.jpg" title="Pedidos" link='/inicio' />
                        <Card image="/assets/reportes.png" title="Reportes" link='/inicio' />
                        <Card image="/assets/proveedores.jpg" title="Proveedores" link='/inicio' />
                        <Card image="/assets/ingresos.jpg" title="Ingresos" link='/inicio' />
                        <Card image="/assets/clientes.jpg" title="Clientes" link='/inicio' />
                        <Card image="/assets/inventario.jpg" title="Inventario" link='/inicio/inventario' />
                        <Card image="/assets/cerrar-sesion.png" title="Cerrar sesión" link='/inicio' />

                    </div>
                </div>
                <div className={styles['columns']}>
                    <p className={styles.title}>Próximo evento</p>
                    <div className={styles['evento-img']}>
                        <img src="/assets/evento060523.jpg" alt="Evento" />
                    </div>

                </div>
                <div className={styles['columns-end']}>
                    <p className={styles.title}>Historial de ventas</p>
                    <div className={styles['grafica']}>
                        <img src="https://www.forcemanager.com/wp-content/uploads/blog_Como_hacer_un_reporte_de_ventas6.png" alt="historial de ventas" />
                    </div>
                    <p className={styles.title}>Gastos operativos</p>
                    <div className={styles['grafica']}>
                        <img src="https://d49-invdn-com.akamaized.net/content/pic30cb192e83f462bbb329e7068c71f7d7.png" alt="Gastos operativos" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InicioPage;
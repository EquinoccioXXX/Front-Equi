"use client";

import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './BigCardReport.module.css';
import axios from 'axios';
import useAxios from "axios-hooks";
import Link from 'next/link';

interface BigCardProps {
    image: string;
    title: string;
    urlReport: string;
}


const BigCardReport = ({ image, title, urlReport}: BigCardProps) => {
    const [{ data, loading, error }, downloadReport] = useAxios<Blob>(
        {
          url: urlReport,
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
        <button className={styles.card} onClick={handleClick}>
            <img src={image} alt={title}  />
            <div className={styles.overlay}>
                <p className={styles.title}>{title}</p>
            </div>
        </button>
    );
};

export default BigCardReport;
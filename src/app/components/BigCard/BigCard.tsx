import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import styles from './BigCard.module.css';
import Link from 'next/link';

interface BigCardProps {
    image: string;
    title: string;
    link: string;
}

const BigCard = ({ image, title, link }: BigCardProps) => {


    return (
        <div className={styles.card} >
            <img src={image} alt={title}  />
            <div className={styles.overlay} >
                <Link href={link}>
                    <p className={styles.title}>{title}</p>
                </Link>
            </div>
        </div>
    );
};

export default BigCard

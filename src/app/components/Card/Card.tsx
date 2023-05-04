import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Card.module.css';
import Link from 'next/link';

interface CardProps {
    image: string;
    title: string;
    link: string;
}

const Card = ({ image, title, link }: CardProps) => {


    return (
        <div className={styles.card} >
            <Image src={image} alt={title} height={400} width={600} />
            <div className={styles.overlay} >
                <Link href={link}>
                    <p className={styles.title}>{title}</p>
                </Link>
            </div>
        </div>
    );
};

export default Card

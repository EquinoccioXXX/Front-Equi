import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './TopBar.module.css';
const TopBar: React.FC = () => {
    return (
        <div className={styles.topBar}>
            <div className={styles.appName}>EQUINOCCIO</div>
            <div className={styles.userSection}>
                <div className={styles.userImage}>
                    <Image src="/assets/profile.png" alt="User image" width={50} height={50} />
                </div>

                <div className={styles.username}>{"Juan Perez"}</div>

                <div className={styles.hamburger}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </div>
    );
};

export default TopBar
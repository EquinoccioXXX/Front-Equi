import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './TopBar.module.css';
import { useUserContext } from '../../context/userContext';

interface TopBarProps {
    user: {
        nombre: string;
        foto: string;
    } | null;
}

const TopBar: React.FC = () => {
    const { user } = useUserContext();
    const userImageSrc = user?.foto ? `${process.env.NEXT_PUBLIC_BASE_URL}${user.foto}` : '/assets/profile.png';


    return (
        <div className={styles.topBar}>
            <div className={styles.firstSection}>
                <Link href="/inicio">
                    <div className={styles.arrow}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </Link>
                <div className={styles.appName}>EQUINOCCIO</div>
            </div>
            <div className={styles.userSection}>
                <div className={styles.userImage}>
                    <Image src={userImageSrc} alt="User image" width={50} height={50} />
                </div>

                <div className={styles.username}>{user && user.nombre} {user && user.apPaterno}</div>

                <div className={styles.hamburger}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
        </div>
    );
};

export default TopBar
import Image from 'next/image';
import React from 'react';

export default function Welcome() {
    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <img src="./logo.png" alt="Karyaksham Logo" style={styles.logo} />
                <h1 style={styles.heading}>Welcome to Karyaksham - Todo List</h1>
                <p style={styles.description}>
                    Congratulations on joining Karyaksham, your ultimate productivity companion! With our powerful todo list
                    feature, you'll be able to organize your tasks and achieve your goals like never before.
                </p>
                <p style={styles.description}>
                    We believe that great things are achieved by taking small steps each day. Start by creating your first todo
                    item, and let Karyaksham guide you towards success.
                </p>
            </div>
        </div>
    )
}


const styles = {
    container: {
        fontFamily: 'serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

    },
    innerContainer: {
        textAlign: 'center',
    },
    logo: {
        width: '200px',
        marginBottom: '20px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    description: {
        fontSize: '16px',
        marginBottom: '10px',
    },
};  
"use client"
import React, { useState, useEffect } from 'react';

const ScrollUpButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return visible ? (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                padding: '0.75rem 1.25rem',
                fontSize: '1.25rem',
                borderRadius: '50%',
                border: 'none',
                background: '#333',
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 1000,
            }}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    ) : null;
};

export default ScrollUpButton;
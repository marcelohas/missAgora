import React from 'react';
import { Church } from 'lucide-react';

const Header = () => {
    return (
        <header className="container flex items-center justify-between" style={{ paddingBottom: '0' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                <Church size={32} />
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>MissAgora</h1>
            </div>
        </header>
    );
};

export default Header;

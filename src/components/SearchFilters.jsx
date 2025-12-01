import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchFilters = ({ onSearchChange, onLocationClick, isLocating }) => {
    const [activeTab, setActiveTab] = useState('location'); // 'location' or 'manual'

    return (
        <div className="container">
            <div style={{
                display: 'flex',
                background: 'var(--surface)',
                padding: '0.25rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                marginBottom: '1rem'
            }}>
                <button
                    className="btn"
                    style={{
                        flex: 1,
                        backgroundColor: activeTab === 'location' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'location' ? 'white' : 'var(--text-muted)',
                        boxShadow: activeTab === 'location' ? 'var(--shadow)' : 'none'
                    }}
                    onClick={() => { setActiveTab('location'); onLocationClick(); }}
                >
                    <MapPin size={18} />
                    Perto de mim
                </button>
                <button
                    className="btn"
                    style={{
                        flex: 1,
                        backgroundColor: activeTab === 'manual' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'manual' ? 'white' : 'var(--text-muted)',
                        boxShadow: activeTab === 'manual' ? 'var(--shadow)' : 'none'
                    }}
                    onClick={() => setActiveTab('manual')}
                >
                    <Search size={18} />
                    Buscar
                </button>
            </div>

            {activeTab === 'manual' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Cidade ou Bairro..."
                        className="input"
                        onChange={(e) => onSearchChange('query', e.target.value)}
                    />
                    <input
                        type="time"
                        className="input"
                        onChange={(e) => onSearchChange('time', e.target.value)}
                    />
                </div>
            )}

            {activeTab === 'location' && isLocating && (
                <div className="text-center text-muted animate-fade-in" style={{ padding: '1rem' }}>
                    <p>Obtendo sua localização...</p>
                </div>
            )}
        </div>
    );
};

export default SearchFilters;

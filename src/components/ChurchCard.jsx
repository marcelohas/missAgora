import React from 'react';
import { MapPin, Clock, Navigation } from 'lucide-react';

const ChurchCard = ({ church }) => {
    const { nextMass } = church;

    const formatTimeDiff = (diff) => {
        if (diff < 60) return `${Math.floor(diff)} min`;
        const h = Math.floor(diff / 60);
        const m = Math.floor(diff % 60);
        return `${h}h ${m}min`;
    };

    const getDayName = (dayIndex) => {
        const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        return days[dayIndex];
    };

    return (
        <div className="card animate-fade-in">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>{church.name}</h3>
                    <div className="flex items-center gap-2 text-muted">
                        <MapPin size={16} />
                        <span style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{church.neighborhood}</span>
                        <span className="text-sm">({church.city})</span>
                    </div>
                </div>
                {church.distance && (
                    <div className="flex items-center gap-1 font-bold" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
                        <Navigation size={16} />
                        <span>{church.distance.toFixed(1)} km</span>
                    </div>
                )}
            </div>

            <div style={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div className="flex items-center gap-2">
                    <Clock size={20} style={{ color: 'var(--primary)' }} />
                    <div>
                        <p className="text-sm text-muted" style={{ fontWeight: '500' }}>Próxima Missa</p>
                        {nextMass ? (
                            <p className="font-bold" style={{ color: 'var(--primary-dark)' }}>
                                {getDayName(nextMass.day)} às {nextMass.time}
                            </p>
                        ) : (
                            <p className="text-sm">Nenhum horário encontrado</p>
                        )}
                    </div>
                </div>

                {nextMass && (
                    <div className="text-right">
                        <p className="text-sm text-muted">Começa em</p>
                        <p className="font-bold" style={{ color: nextMass.diff < 60 ? '#ef4444' : 'var(--text-main)' }}>
                            {formatTimeDiff(nextMass.diff)}
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-2 text-right">
                <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${church.coordinates.lat},${church.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                    style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}
                >
                    Ver rota &rarr;
                </a>
            </div>
        </div>
    );
};

export default ChurchCard;

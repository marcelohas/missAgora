import React from 'react';
import ChurchCard from './ChurchCard';

const ChurchList = ({ churches }) => {
    if (churches.length === 0) {
        return (
            <div className="container text-center text-muted" style={{ marginTop: '2rem' }}>
                <p>Nenhuma igreja encontrada com os filtros atuais.</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '2rem' }}>
            {churches.map((church) => (
                <ChurchCard key={church.id} church={church} />
            ))}
        </div>
    );
};

export default ChurchList;

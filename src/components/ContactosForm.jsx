import React from 'react';

function ContactForm({ addContacto, showAlert, missingFields, setNombre, setNumero, setEmail, nombre, numero, email }) {
    return (
        <div>
            <div className="mb-3">
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" placeholder="Nombre" />
            </div>
            <div className="mb-3">
                <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="form-control" placeholder="Número" />
            </div>
            <div className="mb-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Correo electrónico" />
            </div>
            <div className="mb-3">
                <button onClick={addContacto} className="btn btn-primary">Agregar contacto</button>
            </div>

            {showAlert && (
                <div className="alert alert-danger">
                    Faltan datos de contacto: falta {missingFields.join(' y ')}
                </div>
            )}
        </div>
    );
}

export default ContactForm;


import React, { useState } from 'react';
import './ContactoCard.css';

function ContactCard({ contacto, deleteContacto, editContacto, saveEditedContacto }) {
    const [nombre, setNombre] = useState(contacto.nombre);
    const [numero, setNumero] = useState(contacto.numero);
    const [email, setEmail] = useState(contacto.email);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        saveEditedContacto(contacto.id, nombre, numero, email);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNombre(contacto.nombre);
        setNumero(contacto.numero);
        setEmail(contacto.email);
    };

    return (
        <div className="container mt-5">
            <div className="card mb-3 custom-card">
                <img src={contacto.image} className="card-img-top" alt={contacto.nombre} />
                <div className="card-body">
                    {isEditing ? (
                        <>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control mb-2" />
                            <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="form-control mb-2" />
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" />
                            <button className="btn btn-success me-2" onClick={handleSave}>
                                Guardar
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancel}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <h5 className="card-title">{nombre}</h5>
                            {numero && <p className="card-text">Número: {numero}</p>}
                            {email && <p className="card-text">Correo electrónico: {email}</p>}
                            <div>
                                <button className="btn btn-primary me-2" onClick={handleEdit}>
                                    Editar
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteContacto(contacto.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactCard;


import React, { useState, useEffect } from 'react';
import ContactForm from './ContactosForm';
import ContactCard from './ContactoCard';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  // Cargar los contactos guardados en el LocalStorage al iniciar la página
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Guardar los contactos en el LocalStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacto = () => {
    const missing = [];
    if (!nombre) {
      missing.push('nombre');
    }
    if (!numero && !email) {
      missing.push('número o correo electrónico');
    }

    if (missing.length > 0) {
      setMissingFields(missing);
      setShowAlert(true);
      return;
    }

    const newContacto = {
      nombre: nombre,
      numero: numero,
      email: email,
      image: 'https://via.placeholder.com/150',
      id: contacts.length
    };

    setContacts([...contacts, newContacto]);
    setNombre('');
    setNumero('');
    setEmail('');
    setShowAlert(false);
    setMissingFields([]);
  };

  const deleteContacto = (id) => {
    const updatedContacts = contacts.filter((contacto) => contacto.id !== id);
    setContacts(updatedContacts);
    setEditingContact(null);
  };

  const editContacto = (id) => {
    const contact = contacts.find((contacto) => contacto.id === id);
    setEditingContact(contact);
    setNombre(contact.nombre);
    setNumero(contact.numero);
    setEmail(contact.email);
  };

  const saveEditedContacto = (editedContact) => {
    const updatedContacts = contacts.map((contacto) => {
      if (contacto.id === editedContact.id) {
        return editedContact;
      }
      return contacto;
    });

    setContacts(updatedContacts);
    setNombre('');
    setNumero('');
    setEmail('');
    setEditingContact(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredContacts = contacts.filter((contacto) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      contacto.nombre.toLowerCase().includes(searchValue) ||
      contacto.numero.includes(searchValue) ||
      contacto.email.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Lista de Contactos
          </a>
        </div>
      </nav>

      <div className="my-4">
        <ContactForm
          addContacto={addContacto}
          showAlert={showAlert}
          missingFields={missingFields}
          setNombre={setNombre}
          setNumero={setNumero}
          setEmail={setEmail}
          nombre={nombre}
          numero={numero}
          email={email}
        />
      </div>

      <div className="mb-3">
        <input type="text" value={searchQuery} onChange={handleSearch} className="form-control" placeholder="Buscar contacto" />
      </div>

      <div className="row">
        {filteredContacts.map((contacto) => (
          <div key={contacto.id} className="col-lg-4 col-md-6">
            <ContactCard
              contacto={contacto}
              deleteContacto={() => deleteContacto(contacto.id)}
              editContacto={() => editContacto(contacto.id)}
              editing={editingContact && editingContact.id === contacto.id}
              setNombre={setNombre}
              setNumero={setNumero}
              setEmail={setEmail}
              saveEditedContacto={saveEditedContacto}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactList;

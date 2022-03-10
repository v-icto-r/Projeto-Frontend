import React from "react";

function Table({ contacts, onDelete }) {
    return (
        <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.nome}</td>
                <td>{contact.telefone}</td>
                <button onClick={onDelete}>Excluir</button>                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};
export default Table;
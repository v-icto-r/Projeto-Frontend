import React from "react";
import { parse } from "papaparse";
import './App.css';
import logo from "./Logo-oficial-768x236.png";

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  
  return (
    <div>      
      <div
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, { header: true });
              const x = [...contacts, ...result.data];
              setContacts(x);
            });
        }}
      >
      <div class="header">
        <img src={logo} alt='Logo da aplicação' />
      </div>

      <div className='input'>Solte o csv aqui</div>
        
      </div>      
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

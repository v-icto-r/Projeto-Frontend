import React, { useState } from "react";
import { parse } from "papaparse";
import './App.css';
import logo from "./Logo-oficial-768x236.png";
import Table from "./components/Table"

export default function App() {
  const [highlighted, setHighlighted] = useState(false);
  const [contacts, setContacts] = useState([]);
//
  function deleteTask(index) {
    const itensCopy = Array.from(contacts);
    itensCopy.splice(index, 1);
    setContacts(itensCopy);
  }
//  
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

        <div>
          <Table contacts={ contacts } deleteTask={ deleteTask }/>
        </div>
        
      </div>      
      
    </div>
  );
}

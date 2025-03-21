import { useState } from "react";


function FormRegistrazione() {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specializzazione, setSpecializzazione] = useState("");
  const [esperienza, setEsperienza] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [errore, setErrore] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    
    if (
      !nome.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione.trim() ||
      !esperienza.trim() ||
      !descrizione.trim()
    ) {
      setErrore("❌ Tutti i campi sono obbligatori.");
      return;
    }

    if (isNaN(esperienza) || Number(esperienza) <= 0) {
      setErrore("❌ Inserisci un numero valido e positivo per gli anni di esperienza.");
      return;
    }

    if (!["Full Stack", "Frontend", "Backend"].includes(specializzazione)) {
      setErrore("❌ Seleziona una specializzazione valida.");
      return;
    }

    
    setErrore(""); 
    const dati = {
      nome,
      username,
      password,
      specializzazione,
      esperienza,
      descrizione
    };

    console.log("✅ Dati registrati:", dati);
    alert("Registrazione completata con successo!");
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Registrazione Sviluppatore</h2>

      {errore && <p style={{ color: "red" }}>{errore}</p>}

      <div>
        <label>Nome completo</label>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
      </div>

      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div>
        <label>Specializzazione</label>
        <select value={specializzazione} onChange={e => setSpecializzazione(e.target.value)}>
          <option value="">-- Seleziona --</option>
          <option>Full Stack</option>
          <option>Frontend</option>
          <option>Backend</option>
        </select>
      </div>

      <div>
        <label>Anni di esperienza</label>
        <input
          type="number"
          value={esperienza}
          onChange={e => setEsperienza(e.target.value)}
        />
      </div>

      <div>
        <label>Breve descrizione</label>
        <textarea value={descrizione} onChange={e => setDescrizione(e.target.value)} />
      </div>

      <button type="submit">Registrati</button>
    </form>
  );
}

export default FormRegistrazione;

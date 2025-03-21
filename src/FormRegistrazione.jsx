import { useState, useRef } from "react";

function FormRegistrazione() {
  // Campi controllati
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [descrizione, setDescrizione] = useState("");

  const [msgUsername, setMsgUsername] = useState("");
  const [msgPassword, setMsgPassword] = useState("");
  const [msgDescrizione, setMsgDescrizione] = useState("");
  const [erroreSubmit, setErroreSubmit] = useState("");

  // Campi non controllati
  const nomeRef = useRef();
  const specRef = useRef();
  const esperienzaRef = useRef();

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  function validateUsername(val) {
    const valido = /^[a-zA-Z0-9]{6,}$/.test(val);
    setMsgUsername(valido ? "✅ Username valido" : "❌ Almeno 6 caratteri alfanumerici, nessun simbolo");
  }

  function validatePassword(val) {
    const hasLetter = [...val].some(char => letters.includes(char.toLowerCase()));
    const hasNumber = [...val].some(char => numbers.includes(char));
    const hasSymbol = [...val].some(char => symbols.includes(char));
    const valido = val.length >= 8 && hasLetter && hasNumber && hasSymbol;

    setMsgPassword(valido ? "✅ Password valida" : "❌ Min 8 caratteri, 1 lettera, 1 numero, 1 simbolo");
  }

  function validateDescrizione(val) {
    const clean = val.trim();
    const valido = clean.length >= 100 && clean.length <= 1000;
    setMsgDescrizione(valido ? "✅ Descrizione valida" : "❌ Min 100 - Max 1000 caratteri");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nome = nomeRef.current.value;
    const specializzazione = specRef.current.value;
    const esperienza = esperienzaRef.current.value;

    if (
      !nome.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione ||
      !esperienza.trim() ||
      !descrizione.trim()
    ) {
      setErroreSubmit("❌ Compila tutti i campi");
      return;
    }

    if (isNaN(esperienza) || Number(esperienza) <= 0) {
      setErroreSubmit("❌ Inserisci anni di esperienza validi");
      return;
    }

    setErroreSubmit(""); // reset errori

    console.log("✅ Dati inviati:", {
      nome,
      username,
      password,
      specializzazione,
      esperienza,
      descrizione
    });

    alert("Registrazione completata!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrazione Dev</h2>

      {erroreSubmit && <p style={{ color: "red" }}>{erroreSubmit}</p>}

      <div>
        <label>Nome completo</label>
        <input type="text" ref={nomeRef} />
      </div>

      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            validateUsername(e.target.value);
          }}
        />
        <p style={{ color: msgUsername.startsWith("✅") ? "green" : "red" }}>{msgUsername}</p>
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        <p style={{ color: msgPassword.startsWith("✅") ? "green" : "red" }}>{msgPassword}</p>
      </div>

      <div>
        <label>Specializzazione</label>
        <select ref={specRef}>
          <option value="">-- Seleziona --</option>
          <option>Full Stack</option>
          <option>Frontend</option>
          <option>Backend</option>
        </select>
      </div>

      <div>
        <label>Anni di esperienza</label>
        <input type="number" ref={esperienzaRef} />
      </div>

      <div>
        <label>Breve descrizione</label>
        <textarea
          value={descrizione}
          onChange={e => {
            setDescrizione(e.target.value);
            validateDescrizione(e.target.value);
          }}
        />
        <p style={{ color: msgDescrizione.startsWith("✅") ? "green" : "red" }}>{msgDescrizione}</p>
      </div>

      <button type="submit">Invia</button>
    </form>
  );
}

export default FormRegistrazione;

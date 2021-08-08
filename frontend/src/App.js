import React, { useEffect, useState } from "react";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import Persons from "./Persons";
import contactServer from "./services/contacts.js";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    //set the persons state when page load
    contactServer.getAll().then(response => {
      setPersons(response);
    });
  }, []);
  const handleAlert = obj => {
    setAlert(obj);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {alert !== null ? <Notification alert={alert} /> : null}
      <Filter setPersons={setPersons} />
      <h2>Form</h2>
      <PersonForm
        setPersons={setPersons}
        persons={persons}
        handleAlert={handleAlert}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        handleAlert={handleAlert}
      />
    </div>
  );
};

export default App;

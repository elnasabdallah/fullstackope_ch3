import React, { useState } from "react";
import contactServer from "./services/contacts";
import uuid from "react-uuid";

const PersonForm = ({ setPersons, persons, handleAlert }) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  //when form is submitted
  const onSubmit = e => {
    e.preventDefault(); //prevent default

    const dupl = persons.filter(person => person.name === newName); //check if there is duplicate.. which will at first index (not efficient though..lol)
    const newPerson = { name: newName, number: newPhoneNumber };

    if (!dupl[0]) {
      //create the person object and assign id

      //make post request to create contact
      contactServer
        .create(newPerson)
        .then(response => {
          setPersons([...persons, response]);
          handleAlert({ type: "success", message: `Added ${newPerson.name}` });
        })
        .catch(error => {
          handleAlert({ type: "error", message: error.response.data.error });
        });
    } else {
      //if to update
      const confrm = window.confirm(
        `${newName} is already added to the phone book, replace the old number with the one?`
      );
      if (confrm) {
        //update and set the persons state (displayed contacts list)
        contactServer
          .update(dupl[0].id, newPerson)
          .then(response =>
            contactServer.getAll().then(results => setPersons(results))
          )
          .then(response =>
            handleAlert({
              type: "success",
              message: `Updated ${newPerson.name}`,
            })
          );
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input name='name' onChange={e => setNewName(e.target.value)} />
      </div>
      <br />

      <div>
        number:{" "}
        <input name='phone' onChange={e => setNewPhoneNumber(e.target.value)} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;

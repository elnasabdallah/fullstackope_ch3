import React from "react";
import contactServer from "./services/contacts";

const Persons = ({ persons, setPersons, handleAlert }) => {
  //handle delete
  const handelDelete = person => {
    //confirmation
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      contactServer
        .delete_obj(person.id)
        .then(response => {
          contactServer.getAll().then(response => setPersons(response));
        })
        .catch(error => {
          handleAlert({
            type: "error",
            message: `Information on ${person.name} has already been removed from the server`,
          });
        });
    }
  };
  return (
    <div>
      {persons.map(person => (
        <li key={person.name}>
          {person.name} {person.phone}
          <button onClick={() => handelDelete(person)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default Persons;

import React, { useEffect, useState } from "react";
import contactServer from "./services/contacts";

const Filter = ({ setPersons }) => {
  const [contacts, setContacts] = useState([]); //get database copy of contacts
  const [search, setSearch] = useState(""); //for controlled input

  useEffect(() => {
    contactServer.getAll().then(response => {
      setContacts(response);
    });
  }, []);

  //input control
  const onSearch = e => {
    setSearch(e.target.value);
  };

  //search as key is up
  const onKeyUp = () => {
    //filter out those that dont march the search characters
    const newContatcs = contacts.filter(
      contact => contact.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );

    setPersons(newContatcs); //set the persons state that are displayed in Persons.js component
  };

  return (
    <div>
      Filter shown with :{" "}
      <input
        name='filter'
        value={search}
        onChange={onSearch}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default Filter;

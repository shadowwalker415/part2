import React, { useEffect } from "react";
import { useState } from "react";
import contactServices from "./services/options";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactServices.getData().then((response) => {
      setPersons(response.data);
    });
  }, []);

  function isNumberic(string) {
    return /^[-0-9]+$/.test(string);
  }

  function isAlpha(string) {
    return /^[a-zA-Z ]+$/.test(string);
  }

  const handleSearchQuery = function (e) {
    setSearchQuery(e.target.value);
  };

  const handleNameChange = function (e) {
    setNewName(e.target.value);
  };

  const handleNumberChange = function (e) {
    setNewNumber(e.target.value);
  };

  const handleDelete = function (name) {
    if (window.confirm(`Delete ${name}?`)) {
      const target = persons.find((person) => person.name == name);
      contactServices.deleteConact(target.id);
      const currentContacts = persons.filter(
        (person) => person.id !== target.id
      );
      setPersons(currentContacts);
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!isAlpha(newName)) {
      alert("Name must be alphabets");
      setNewName("");
      setNewNumber("");
      return -1;
    }
    if (!isNumberic(newNumber)) {
      alert("Number must be numeric");
      setNewName("");
      setNewNumber("");
      return -1;
    }
    if (
      persons.some((person) => person.name === newName) &&
      persons.some((person) => person.number === newNumber)
    ) {
      alert(`${newName} is already registered`);
      setNewName("");
      setNewNumber("");
      return -1;
    }
    if (
      persons.some((person) => person.number === newNumber) &&
      persons.some((person) => person.name !== newName)
    ) {
      const owner = persons.find((person) => person.number === newNumber);
      alert(`${newNumber} is registered to ${owner.name}`);
      setNewName("");
      setNewNumber("");
      return -1;
    }
    if (
      persons.some((person) => person.name === newName) &&
      persons.some((person) => person.number !== newNumber)
    ) {
      const user = persons.find((person) => person.name === newName);
      const confirmation = window.confirm(
        `${user.name} is already added to phonebook replace the old number with new one`
      );
      if (confirmation) {
        const updatedContact = {
          name: newName,
          number: newNumber,
        };
        contactServices
          .updateContact(user.id, updatedContact)
          .then((response) => {
            const userIndex = persons.indexOf(user);
            setPersons((persons) =>
              persons.toSpliced(userIndex, 1, response.data)
            );
            setNotification(`Added ${newName}'s phone number`);
          })
          .catch((error) => {
            console.log(error);
            setNotification(
              ` ${error.message} ${newName} was already removed from server`
            );
            setTimeout(() => setNotification(null), 3000);
          });
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
      return -1;
    }
    const newContact = {
      name: newName,
      number: newNumber,
    };
    contactServices.addContact(newContact).then((response) => {
      setPersons((persons) => persons.concat(response.data));
      setNotification(`Added ${newName}`);
    });
    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (!persons) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter onHandleSearch={handleSearchQuery} />
      <h3>Add a new</h3>
      <PersonForm
        onHandleSubmit={handleSubmit}
        onHandleNameChange={handleNameChange}
        onHandleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h3>Numbers</h3>
      {searchQuery ? (
        persons
          .filter(
            (person) =>
              person.name.toLocaleLowerCase() ===
              searchQuery.toLocaleLowerCase()
          )
          .map((person) => (
            <Person key={person.id} name={person.name} number={person.number} />
          ))
      ) : persons.length === 0 ? (
        <div>Phonebook has 0 contacts</div>
      ) : (
        persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            onHandleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

function Filter({ onHandleSearch }) {
  return (
    <div>
      filter shown with <input type="text" onChange={onHandleSearch} />
    </div>
  );
}

function PersonForm({
  onHandleSubmit,
  onHandleNameChange,
  onHandleNumberChange,
  name,
  number,
}) {
  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <div>
          name:
          <input
            type="text"
            value={name}
            onChange={onHandleNameChange}
            required
          />
          <div>
            number:
            <input type="text" value={number} onChange={onHandleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

function Notification({ message }) {
  if (message === null) {
    return null;
  }

  const pattern = /Added/i.test(message);
  return (
    <>
      <div className={pattern ? "success" : "error"}>{message}</div>
    </>
  );
}

function Button({ onHandleClick, text }) {
  return (
    <button type="button" onClick={onHandleClick}>
      {text}
    </button>
  );
}

function Person({ name, number, onHandleDelete }) {
  return (
    <>
      <div>
        {name} {number}
        <Button text="delete" onHandleClick={() => onHandleDelete(name)} />
      </div>
    </>
  );
}

export default App;

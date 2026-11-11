import { useState } from 'react'

const Person = ({person}) => <li>{person.name} {person.number}</li>

const Persons = ({persons}) => {
  console.log(persons)

  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

const PersonForm = ({addPerson, newName,newNameOnChange, newNumber, newNumberOnChange}) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={newName}
          onChange={newNameOnChange}
        />
        <br/>
        number: <input 
          value={newNumber}
          onChange={newNumberOnChange}
        />          
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>    
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123456',
      id: 0
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
    }
    else
    {
      const person = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNameOnChange={event => setNewName(event.target.value)}
        newNumber={newNumber}
        newNumberOnChange={event => setNewNumber(event.target.value)}
      />
      <Persons persons={persons} />
    </div>
  )
}

export default App
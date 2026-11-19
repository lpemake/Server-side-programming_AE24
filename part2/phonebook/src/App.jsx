import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person, handleDelete}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDelete}> Delete</button>
    </li>
  )
}

const Persons = ({persons, handleDelete}) => {
  console.log(persons)

  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person}
            handleDelete={() => handleDelete(person.id)} />
        )}
      </ul>
    </div>
  )
}

const PersonForm = ({addPerson, newName,newNameOnChange,
  newNumber, newNumberOnChange}) => {

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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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
    
     axios
      .post('http://localhost:3001/persons', person)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    }
    setNewName('')
    setNewNumber('')
  }  

  const handleDelete = (id) => {
    const url = `http://localhost:3001/persons/${id}`

    axios.delete(url).then(response => {
      setPersons(persons.filter(p => p.id !== id))
    })
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
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
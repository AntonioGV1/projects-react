import personService from './services/persons'
import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'

const AppAgenda = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({ message: null, type: '' })

    useEffect(() => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification({ message: null, type: '' })
        }, 3000)
    }

    const personsToShow = filter
        ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFilterChange = (event) => setFilter(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = { name: newName, number: newNumber }
        const person = persons.find(p => p.name === newName)

        if (person) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(person.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                        showNotification(`Updated ${newName}'s number successfully`, 'success')
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        showNotification(`Information of ${newName} has already been removed from server`, 'error')
                        setPersons(persons.filter(p => p.id !== person.id))
                    })
            }
        } else {
            personService.create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    showNotification(`Added ${newName} successfully`, 'success')
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    showNotification(`Deleted ${person.name} successfully`, 'success')
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification.message} type={notification.type} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default AppAgenda

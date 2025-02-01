const Persons = ({ personsToShow, deletePerson }) => {
    return (
        <>
            {personsToShow.map(person =>
                <DetailPerson
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    number={person.number}
                    deletePerson={deletePerson}
                />
            )}
        </>
    );
}

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    );
}


const DetailPerson = ({ id, name, number, deletePerson }) => {
    return (
        <div>
            {name} {number}
            <Button onClick={() => deletePerson(id)} text='delete' />
        </div>
    );
}

export default Persons
const Header = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
        </>
    )
}

const Content = ({ course }) => {
    const parts = course.parts

    return (
        <div>
            {parts.map((part) => (
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}

const Part = ({ part, exercises }) => {
    return (
        <>
            <p>{part} {exercises}</p>
        </>
    )
}

const Total = ({ course }) => {
    const parts = course.parts
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <>
            <p>total of {total} excercises</p>
        </>
    )
}



const Course = ({ courses }) => {
    return (
        <>
            {courses.map((course) => (
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            ))}
        </>
    )
}

export default Course
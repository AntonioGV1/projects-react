const Filter = ({ filter, handleFilterChange }) => {
    return (
        <>
            filter shown with <input value={filter} onChange={handleFilterChange} />
        </>
    );
};

export default Filter
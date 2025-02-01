import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY_WEATHER = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (value) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          const filteredCountries = response.data.filter((c) =>
            c.name.common.toLowerCase().includes(value.toLowerCase())
          )
          if (filteredCountries.length > 10) {
            setError('Too many matches, specify another filter')
            setCountries([])
          } else {
            setError('')
            setCountries(filteredCountries)
          }
        })
        .catch(() => setError('Error fetching data'))
    } else {
      setCountries([])
      setError('')
    }
  }, [value])

  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital[0]
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY_WEATHER}&units=metric`
        )
        .then((response) => {
          setWeather(response.data)
        })
        .catch(() => setWeather(null))
    } else {
      setWeather(null)
    }
  }, [countries])

  return (
    <div>
      <h1>Find Countries</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p>{error}</p>}
      {countries.length > 1 && (
        <ul>
          {countries.map((c) => (
            <li key={c.name.common}>{c.name.common}</li>
          ))}
        </ul>
      )}
      <div>
        {countries.length === 1 && (
          <div>
            <h2>{countries[0].name.common}</h2>
            <p>Capital: {countries[0].capital[0]}</p>
            <p>Area: {countries[0].area} km²</p>
            <p>Population: {countries[0].population}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(countries[0].languages).map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <img
              src={countries[0].flags.png}
              alt={countries[0].name.common}
              style={{ width: '100px' }}
            />
            <h2>Weather in {countries[0].capital[0]}</h2>
            {weather ? (
              <div>
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Wind: {weather.wind.speed} m/s</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

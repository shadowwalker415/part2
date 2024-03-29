import React, { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import getCountries from "./services/int_info_service";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonStates, setButtonStates] = useState([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);

  useEffect(() => {
    getCountries().then((response) =>
      setCountries((countries) => countries.concat(response.data))
    );
  }, []);

  const handleSearch = function (e) {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleClick = function (index) {
    const updatedButtonStates = Array(result.length).fill(false);
    updatedButtonStates[index] = !updatedButtonStates[index];
    setButtonStates(updatedButtonStates);
    setSelectedCountryIndex(index);
  };

  if (countries.length === 0) return <div>Loading....</div>;

  let result = countries.filter((country) =>
    country.name?.common
      .toLowerCase()
      .includes(String(searchQuery).toLowerCase())
  );

  result.length === 250 ? (result = []) : result;
  /* By default searchQuery will be " ", so
  results will be a list of all the countries since the 
  condition in the filter method will be true for all the elements
  in the array.*/
  return (
    <>
      <h1>Welcome!</h1>
      <Filter handleSearch={handleSearch} />
      {result.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : result.length === 1 ? (
        <CountryInfo countryDetails={result[0]} />
      ) : (
        result.map((country, i) => (
          <div key={i}>
            <Country
              buttonState={buttonStates[i]}
              countryName={country.name?.common}
              onHandleClick={() => handleClick(i)}
            />
            {selectedCountryIndex === i && (
              <CountryInfo countryDetails={country} />
            )}
          </div>
        ))
      )}
    </>
  );
}

function Filter({ handleSearch }) {
  return (
    <>
      <div>
        Find countries <input onChange={handleSearch} type="text" />
      </div>
    </>
  );
}

function Country({ buttonState, countryName, onHandleClick }) {
  return (
    <div>
      {countryName}
      <Button
        text={buttonState ? "cancel" : "show"}
        handleClick={onHandleClick}
      />
    </div>
  );
}

function CountryInfo({ countryDetails }) {
  return (
    <>
      <h2>{countryDetails.name?.common}</h2>
      <div>
        <p>Capital: {countryDetails.capital[0]}</p>
        <p>Area: {countryDetails?.area}</p>
      </div>
      <h3>Languages:</h3>
      <div>
        <Language languageObject={countryDetails.languages} />
      </div>
      <div>
        <img
          className="flag_size"
          src={`${countryDetails.flags.png}`}
          alt={`Flag of ${countryDetails.name.official}`}
        />
      </div>
    </>
  );
}

function Language({ languageObject }) {
  const languages = Object.values(languageObject);
  return (
    <>
      <ul>
        {languages.map((language, i) => (
          <li key={i}>
            <p>{language}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Button({ text, handleClick }) {
  return (
    <button onClick={handleClick} type="button">
      {text}
    </button>
  );
}

export default App;

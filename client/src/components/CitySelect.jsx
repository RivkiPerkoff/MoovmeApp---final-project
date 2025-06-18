import React, { useState } from 'react';
import { israelCities } from '../data/israelCities';
import './CitySelect.css';

const CitySelect = ({ name, value, onChange, placeholder = 'הכנס עיר' }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (e) => {
    const input = e.target.value;
    onChange(e);
    const matches = israelCities.filter(city =>
      city.includes(input)
    ).slice(0, 5);
    setSuggestions(matches);
    setIsFocused(true);
  };

  const handleSelect = (city) => {
    setSuggestions([]);
    onChange({ target: { name, value: city } });
  };

  const handleBlur = () => {
    // דחיה קטנה כדי לאפשר קליק קודם על suggestion
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  return (
    <div className="city-select">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="suggestions" onMouseDown={e => e.preventDefault()}>
          {suggestions.map((city) => (
            <li key={city} onClick={() => handleSelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelect;

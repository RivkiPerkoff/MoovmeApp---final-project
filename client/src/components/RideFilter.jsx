// import { useState, useEffect } from 'react';
// import './RideFilter.css';

// const RideFilter = ({ onFilter }) => {
//   const [filters, setFilters] = useState({
//     from_city: '',
//     destination_city: '',
//     genders: [], // במקום gender יחיד
//     minSeats: '',
//     date: ''
//   });

//   const charediCities = [
//     "בני ברק", "ירושלים", "אלעד", "אחיסמך", "בית שמש", "מודיעין עילית", "ביתר עילית",
//     "אשדוד", "צפת", "חיפה", "נתיבות", "קרית גת", "קרית מלאכי", "טבריה", "ערד",
//     "חצור הגלילית", "רכסים", "עמנואל", "חולון", "פתח תקווה", "ראשון לציון",
//     "אשקלון", "עפולה", "קרית יערים", "נוף הגליל", "אופקים", "בית דגן", "גבעת זאב", "קרית ספר", "אחר"
//   ];

//   useEffect(() => {
//     onFilter(filters); // מפעיל סינון כל פעם שמשהו משתנה
//   }, [filters, onFilter]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleGenderChange = (e) => {
//     const { value, checked } = e.target;
//     setFilters(prev => {
//       const updated = checked
//         ? [...prev.genders, value]
//         : prev.genders.filter(g => g !== value);
//       return { ...prev, genders: updated };
//     });
//   };

//   return (
//     <div className="ride-filter">
//       <h3>🔍 סינון נסיעות</h3>

//       <label>עיר מוצא:</label>
//       <select name="from_city" value={filters.from_city} onChange={handleChange}>
//         <option value="">-- הכל --</option>
//         {charediCities.map(city => (
//           <option key={city} value={city}>{city}</option>
//         ))}
//       </select>

//       <label>עיר יעד:</label>
//       <select name="destination_city" value={filters.destination_city} onChange={handleChange}>
//         <option value="">-- הכל --</option>
//         {charediCities.map(city => (
//           <option key={city} value={city}>{city}</option>
//         ))}
//       </select>

//     <label>מין הנהג:</label>
// <div className="gender-checkboxes">
//   <label>
//     <input
//       type="checkbox"
//       value="נהג"
//       checked={filters.genders.includes("נהג")}
//       onChange={handleGenderChange}
//     />
//     נהג
//   </label>
//   <label>
//     <input
//       type="checkbox"
//       value="נהגת"
//       checked={filters.genders.includes("נהגת")}
//       onChange={handleGenderChange}
//     />
//     נהגת
//   </label>
// </div>


//       <label>מינימום מקומות פנויים:</label>
//       <input
//         type="number"
//         name="minSeats"
//         value={filters.minSeats}
//         onChange={handleChange}
//       />

//       <label>תאריך:</label>
//       <input
//         type="date"
//         name="date"
//         value={filters.date}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default RideFilter;

import { useState, useEffect } from 'react';
import CitySelect from './CitySelect';
import './RideFilter.css';

const RideFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    from_city: '',
    destination_city: '',
    genders: [],
    minSeats: '',
    date: ''
  });

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e) => {
    const { value, checked } = e.target;
    setFilters(prev => {
      const updated = checked
        ? [...prev.genders, value]
        : prev.genders.filter(g => g !== value);
      return { ...prev, genders: updated };
    });
  };

  return (
    <div className="ride-filter">
      <h3>🔍 סינון נסיעות</h3>

      <label>עיר מוצא:</label>
      <CitySelect
        name="from_city"
        value={filters.from_city}
        onChange={handleChange}
        placeholder="עיר מוצא"
      />

      <label>עיר יעד:</label>
      <CitySelect
        name="destination_city"
        value={filters.destination_city}
        onChange={handleChange}
        placeholder="עיר יעד"
      />

      <label>מין הנהג:</label>
      <div className="gender-checkboxes">
        <label>
          <input
            type="checkbox"
            value="נהג"
            checked={filters.genders.includes("נהג")}
            onChange={handleGenderChange}
          />
          נהג
        </label>
        <label>
          <input
            type="checkbox"
            value="נהגת"
            checked={filters.genders.includes("נהגת")}
            onChange={handleGenderChange}
          />
          נהגת
        </label>
      </div>

      <label>מינימום מקומות פנויים:</label>
      <input
        type="number"
        name="minSeats"
        value={filters.minSeats}
        onChange={handleChange}
      />

      <label>תאריך:</label>
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
      />
    </div>
  );
};

export default RideFilter;


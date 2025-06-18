import RideFilter from './RideFilter';
import '../styles/RideFilter.css';

const RideFilterWrapper = ({ onFilter }) => {
  return (
    <div className="ride-filter-wrapper">
      <RideFilter onFilter={onFilter} />
    </div>
  );
};

export default RideFilterWrapper;
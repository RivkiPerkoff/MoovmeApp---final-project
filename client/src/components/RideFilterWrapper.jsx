import RideFilter from './RideFilter';
import './RideFilter.css';

const RideFilterWrapper = ({ onFilter }) => {
  return (
    <div className="ride-filter-wrapper">
      <RideFilter onFilter={onFilter} />
    </div>
  );
};

export default RideFilterWrapper;
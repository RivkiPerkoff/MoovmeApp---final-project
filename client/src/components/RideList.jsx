import RideCard from './RideCard';
import './RideList.css';


const RideList = ({ rides, isMine = false, onEdit, onDelete, requestsByRide = {} }) => {
  if (!rides || rides.length === 0) {
    return <p>{isMine ? 'לא פרסמת נסיעות עדיין.' : 'אין כרגע נסיעות זמינות.'}</p>;
  }

  return (
    <div className="ride-list">
      {rides.map((ride) => (
        <RideCard
          key={ride._id}
          ride={ride}
          isMine={isMine}
          onEdit={onEdit}
          onDelete={onDelete}
          requests={requestsByRide[ride._id]}
        />
      ))}
    </div>
  );
};

export default RideList;

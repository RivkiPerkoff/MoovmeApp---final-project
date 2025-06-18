import RideList from './RideList';
import RideForm from '../pages/RideForm';
import RideActions from './RideActions';

const RideSection = ({
  user,
  showMyRides,
  setShowMyRides,
  rides,
  myRides,
  filteredRides,
  requestsByRide,
  loading,
  showForm,
  setShowForm,
  rideToEdit,
  setRideToEdit,
  onRideAdded,
  onDeleteRide,
  navigate
}) => {
  return (
    <div className="main-content">
      <h1>ברוך הבא{user ? `, ${user.username}` : ''}!</h1>
      <p>מצא נסיעה שמתאימה לך או פרסם אחת חדשה.</p>

      <RideActions
        onAddRide={() => {
          setRideToEdit(null);
          setShowForm(true);
        }}
        onToggleMyRides={() => setShowMyRides(prev => !prev)}
        showMyRides={showMyRides}
        onGoToHistory={() => navigate('/my-joined-rides')}
      />

      <hr />

      {loading ? (
        <p>טוען...</p>
      ) : (
        <>
          {showMyRides && (
            <>
              <h2>הנסיעות שלי</h2>
              <RideList
                rides={myRides}
                isMine={true}
                onEdit={(ride) => {
                  setRideToEdit(ride);
                  setShowForm(true);
                }}
                onDelete={onDeleteRide}
                requestsByRide={requestsByRide}
              />
              <hr />
            </>
          )}

          <h2>נסיעות זמינות</h2>
          <RideList rides={filteredRides} />
        </>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowForm(false)} style={{ float: 'left' }}>❌</button>
            <RideForm
              onClose={() => setShowForm(false)}
              initialRide={rideToEdit}
              onRideAdded={onRideAdded}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RideSection;

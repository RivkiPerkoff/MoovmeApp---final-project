const RideActions = ({ onAddRide, onToggleMyRides, showMyRides, onGoToHistory }) => (
  <div className="button-group">
    <button className="btn btn-primary" onClick={onAddRide}>
      + פרסם נסיעה חדשה
    </button>

    <button onClick={onToggleMyRides} style={{ marginRight: '1rem' }}>
      {showMyRides ? 'הסתר את הנסיעות שלי' : 'הצג את הנסיעות שלי'}
    </button>

    <button onClick={onGoToHistory} style={{ marginRight: '1rem' }}>
      היסטוריית נסיעות שלי
    </button>
  </div>
);

export default RideActions;
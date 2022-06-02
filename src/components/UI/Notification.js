import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Map from './Map';
import Modal from './Modal';
import classes from './Notification.module.css';

const Notification = (props) => {
  const [showMap, setShowMap] = useState(false);

  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.errorCustom;
  }
  if (props.status === 'success') {
    specialClasses = classes.successCustom;
  }

  const cssClasses = `${classes.notificationCustom} ${specialClasses}`;

  const dispatch = useDispatch();

  const cancelHandler = () => {
    dispatch(uiActions.toggleNotification({
      show: false,
    }));
  }
  const showMapHandler = () => {
    setShowMap(true);
  }

  const closeMap = () => {
    setShowMap(false);
  }
  return (
    <Modal show header={props.title} footer={props.footer} style={{ height: '50%' }}>
      <section
        className={cssClasses}
      >
        <p>{props.message}</p>

      </section>
      {props.maps && 
        <div className={classes.mapContainer}>
          <Map center={{
                    lat: props.coordinates.latitude,   //google mapsden alunacak latitude @ işaretinden sonra gelen sayı
                    lng: props.coordinates.longitude,   //longitude lat'dan sonra gelen sayı.
                }} zoom={16} />
        </div>}
      {/* {props.maps && <div className='map-container'>
        <Map center={props.coordinates} zoom={16} />
      </div>} */}

      <div className={classes.buttons}>
        <button onClick={cancelHandler} className={classes.closeNotification}>Kapat</button>
        {props.button}
      </div>

    </Modal>
  );
};

export default Notification;
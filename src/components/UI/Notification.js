import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import Modal from './Modal';
import classes from './Notification.module.css';

const Notification = (props) => {
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
  return (
    <Modal show header={props.title} footer={props.footer} style={{ height: '50%' }}>
      <section
        className={cssClasses}
      >
        <p>{props.message}</p>
      </section>
      <div /*className='map-container'*/>
        {/* <Map center={props.coordinates} zoom={16} /> */}
        {props.map && <p>MAP</p>}
      </div>
      <div className={classes.buttons}>
        <button onClick={cancelHandler} className={classes.closeNotification}>Kapat</button>
        {props.button}
      </div>

    </Modal>
  );
};

export default Notification;
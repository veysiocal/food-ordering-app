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
    <Modal show header={props.title}>
      <section
        className={cssClasses}
      >
        <p>{props.message}</p>
        <button onClick={cancelHandler}>Cancel</button>
      </section>
      <div /*className='map-container'*/>
        {/* <Map center={props.coordinates} zoom={16} /> */}
        <p>MAP</p>
      </div>
    </Modal>
  );
};

export default Notification;
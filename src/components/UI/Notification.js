import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
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
    <section 
    className={cssClasses}
    >
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <button onClick={cancelHandler}>Cancel</button>
    </section>
  );
};

export default Notification;
import classes from './Card.module.css';

const Card = (props) => {
  return (
    <section
      className={`${classes.cardCustom} ${props.className ? props.className : ''}`}
    >
      {props.children}
    </section>
  );
};

export default Card;

import styles from './Welcome.module.css';

const Welcome = (props) => {
  return <p className={styles.welcome}>Welcome ! {props.userName},</p>;
};

export default Welcome;

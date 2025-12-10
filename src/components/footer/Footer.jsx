import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>DJ</div>
      <div className={styles.text}>
        Lama creative thoughts agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

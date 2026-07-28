// import { Flex, Spin } from "antd";
//
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    // <Flex align="center" gap="medium" className={styles.flexLoader}>
    //   <Spin size="large" />
    // </Flex>
    <div className={styles.loaderDiv}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;

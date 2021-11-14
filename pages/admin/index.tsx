import styles from "../../styles/Home.module.css";
import Login from "../../components/Login";

// interface Props {
//   title: string;
// }

const Admin = () => {
  return (
    <div className={styles.container}>
      <h3>admin</h3>
      <Login />
    </div>
  );
};

export default Admin;

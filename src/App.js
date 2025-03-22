import styles from "./App.module.scss";
import WidgetContainer from "./WidgetContainer";

const ListCard = () => {
  return (
    <div className={styles.listCardWrapper}>
      <div className={styles.title}>
        <h2>sunt in culpa qui officia deserunt mollit anim.</h2>
        <span className={styles.tag}>public</span>
      </div>

      <hr />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat
      </p>
      <div className={styles.meta}>
        <span className={styles.lang}>HTML</span>
        <span className={styles.dot}></span>
        <span className={styles.updated}>Updated on 16 July, 2023</span>
      </div>
    </div>
  );
};

function App() {
  return (
    <WidgetContainer>
      <h1>List of GoDaddy's Github Repo</h1>
      {new Array(10).fill(0).map((item) => (
        <ListCard />
      ))}
    </WidgetContainer>
  );
}

export default App;

import styles from "./index.module.scss";

function WidgetContainer({ children, customWrapperClass = "" }) {
  return (
    <div className={`${styles["contentWrapper"]} ${customWrapperClass}`}>
      <div className="content">{children}</div>
    </div>
  );
}

export default WidgetContainer;

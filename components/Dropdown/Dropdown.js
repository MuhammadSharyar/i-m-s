import styles from "./style.module.css";

export default function Dropdown(props) {
  return (
    <div>
      <select
        className={styles.dropdown}
        required
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

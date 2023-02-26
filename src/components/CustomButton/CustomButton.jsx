import styles from './CustomButton.css';

export const CustomButton = ({ agree, onClick, content, reject }) => {
  if (agree) {
    return (
      <button className="button_agree" onClick={onClick}>
        {content}
      </button>
    );
  }

  if (reject) {
    return (
      <button className="button_reject" onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div>CustomButton</div>;
};

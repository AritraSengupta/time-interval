const Label = (props) => {
  const { label, value } = props;

  return (
    <div>
      <span>{label}:</span>
      <span> {value}</span>
    </div>
  );
};

export default Label;
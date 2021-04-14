const Label = (props) => {
  const { label, value } = props;

  return (
    <div className={'label'}>
      <span>{label}:</span>
      <span> {value}</span>
    </div>
  );
};

export default Label;
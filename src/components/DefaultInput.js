import { useState } from 'react';

const DefaultInput = (props) => {
  const { onSave, onCancel, defaultValue } = props;

  const [value, setValue] = useState(defaultValue);
  return (
    <div className={'modal'}>
      <span onClick={onCancel} className={'close'}>X</span>
      <div className={'modal-content'}>
        <input value={value} onChange={e => setValue(e.target.value)} type={'number'} />
        <button onClick={() => onSave(value)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );

}

export default DefaultInput;
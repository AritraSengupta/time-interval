import { useState } from 'react';

const DefaultInput = (props) => {
  const { onSave, onCancel, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);

  return (
    <div className={'modal'}>
      <div className={'modal-content'}>
        <span onClick={onCancel} className={'close'}>X</span>
        <div className={'modal-body'}>
          <span>Enter Default Duration(minutes): </span>
          <input value={value} onChange={e => setValue(e.target.value)} type={'number'} />
        </div>
        <div className={'modal-footer'}>
          <button onClick={() => onSave(value)} className={'floated-right'}>Save</button>
          <button onClick={onCancel} className={'floated-right button5'}>Cancel</button>
        </div>
      </div>
    </div>
  );

}

export default DefaultInput;
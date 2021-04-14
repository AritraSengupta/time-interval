import { useStore } from "../store";
import Duration from "./Duration";
import Label from "./Label";

const List = () => {
  const startTime = useStore(state => state.startTime);
  const endTime = useStore(state => state.endTime);
  const durationLabel = useStore(state => state.durationLabel);

  return (
    <div className={'list-holder'}>
      <Duration />
      <Label label={'Duration Type'} value={durationLabel}/>
      <Label label={'Start Time(ms)'} value={startTime} />
      <Label label={'End Time(ms)'} value={endTime} />
    </div>
  );
}

export default List;
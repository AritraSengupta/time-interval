import { List, Title } from '../components';


const ScreenC = (props) => {
  const { title } = props;
  return (
    <div>
      <Title title={title} />
      <List />
    </div>
  );
};

export default ScreenC;
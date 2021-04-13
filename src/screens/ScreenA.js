import { List, Title } from '../components';


const ScreenA = (props) => {
  const { title } = props;
  return (
    <div>
      <Title title={title} />
      <List />
    </div>
  );
};

export default ScreenA;
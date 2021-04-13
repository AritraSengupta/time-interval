import { Title, List } from '../components';

const ScreenB = (props) => {
  const { title } = props;
  return (
    <div>
      <Title title={title} />
      <List />
    </div>
  );
};

export default ScreenB;
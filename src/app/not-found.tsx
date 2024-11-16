import EmptyState from '@src/shared/EmptyState';
import notFound from '../../public/not-found.png';
const NotFound = () => {
  return (
    <EmptyState
      title="Not Found :("
      subTitle="The Resource you requested for could not be found!"
      img={notFound}
    />
  );
};

export default NotFound;

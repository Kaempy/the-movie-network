'use client';

import EmptyState from '@src/shared/EmptyState';
import { useEffect } from 'react';
import errorImg from '../../public/error.png';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <EmptyState
      title="Oppsss... Something went wrong :("
      subTitle="An error occured while processing your request!"
      img={errorImg}
      reset={reset}
    />
  );
};

export default Error;

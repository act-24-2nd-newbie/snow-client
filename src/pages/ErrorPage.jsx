import { useRouteError } from 'react-router-dom';

import imgNotFound from '@/assets/illust_error.png';
import imgError from '@/assets/illust_500.png';
import Header from '@/components/Header.jsx';

/**
 * @typedef ErrorResponse
 * @prop {string} [data]
 * @prop {boolean} [internal]
 * @prop {number} [status]
 * @prop {string} [statusText]
 */
export default function ErrorPage() {
  /** @type {ErrorResponse} */
  const routerError = useRouteError();

  let errorImg;

  if (routerError?.status === 404) {
    errorImg = <img src={imgNotFound} alt="not found" />;
  } else {
    errorImg = <img src={imgError} alt="error" />;
  }

  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center">{errorImg}</main>
    </>
  );
}

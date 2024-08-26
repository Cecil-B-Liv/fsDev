import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <h1 className="display-4 text-danger">Oops!</h1>
        <p className="lead">The page you accessed does not exist.</p>
        {err && <p className="text-muted">Error: {err.statusText || err.message}</p>}
        <Link to="/" className="btn btn-primary mt-3">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

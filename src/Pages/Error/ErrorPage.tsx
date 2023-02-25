import { isRouteErrorResponse, NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div>
          This page doesn't exist! <NavLink to='/'>Go Home</NavLink>
        </div>
      );
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
  }

  return (
    <div>
      Something went wrong <NavLink to='/'>Go Home</NavLink>
    </div>
  );
}

import React from 'react';
import {Redirect, useLocation} from '@docusaurus/router';

function toLatestPath(pathname) {
  const rewritten = pathname.replace(/\/v1\.6(?=\/|$)/, '');
  return rewritten === '' ? '/' : rewritten;
}

export default function LegacyV16PathRedirect() {
  const location = useLocation();
  const pathname = toLatestPath(location.pathname);
  const target = `${pathname}${location.search || ''}${location.hash || ''}`;

  return <Redirect to={target} />;
}

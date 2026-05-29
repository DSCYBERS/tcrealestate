import React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';

function AdminShell() {
  return (
    <>
      <Outlet />
    </>
  );
}

export const Route = createRootRoute({
  component: AdminShell,
});

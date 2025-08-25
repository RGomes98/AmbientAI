'use client';

import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    (async () => {
      await fetch('api/session/login');
    })();
  }, []);

  return <h1>Login</h1>;
}

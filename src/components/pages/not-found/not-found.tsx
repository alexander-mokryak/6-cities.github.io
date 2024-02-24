import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound () {
  return (
    <section style={{marginInline: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '210px', minHeight: '100vh'}}>
      <h1 style={{marginBlock: '0 20px', color: '#4481c3', fontSize: '72px', lineHeight: '1.2'}}>Oops!</h1>
      <p style={{marginBlock: '0 10px', color: '#4481c3', fontSize: '24px', lineHeight: '1.2'}}>Page not found</p>
      <Link to={'/'} style={{marginBlock: '0', padding: '5px', color: '#4481c3', fontSize: '16px', lineHeight: '1.2', textDecoration: 'underline'}}>go to main</Link>
    </section>
  );
}

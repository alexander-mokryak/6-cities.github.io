import React from 'react';

export default function NotFound () {
  return (
    <section style={{marginInline: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', maxWidth: '210px', minHeight: '100vh'}}>
      <h1 style={{marginBlock: '0 20px', color: 'cadetblue', fontSize: '72px', lineHeight: '1.2'}}>Oops!</h1>
      <p style={{marginBlock: '0 10px', color: 'cadetblue', fontSize: '24px', lineHeight: '1.2'}}>Page not found</p>
      <a style={{marginBlock: '0', padding: '5px', color: 'cadetblue', fontSize: '16px', lineHeight: '1.2', border: '2px solid cadetblue', borderRadius: '10px'}} href="/">go to main</a>
    </section>
  );
}

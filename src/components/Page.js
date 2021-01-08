import React from 'react';
import NavBar from './NavBar';

const Page = ({children}) => {
  return (
    <>
       <NavBar/>
       {children} 
    </>
  );
}

export default Page;

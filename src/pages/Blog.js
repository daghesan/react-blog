import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import { getWindowDimension } from '../utils/utils';
import { React, useState, useEffect } from 'react';

export default function Blog() {

  /* it should also determine whether to show the post-list in the "blog style", based on the device size  */
  const [ dimension, setDimension ] = useState(getWindowDimension());

  function checkDesktopSize(){
    if( dimension.width >= 992 )
      return true;
    else
      return false;
  }

  useEffect(() => {
    function handleResize() {
      setDimension(getWindowDimension());
      console.log(dimension);
  }
    window.addEventListener('resize', handleResize);

    return ()=>{
      window.removeEventListener('resize', handleResize);
    }

  })

  return (
    <div className='blog'>
      <div className='content'>
      <Navbar></Navbar>
        <div className='main'>
          <PostList isBlogProp={ checkDesktopSize() ? true : false} perPage={checkDesktopSize() ? 10 : 4}></PostList>
        </div>
      </div>  
        <Footer></Footer>
    </div>
  )
}

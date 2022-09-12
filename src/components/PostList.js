import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from './Button.js';
import Pagination from './Pagination.js';
import Post from './Post.js';
import Loadbar from './Loadbar.js';
import ErrorMessage from './ErrorMessage.js';

export default function PostList(props) {

const isInitialMount = useRef(true);
const isPageChange = useRef(false);
  /* post data state */
const [ posts, setPosts ] = useState(null); //1
const [ postData, setPostData ] = useState([]);
const [ images, setImages ] = useState([]);
const [ error, setError ] = useState(false);
  /* load more posts state */
const [ currentPage, setCurrentPage ] = useState(1); //3
const [ currentPerPage, setCurrentPerPage] = useState(props.perPage);
  /* pagination state */
const [ maxPageLimit, setMaxPageLimit ] = useState(5);
const [ minPageLimit, setMinPageLimit ] = useState(0); 
  /* other constants */
const isBlog = props.isBlogProp;
const perPage = props.perPage;
const nPages = 5;
const total = Math.ceil(postData.total / perPage);
  
const getPosts = async () => {

  try{
    const response = await axios.get(`https://frontend-case-api.sbdev.nl/api/posts?page=${currentPage}`,{headers: {token: "pj11daaQRz7zUIH56B9Z"}});
    
      !isBlog && currentPage > 1 ? setPosts([...posts,...response.data.data]) : setPosts(response.data.data);
      setPostData({current_page: response.data.current_page, total: response.data.total, per_page: response.data.per_page});
      isPageChange.current = true;
    
  }catch(err){
    console.log("Error on GET: ", err)
    setError(true);
  } 

}

/* handles the logic of the "load more" button */

function loadMore(){
  isInitialMount.current = false;
    if(currentPerPage % postData.per_page !== 0){ // if currentPage is not a multiple of 10, then add more elements until a multiple of 10 is reached
      if (currentPerPage+perPage < postData.per_page*currentPage){
        setCurrentPerPage(currentPerPage + perPage);
      }else{
        setCurrentPerPage(postData.per_page*currentPage);
      }
    }else{ // currentPerPage is a multiple of 10, then load a new page with 10 new posts and show more of them
      setCurrentPerPage(currentPerPage + perPage);
      setCurrentPage(currentPage+1);
    }
}

const onPageChange = (pageNumber) =>{
  isPageChange.current = false;
  if (pageNumber === total){ //account for the last one when clicked directly
    setMaxPageLimit(total);
    setMinPageLimit(total - nPages);
  } else if(pageNumber === 1) {
    setMaxPageLimit(nPages);
    setMinPageLimit(0);
  }
  setCurrentPage(pageNumber);
}

const onPrevClick = () =>{
  isPageChange.current = false;
 /* when clicked, jump immediatly to max-npages and min-npages */
  /* check the lower limit first which is nPages+1 */
  if (currentPage > nPages + 1){
    setMaxPageLimit(maxPageLimit - nPages);
    setMinPageLimit(minPageLimit - nPages);
    setCurrentPage(minPageLimit);
    setCurrentPage(minPageLimit);
  }else{ //set the first page
    setMaxPageLimit(nPages);
    setMinPageLimit(0);
    setCurrentPage(1);
  } 
}

const onNextClick = () => {
  isPageChange.current = false;
    /* when clicked, I want to jump immediatly to max+npages and min+npages */
/* first check that the upper limit + npages is still below the total amount of pages */
if (currentPage < total - nPages){
  setMaxPageLimit(maxPageLimit + nPages);
  setMinPageLimit(minPageLimit + nPages);
  setCurrentPage(maxPageLimit+1);
}else{ //set the last page
  setMaxPageLimit(total);
  setMinPageLimit(total - nPages);
  setCurrentPage((total - nPages)+1);
}
}

useEffect( () => {
    getPosts();
 }
, [currentPage] )

/* checking the isInitialMount parameter in order to function as componentDidUpdate() */

useEffect( () =>{
  if(!isInitialMount.current){
    if(!isBlog){
      var timeoutID = setTimeout(
        ()=>{
          window.scrollTo(0, document.documentElement.scrollHeight);
        },500
      )
    }

    return ()=>{
      clearTimeout(timeoutID);
    }

  }
  
},[currentPage, currentPerPage])

if (!error){
  return (
    <div className={ isBlog? 'container large' : 'container'}>
      <div className='posts'>
              {
              posts && isPageChange.current ?
              posts.filter( (p,i) => (posts.indexOf(p) < currentPerPage) ).map( (p,i) =>{return(
                  <Post key={i} isBlog={isBlog} date={p.created_at} category={p.category.name} title={p.title} content={p.content} 
                  imageUrl={`https://frontend-case-api.sbdev.nl/storage/${p.img_url}`}></Post>
                  ) 
              })
              :
              <Loadbar></Loadbar>
              }  
      </div>
      
    { !isBlog ? <Button elementId={"load-more"} onClickFn={loadMore} text={"Meer laden"}></Button> 
    : 
    <Pagination 
        count={postData.total} //total number of posts
        totalPages={total} //amount of pages
        currentPage={currentPage}
        min={minPageLimit}
        max={maxPageLimit}
        onPrevClick={onPrevClick} 
        onNextClick={onNextClick}
        onPageChange={onPageChange}
        nPages={nPages}
        ></Pagination>}
    </div>
  )
}else{
  return(
    <ErrorMessage message={<div>An error has occurred while loading the blog. <br /> Please check your connection or try again later.</div>}></ErrorMessage>
  )
}
  
}

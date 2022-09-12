import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { nullCheck } from '../utils/utils';
import MessageForm from './MessageForm';
import Alert from './Alert';

export default function AddPost() {

  const [ categories, setCategories ] = useState(null);  
  const [ title, setTitle ] = useState("");
  const [ message, setMessage] = useState("");
  const [ filename, setFilename ] = useState("");
  const [ file, setFile ] = useState(null);
  const [ category, setCategory ] = useState(0);
  const [ loading, setLoading ] = useState(false);

  const getCategories = async () => {
    try{
      const response = await axios.get("https://frontend-case-api.sbdev.nl/api/categories",{headers: {token: "pj11daaQRz7zUIH56B9Z"}})
      setCategories(response.data);
    }catch(err){
      console.log("GET failed with error: ", err);
    }
  }

  const postMessage = async (formData) => {
    await axios({
        method: "post",
        url: "https://frontend-case-api.sbdev.nl/api/posts",
        data: formData,
        headers: { token: "pj11daaQRz7zUIH56B9Z","Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          const successEl = document.getElementById("success")
          setVisible(successEl);
          setLoading(false);
        })
        .catch(function (response) {
          const errorEl = document.getElementById("error")
          setVisible(errorEl);
          setLoading(false);
        });
  }


  /* alert visibility function */

  function setVisible(el){
    el.style.visibility="visible";
    el.style.opacity="1";
  }

  /* handlers */

  function handleClose(event){
    event.target.parentElement.parentElement.style.visibility = "hidden";
    setTimeout(refreshPage(), 2000)
  }

  function handleCloseNoRefresh(event){
    event.target.parentElement.parentElement.style.visibility = "hidden";
  }

  function handleTitleChange(event){
    setTitle(event.target.value);
  }

  function handleMessageChange(event){
    setMessage(event.target.value);
  }

  function handleCategoryChange(event){
    setCategory(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    if (nullCheck(file) || title === "" || message === "" || category === 0){
      const fill = document.getElementById("fill")
      setVisible(fill);
      return;
    }

    setLoading(true);

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", message);
    formdata.append("category_id", category);
    formdata.append("image", file, filename);

    postMessage(formdata);
    
  }

  function handleSelectedFile(event){
    setFilename(event.target.files[0].name);
    setFile(event.target.files[0]);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect( () => {
    getCategories();
  }, [] )

  return (
    <div className='add-post'>
    <MessageForm 
    loading={loading}
    header={"Plaats een blog bericht"} handleSubmit={handleSubmit} 
    title={title} titleLabel={"Berichtnaam"} titlePlaceholder={"Geen titel"} handleTitleChange={handleTitleChange}
    selectLabel={"Categorie"} selectValue={category} selectDefaultText={"Geen categorie"} selectArray={categories} handleCategoryChange={handleCategoryChange}
    fileLabel={"Header afbeelding"} filename={filename} handleSelectedFile={handleSelectedFile}
    textareaLabel={"Bericht"} message={message} handleMessageChange={handleMessageChange}
    >  
    </MessageForm>
    <Alert elementId="success" message={"Success! Bedankt voor Uw bericht."} handleClose={handleClose} />
    <Alert elementId="error" message={"Er is iets misgegaan. Probeer opnieuw later."} handleClose={handleCloseNoRefresh}/>
    <Alert elementId="fill" message={"U moet alle velden invullen."} handleClose={handleCloseNoRefresh}/>
    </div>
  )
}

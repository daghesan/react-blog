import React from 'react'
import TextInput from './TextInput';
import Select from "./Select";
import FileInput from './FileInput';
import Textarea from './Textarea';
import Loadbar from './Loadbar';

export default function MessageForm({header, handleSubmit, title, titleLabel, titlePlaceholder, handleTitleChange, 
    selectLabel, selectValue, selectDefaultText, selectArray,handleCategoryChange, 
    fileLabel, filename, handleSelectedFile,
    textareaLabel, message, handleMessageChange,
    loading
    }) {

  return (
    <div className='message-form'>
        <h2>{header}</h2>
        {loading? <Loadbar></Loadbar>: 
        <form className='form' onSubmit={handleSubmit}>

            <TextInput label={titleLabel} value={title} handler={handleTitleChange} placeholder={titlePlaceholder} ></TextInput>
            <Select label={selectLabel} selectValue={selectValue} handler={handleCategoryChange} defaultText={selectDefaultText} optionArray={selectArray}></Select>
            <FileInput label={fileLabel} filename={filename} handler={handleSelectedFile} ></FileInput>    
            <Textarea label={textareaLabel} message={message} handler={handleMessageChange} ></Textarea>

        </form>
        }
    </div>
  )
}

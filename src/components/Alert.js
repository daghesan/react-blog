export default function Alert({elementId, message, handleClose}) {
  return (
    <div id={elementId} className="alert">
        <div className="alert-box">
        <p>{message}</p>
        <span className="closebtn" onClick={handleClose}>&times;</span> 
        </div>
    </div>
  )
}

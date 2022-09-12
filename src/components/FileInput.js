import camera from "../assets/camera.png";

export default function FileInput({label, filename, handler}) {
  return (
    <div className='file-input'>
        <label>{label}:</label>
            <label className='upload' htmlFor='upload'>
              <img src={camera}></img>
              <p className="file-btn">Kies bestand</p>
              <p className="italic">{filename}</p>
            </label>
        <input id="upload" type="file" accept=".jpg, .png, .jpeg" onChange={handler} hidden/>
    </div>
  )
}

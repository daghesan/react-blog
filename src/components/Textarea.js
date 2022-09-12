export default function Textarea({label, message, handler}) {
  return (
    <div className='textarea'>
        <label>{label}</label>
        <textarea value={message} onChange={handler} placeholder=""></textarea>    
        <input className='orange-btn' type="submit" value="Bericht aanmaken" />
    </div>
  )
}

export default function TextInput({label, value, handler, placeholder}) {
  return (
    <div className='text-input'>
        <label>{label}</label>
        <input type="text" value={value} onChange={handler} placeholder={placeholder}/>
    </div>
  )
}

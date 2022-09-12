export default function Select({label, selectValue, handler, defaultText, optionArray}) {
  return (
    <div className="select">
        <label>{label}:</label>
        <select value={selectValue} onChange={handler}>
            <option value="" hidden>{defaultText}</option>
            {
                optionArray ? (
                    optionArray.map( (a, i) =>{
                        return(<option key={i} value={a.id}>{a.name}</option>);
                    })
                    ) : ("")
            }
        </select>
    </div>
  )
}

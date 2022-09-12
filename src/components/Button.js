export default function Button({onClickFn, text, elementId}) {
  return (
    <div id={elementId} className='button'>
        <button className="orange-btn" onClick={onClickFn}>{text}</button>
    </div>
  )
}

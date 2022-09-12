import  {convertToDate} from '../utils/utils.js';

export default function Post({isBlog, date, category, title, content, imageUrl }) {
  return (
    <div className={isBlog? 'post-item col-sm' : 'post-item col-lg'} >
        <div className='post-header' style={{backgroundImage: `url("${imageUrl}")`}}>
            <p id="date">{convertToDate(date)}</p>
            <p id="cat">{category}</p>
        </div>
        <div className='post-content'>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    </div>
  )
}

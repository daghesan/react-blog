import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PageNotFound() {
  return (
    <div className='not-found'>
      <div className='content'>
      <Navbar></Navbar>
        <div className='main'>
          <h1 id="not-found">Sorry this page does not exist!</h1>
        </div>
      </div>  
        <Footer></Footer>
    </div>
  )
}

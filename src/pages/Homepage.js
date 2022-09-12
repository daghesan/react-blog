import AddPost from '../components/AddPost';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';

export default function Homepage() {

  return (
    <div className='homepage'>
      <div className='content'>
      <Navbar></Navbar>
        <div className='main'>
            <AddPost></AddPost>
            <PostList isBlogProp={false} perPage={4}></PostList>
        </div>
      </div>  
        <Footer></Footer>
    </div>
  )
}

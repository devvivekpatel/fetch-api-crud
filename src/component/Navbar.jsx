import {Component} from 'react'
import {Link} from 'react-router-dom'


export default class Navbar extends Component{
    render(){
        return(<>
        <div style={{height:'50px',width:'full',backgroundColor:'purple',display:'flex',justifyContent:'center',alignItems:'center',gap:'100px',color:'white'}}>

        <li class="nav-item" style={{listStyle:'none',color:'white',fontSize:'20px'}}>
        <Link to="/fetch" className='nav-link active' style={{color:'white',listStyle:'none'}}>Fetch</Link>
        </li>
        <li class="nav-item" style={{listStyle:'none',color:'white',fontSize:'20px'}}>
        <Link to="/fetchui" className='nav-link active' style={{color:'white',listStyle:'none'}}>Fetch UI</Link>
        </li>
        <li class="nav-item" style={{listStyle:'none',color:'white',fontSize:'20px'}}>
        <Link to="/ui" className='nav-link active' style={{color:'white',listStyle:'none'}}>UI</Link>
        </li>

        </div>
        </>)
    }
}
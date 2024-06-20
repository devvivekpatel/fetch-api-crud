
import './App.css';
import Fetch from './component/Fetch';
import FetchUi from './component/FetchUi';
import Navbar  from './component/Navbar';
import Ui from './component/Ui';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
  <>
  <Navbar/>
  <Routes>
    <Route path='/fetch' element={<Fetch/>}/>
    <Route path='/fetchui' element={<FetchUi/>}/>
    <Route path='/ui' element={<Ui/>}/>

  </Routes>
  </>
  );
}

export default App;

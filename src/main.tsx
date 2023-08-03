import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './routes/Home';
import AllPlayers from './routes/AllPlayers'
import SinglePlayer from './routes/SinglePlayer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
<BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/players' element={<AllPlayers />} />
        <Route path='/players/:id' element={<SinglePlayer />} />
    </Routes>
</BrowserRouter>
)

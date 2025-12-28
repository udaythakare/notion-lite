import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TaskManagerPage from './pages/TaskManagerPage'
function App() {

  return (
    <>
      <div>Welcome to Notion By Uday Thakare</div>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/task-manager' element={<TaskManagerPage />} />
      </Routes>

    </>
  )
}

export default App

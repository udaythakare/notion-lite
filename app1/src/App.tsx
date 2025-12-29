import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TaskManagerPage from './pages/TaskManagerPage'
import ExamplePage from './pages/ExamplePage'
function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/task-manager' element={<TaskManagerPage />} />
        <Route path='/example' element={<ExamplePage />} />
      </Routes>

    </>
  )
}

export default App

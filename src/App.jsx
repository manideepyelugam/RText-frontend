import React from 'react'
import CodeInput from './pages/CodeInput'
import { Route, Routes } from 'react-router-dom'
import CodeEnter from './pages/CodeEnter'
import CodeView from './pages/CodeView'



const App = () => {
  return (
    <div >

      <Routes>

        <Route path='/' element={<CodeEnter/>}/>
        <Route path='/codeinput' element={<CodeInput/>}/>
        <Route path='/codeview' element={<CodeView/>}/>


      </Routes>
    </div>
  )
}

export default App
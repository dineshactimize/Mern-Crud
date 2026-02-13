import React from 'react'
import EmployeeTable from './Table'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
      <EmployeeTable/>
    </Provider> 
     
    </div>
  )
}

export default App

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import './App.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PrivateRoute } from './AuthProvider'
import DasboardPage from './app/DasboardPage/DasboardPage'
import ModalProvider from './common/ModalProvider'

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <Router>
          <Routes location={location} key={location.pathname}>
            <Route element={<PrivateRoute/>}>
              <Route path='/' element={<DasboardPage/>} />
            </Route>
          </Routes>
        </Router>
      </ModalProvider>
    </Provider>
  )
}

export default App

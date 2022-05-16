import React from 'react'
import Main from './Components/Main/Main'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import store, {persistor} from './Redux/store'
import Loader from './Components/SubComponents/Loader/Loader'


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader/>} persistor={persistor}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

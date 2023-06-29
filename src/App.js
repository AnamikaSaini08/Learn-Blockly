import React from 'react';
import { Provider} from 'react-redux';
import store from '../src/utils/store';
import Home from './Components/Home';

function App() {
  return (
    <Provider store={store}>
       <Home/>
    </Provider>
  );
}
export default App;
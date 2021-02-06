import Routes from './components/Routes'
import {Provider} from 'react-redux'
import store from './components/store.jsx'
import Nav from './components/Nav'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
      <Provider store={store}>
        <div className="vh-100">
        <Nav/>
            <Routes/>         
        </div>
      </Provider>
  );
}

export default App;

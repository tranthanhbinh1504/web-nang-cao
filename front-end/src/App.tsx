import './App.css';
import Footer from './components/Footer/footer'
import Header from './components/Header/header'

import SignIn from './pages/login';

function App() {
  return (
    <div className="App">
      <Header />
      <SignIn />
      
      <div className="Footer">
      <Footer />
      </div>
    </div>
    
  );
}

export default App;

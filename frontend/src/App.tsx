import './App.css';
import { Header } from './components/Header';
import { SignUpForm } from './components/sign-up/SignUpForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-300">
      <Header></Header>
      <SignUpForm></SignUpForm>
    </div>
  );
}

export default App;

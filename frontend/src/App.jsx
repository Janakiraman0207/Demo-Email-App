import './App.css';
import "../src/assets/fonts/fonts.css";
import { AppRoutes } from './routes/AppRoutes'

function App() {

  return (
    <>
      <div className="w-full hide-scrollbar">
        <AppRoutes/>
      </div>
    </>
  )
}
export default App;
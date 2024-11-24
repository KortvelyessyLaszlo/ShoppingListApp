import './App.css';
import { ShoppingLists } from './ShoppingLists';
import { Footer } from './Footer';

/**
 * The main application component that renders the shopping lists and footer.
 */
function App() {
  return (
    <div className="App">
      <ShoppingLists />
      <div className="Space"></div>
      <Footer />
    </div>
  );
}

export default App;
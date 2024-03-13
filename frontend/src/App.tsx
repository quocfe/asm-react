import { BrowserRouter } from 'react-router-dom';
import './index.css';
import RoutesMain from './routers';

function App() {
	return (
		<BrowserRouter>
			<RoutesMain />
		</BrowserRouter>
	);
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import store, { persistor } from './redux/store.ts';
import { SocketContextProvider } from './context/SocketContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SocketContextProvider>
					<App />
				</SocketContextProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

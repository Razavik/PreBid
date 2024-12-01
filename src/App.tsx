import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./components/Main/Pages/Catalog/Catalog";
import Main from "./components/layouts/Main";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Main />}>
					<Route index element={<Catalog />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UnregBlock from "../Main/NoneRegisterBlock/UnregBlock";

const Main = () => {
	return (
		<>
			<Header />
			<main>
				<UnregBlock />
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default Main;

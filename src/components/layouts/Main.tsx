import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UnregBlock from "../Main/NoneRegisterBlock/UnregBlock";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

const Main = () => {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const mainRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const mainElement = mainRef.current;
		if (mainElement) {
			const handleOpenLoginModal = () => {
				setIsRegisterModalOpen(false);
				setIsAuthModalOpen(true);
			};

			mainElement.addEventListener('openLoginModal', handleOpenLoginModal);
			return () => {
				mainElement.removeEventListener('openLoginModal', handleOpenLoginModal);
			};
		}
	}, []);

	const handleLoginClick = () => {
		setIsRegisterModalOpen(false);
		setIsAuthModalOpen(true);
	};

	const handleRegisterClick = () => {
		setIsAuthModalOpen(false);
		setIsRegisterModalOpen(true);
	};

	const handleLoginClose = () => {
		setIsAuthModalOpen(false);
	};

	const handleRegisterClose = () => {
		setIsRegisterModalOpen(false);
	};

	return (
		<>
			<Header onLoginClick={handleLoginClick} />
			<main ref={mainRef}>
				<UnregBlock onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
				<Outlet />
			</main>
			<Footer />
			<LoginForm
				isOpen={isAuthModalOpen}
				onClose={handleLoginClose}
				onRegisterClick={handleRegisterClick}
			/>
			<RegisterForm
				isOpen={isRegisterModalOpen}
				onClose={handleRegisterClose}
				onLoginClick={handleLoginClick}
			/>
		</>
	);
};

export default Main;

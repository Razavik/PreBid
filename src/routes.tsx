import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "@components/layouts/Main";
import Profile from "@components/Main/Pages/Profile/Profile";
import Catalog from "@components/Main/Pages/Catalog/Catalog";
import Auctions from "@components/Main/Pages/Auctions/Auctions";
import ProtectedRoute from "@components/ProtectedRoute";
import { ProductCard } from "@components/Main/Pages/ProductCard/ProductCard";
import Error404 from "@components/Main/Pages/Error404/Error404";

export const AppRoutes: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Main />}>
				<Route index element={<Catalog />} />
				<Route path="product-card/:id" element={<ProductCard />} />
				<Route
					path="profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="auctions"
					element={
						<ProtectedRoute>
							<Auctions />
						</ProtectedRoute>
					}
				/>
				<Route
					path="my-favorite"
					element={
						<ProtectedRoute>
							<Catalog category="favourite" />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	);
};

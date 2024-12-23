import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { setUserInfo } from "@store/slices/userSlice";
import { authService } from "@services/auth.service";

const STORAGE_KEY = "user_info";

export const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.info);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        const loadUser = async () => {
            try {
                // Сначала пробуем загрузить из localStorage
                const cachedUser = localStorage.getItem(STORAGE_KEY);
                if (cachedUser) {
                    dispatch(setUserInfo(JSON.parse(cachedUser)));
                }

                // Если пользователь авторизован, обновляем данные с сервера
                if (isAuthenticated) {
                    const response = await authService.getUserInfo();
                    dispatch(setUserInfo(response));
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
                }
            } catch (error) {
                console.error('Ошибка при загрузке пользователя:', error);
            }
        };

        if (!user && isAuthenticated) {
            loadUser();
        }
    }, [dispatch, user, isAuthenticated]);

    return { user };
};

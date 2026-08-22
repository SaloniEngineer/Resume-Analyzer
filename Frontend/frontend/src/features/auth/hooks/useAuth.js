import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

const withLoadingAndError = async (fn, setLoading) => {
    setLoading(true);
    try {
        return await fn();
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        setLoading(false);
    }
};

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleLogin = ({ email, password }) =>
        withLoadingAndError(async () => {
            const { user } = await login({ email, password });
            setUser(user);
        }, setLoading);

    const handleRegister = ({ username, email, password }) =>
        withLoadingAndError(async () => {
            const { user } = await register({ username, email, password });
            setUser(user);
        }, setLoading);

    const handleLogout = () =>
        withLoadingAndError(async () => {
            await logout();
            setUser(null);
        }, setLoading);

    return { user, loading, handleLogin, handleRegister, handleLogout };
};
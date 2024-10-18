import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import authService from './appwrite/auth';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
                dispatch(logout()); // Optionally log out the user on error
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400">
                <h1 className="text-xl">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-400">
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;

import { Home } from '@/features/misc';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />}></Route>
                </Route>
                <Route path="*" element={<h1>Not Found</h1>}></Route>
            </Routes>
        </Router>
    );
}

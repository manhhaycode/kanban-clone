import { ModalRoot } from '@/components/Modal';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
    return (
        <>
            <h1 className="text-center font-semibold text-2xl my-6">Kanban Board</h1>
            <main>
                <Outlet />
            </main>
            <ModalRoot />
        </>
    );
}

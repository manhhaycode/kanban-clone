import Error from '@/components/common/Error';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<Error />}>
            {children}
            <Toaster
                toastOptions={{
                    className: 'font-semibold text-sm',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
        </ErrorBoundary>
    );
}

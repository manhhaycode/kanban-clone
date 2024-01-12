import { useModalStore } from '@/stores/componentStore';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ModalRoot() {
    const { visible } = useModalStore();

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [visible]);

    return (
        <div className={twMerge('items-center flex inset-0 justify-center fixed z-50', !visible ? '-z-50' : '')}>
            <div id="main-modal"></div>
        </div>
    );
}

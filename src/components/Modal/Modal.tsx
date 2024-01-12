import { IDisclosure } from '@/common/types';
import { useModalStore } from '@/stores/componentStore';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { IoMdClose } from 'react-icons/io';

const sizeMap: Record<string, string> = {
    sm: 'w-96',
    md: 'w-[32rem]',
    lg: 'w-[48rem]',
};

export default function Modal({
    children,
    size = 'md',
    state,
    transitionTime = 300,
    onTransitionEnd,
}: {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    state: IDisclosure;
    transitionTime?: number;
    onTransitionEnd?: () => void;
}) {
    const modalRoot = document.getElementById('main-modal');
    const [isOpen, setIsOpen] = useState(state.isOpen);
    // const modalRef = useRef<HTMLDivElement>(null);
    const { setVisible } = useModalStore();

    const handleTransitionEnd = useCallback(() => {
        if (!state.isOpen) {
            setIsOpen(false);
            setVisible(false);
            onTransitionEnd?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isOpen]);

    useEffect(() => {
        if (state.isOpen) {
            setIsOpen(true);
            setVisible(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isOpen]);

    if (!modalRoot) return null;
    return (
        isOpen &&
        createPortal(
            <>
                <div
                    style={{ transitionDuration: `${transitionTime}ms` }}
                    className={twMerge(
                        'bg-[rgba(0,0,0,0.6)] fixed inset-0 transition-opacity opacity-0',
                        state.isOpen && 'opacity-100',
                    )}
                ></div>
                <div
                    style={{ transitionDuration: `${transitionTime}ms` }}
                    onTransitionEnd={handleTransitionEnd}
                    className={twMerge(
                        'modal-container transition-opacity opacity-0 min-h-[10rem] max-h-[calc(100vh-4rem)] ',
                        sizeMap[size],
                        state.isOpen && 'opacity-100',
                    )}
                >
                    <button onClick={state.close} className="absolute top-4 right-4">
                        <IoMdClose className="text-2xl" />
                    </button>
                    {children}
                </div>
            </>,
            modalRoot,
        )
    );
}

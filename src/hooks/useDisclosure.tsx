import React from 'react';

export default function useDisclosure() {
    // create state for isOpen
    const [isOpen, setIsOpen] = React.useState(false);

    // create function for open
    const open = () => setIsOpen(true);

    // create function for close
    const close = () => setIsOpen(false);

    // return isOpen, open, close
    return { isOpen, open, close };
}

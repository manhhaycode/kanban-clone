import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(function (
    props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    return (
        <input
            ref={ref}
            {...props}
            className={twMerge(
                'border-[#ced4da] border-solid border rounded-lg h-9 px-6 outline-none ',
                props.className,
            )}
        />
    );
});

export default Input;

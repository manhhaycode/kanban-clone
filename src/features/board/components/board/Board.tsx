import { Board } from '@/features/board';
import { FaRegEdit } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { ManageTask } from '../task';
import { forwardRef } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { twMerge } from 'tailwind-merge';

const Board = forwardRef(
    (
        {
            board,
            onClickEdit,
            onClickDelete,
            dragProps,
            containerProps,
        }: {
            board: Board;
            onClickEdit: () => void;
            onClickDelete: () => void;
            dragProps: DraggableProvided;
            containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        },
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <div
                ref={ref}
                {...dragProps.draggableProps}
                {...dragProps.dragHandleProps}
                {...containerProps}
                style={{ ...dragProps.draggableProps.style, ...containerProps?.style }}
                className={twMerge(
                    'bg-board px-4 py-5 rounded-lg flex flex-col items-start gap-y-5 h-fit shadow-board flex-shrink-0 w-[350px] max-h-[calc(100vh-150px)]',
                    containerProps?.className,
                )}
            >
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-lg font-semibold">{board.title}</h2>

                    <div className="flex gap-x-4">
                        <button onClick={onClickEdit} className="text-gray-400 hover:text-gray-500">
                            <FaRegEdit className="text-2xl" />
                        </button>

                        <button onClick={onClickDelete} className="text-gray-400 hover:text-gray-500">
                            <BsTrash className="text-2xl" />
                        </button>
                    </div>
                </div>
                <ManageTask board={board} />
            </div>
        );
    },
);

export default Board;

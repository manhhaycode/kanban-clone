import { forwardRef } from 'react';
import { Task } from '@/features/board';
import { BsTrash } from 'react-icons/bs';
import { DraggableProvided } from 'react-beautiful-dnd';

const Task = forwardRef(
    (
        {
            task,
            onClick,
            onDelete,
            dragProps,
        }: {
            task: Task;
            onClick: () => void;
            onDelete: () => void;
            dragProps: DraggableProvided;
        },
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                className="bg-white p-4 rounded-lg flex flex-col shadow-task cursor-pointer relative"
                {...dragProps.draggableProps}
                {...dragProps.dragHandleProps}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                >
                    <BsTrash className="text-xl" />
                </button>
                <h3 className="text-base font-semibold">{task.title}</h3>
                <div className="flex gap-3 flex-wrap mt-3">
                    {task.badges.map((badge) => (
                        <span
                            key={badge.id}
                            className="px-2 py-1 rounded-md text-xs font-medium"
                            style={{
                                backgroundColor: badge.color,
                                color: badge.color ? 'white' : 'black',
                            }}
                        >
                            {badge.title}
                        </span>
                    ))}
                </div>
            </div>
        );
    },
);

export default Task;

// export default function Task({ task, onClick, onDelete }: { task: Task; onClick: () => void; onDelete: () => void }) {
//     return (
//         <div onClick={onClick} className="bg-white p-4 rounded-lg flex flex-col shadow-task cursor-pointer relative">
//             <button
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete();
//                 }}
//                 className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
//             >
//                 <BsTrash className="text-xl" />
//             </button>
//             <h3 className="text-lg font-semibold">{task.title}</h3>
//             <p className="text-sm text-gray-400">{task.description}</p>
//             <div className="flex gap-3 flex-wrap mt-3">
//                 {task.badges.map((badge) => (
//                     <span
//                         key={badge.id}
//                         className="px-2 py-1 rounded-md text-xs font-medium"
//                         style={{
//                             backgroundColor: badge.color,
//                             color: badge.color ? 'white' : 'black',
//                         }}
//                     >
//                         {badge.title}
//                     </span>
//                 ))}
//             </div>
//         </div>
//     );
// }

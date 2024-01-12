import { Board, Task as TaskType } from '@/features/board';
import Task from './Task';
import { useState } from 'react';
import { useDisclosure } from '@/hooks';
import ModalTaskInfo from './ModalTaskInfo';
import ModalDeleteTask from './ModalDeleteTask';
import { IoMdAdd } from 'react-icons/io';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function ManageTask({ board }: { board: Board }) {
    const [task, setTask] = useState<TaskType | null>(null);
    const modalState = useDisclosure();
    const deleteState = useDisclosure();
    return (
        <>
            <Droppable droppableId={board.id} type="task">
                {(provided) => (
                    <div
                        className="grid gap-y-5 w-full min-h-[4rem] p-2 overflow-y-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {board.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <Task
                                        onClick={() => {
                                            setTask(task);
                                            modalState.open();
                                        }}
                                        onDelete={() => {
                                            setTask(task);
                                            deleteState.open();
                                        }}
                                        ref={provided.innerRef}
                                        task={task}
                                        dragProps={provided}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <button
                onClick={() => {
                    setTask(null);
                    modalState.open();
                }}
                className="flex gap-x-3 items-center"
            >
                <IoMdAdd className="text-2xl" />
                <p>Add Task</p>
            </button>
            <ModalTaskInfo board={board} task={task} state={modalState} />
            <ModalDeleteTask board={board} task={task!} state={deleteState} />
        </>
    );
}

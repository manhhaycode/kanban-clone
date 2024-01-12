import { IDisclosure } from '@/common/types';
import { Board, Task } from '@/features/board';
import Modal from '@/components/Modal';
import { useBoardStoreLocalStorage } from '@/stores/componentStore';
import toast from 'react-hot-toast';

export default function ModalDeleteTask({ state, task, board }: { state: IDisclosure; task: Task; board: Board }) {
    const { updateBoard } = useBoardStoreLocalStorage();
    return (
        <Modal state={state}>
            <div className="flex flex-col gap-y-9 p-6">
                <h1 className="font-semibold text-lg">Delete Task</h1>
                <p className="font-medium">Are you sure for delete task {task?.title} </p>
                <button
                    onClick={() => {
                        const newTasks = board.tasks.filter((t) => t.id !== task.id);
                        updateBoard({
                            ...board,
                            tasks: newTasks,
                        });
                        toast.success('Task deleted');
                        state.close();
                    }}
                    className="bg-red-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
}

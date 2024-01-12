import Modal from '@/components/Modal';
import { Board } from '@/features/board';
import { useBoardStoreLocalStorage } from '@/stores/componentStore';
import toast from 'react-hot-toast';
import { IDisclosure } from '@/common/types';

export default function ModalDeleteBoard({ board, state }: { board: Board | null; state: IDisclosure }) {
    const { deleteBoard } = useBoardStoreLocalStorage();
    return (
        <Modal state={state}>
            {board && (
                <div className="flex flex-col gap-y-9 p-6">
                    <h1 className="font-semibold text-lg">Delete Board</h1>
                    <p className="font-medium">Are you sure for delete board {board.title}</p>
                    <button
                        onClick={() => {
                            deleteBoard(board.id);
                            toast.success('Board deleted');
                            state.close();
                        }}
                        className="bg-red-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            )}
        </Modal>
    );
}

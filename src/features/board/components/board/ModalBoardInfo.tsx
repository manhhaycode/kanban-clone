import { IDisclosure } from '@/common/types';
import { Board } from '@/features/board';
import Modal from '@/components/Modal';
import Input from '@/components/common/Input';
import { useBoardStoreLocalStorage } from '@/stores/componentStore';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

export default function ModalBoardInfo({ board, state }: { board: Board | null; state: IDisclosure }) {
    const { addBoard, updateBoard } = useBoardStoreLocalStorage();
    return (
        <Modal state={state}>
            <div className="flex flex-col gap-y-9 p-6">
                <h1 className="font-semibold text-lg">{board ? 'Edit board' : 'New board'}</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target as HTMLFormElement);
                        console.log(data.get('title'));
                        if (data.get('title')?.length === 0) {
                            toast.error('Title is required');
                            return;
                        }
                        if (board) {
                            updateBoard({
                                ...board,
                                title: data.get('title') as string,
                            });
                        } else {
                            addBoard({
                                id: uuid(),
                                title: data.get('title') as string,
                                tasks: [],
                            });
                        }
                        state.close();
                        toast.success('Board saved');
                    }}
                    className="flex flex-col gap-y-4"
                >
                    <label className="font-semibold text-sm">Title</label>
                    <Input defaultValue={board?.title} name="title" placeholder="Title" />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
                    >
                        {board ? 'Save' : 'Add'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}

import { useBoardStoreLocalStorage } from '@/stores/componentStore';
import Board from './Board';
import { useDisclosure } from '@/hooks';
import { useState } from 'react';
import { Board as BoardType } from '@/features/board';
import ModalBoardInfo from './ModalBoardInfo';
import { IoMdAdd } from 'react-icons/io';
import ModalDeleteBoard from './ModalDeleteBoard';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

export default function ManageBoard() {
    const { boards, setBoards } = useBoardStoreLocalStorage();
    const modalState = useDisclosure();
    const deleteState = useDisclosure();
    const [board, setBoard] = useState<BoardType | null>(null);
    return (
        <>
            <DragDropContext
                onDragEnd={(result) => {
                    const { destination, source, type } = result;
                    if (!destination) return;

                    if (type === 'board') {
                        const newBoards = [...boards];
                        const [removed] = newBoards.splice(source.index, 1);
                        newBoards.splice(destination.index, 0, removed);
                        setBoards(newBoards);
                    } else if (type === 'task') {
                        const newBoards = [...boards];
                        const sourceBoard = newBoards.find((board) => board.id === source.droppableId);
                        const destinationBoard =
                            source.droppableId !== destination.droppableId
                                ? newBoards.find((board) => board.id === destination.droppableId)
                                : sourceBoard;

                        const [removed] = sourceBoard!.tasks.splice(source.index, 1);
                        if (!removed) return;
                        destinationBoard!.tasks.splice(destination.index, 0, removed);
                        setBoards(newBoards);
                    }
                }}
            >
                <Droppable droppableId="board-list" type="board" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            className="flex gap-8 max-w-[calc(100vw-4rem)] py-4 overflow-x-auto"
                            {...provided.droppableProps}
                        >
                            {boards.map((board, index) => (
                                <Draggable key={board.id} draggableId={board.id} index={index}>
                                    {(provided, snapshot) => (
                                        <Board
                                            containerProps={
                                                snapshot.isDragging
                                                    ? {
                                                          style: {
                                                              backgroundColor: 'rgba(142, 209, 252, 0.6)',
                                                          },
                                                      }
                                                    : undefined
                                            }
                                            ref={provided.innerRef}
                                            onClickEdit={() => {
                                                setBoard(board);
                                                modalState.open();
                                            }}
                                            onClickDelete={() => {
                                                setBoard(board);
                                                deleteState.open();
                                            }}
                                            board={board}
                                            dragProps={provided}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            <button
                                onClick={() => {
                                    setBoard(null);
                                    modalState.open();
                                }}
                                className="flex gap-x-2 items-center flex-shrink-0 h-fit"
                            >
                                <IoMdAdd size={32} />
                                <p className="font-semibold text-lg">Add board</p>
                            </button>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <ModalBoardInfo board={board} state={modalState} />
            <ModalDeleteBoard board={board} state={deleteState} />
        </>
    );
}

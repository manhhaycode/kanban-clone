import { Board, Task } from '@/features/board';
import { create } from 'zustand';

interface BoardState {
    boards: Board[];
    setBoards: (boards: Board[]) => void;
    addBoard: (board: Board) => void;
    deleteBoard: (boardId: string) => void;
    updateBoard: (board: Board) => void;
}

export const boardStore = create<BoardState>((set) => ({
    boards: [],
    setBoards: (boards) => set(() => ({ boards })),
    addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
    deleteBoard: (boardId) =>
        set((state) => ({
            boards: state.boards.filter((board) => board.id !== boardId),
        })),
    updateBoard: (board) =>
        set((state) => ({
            boards: state.boards.map((b) => (b.id === board.id ? board : b)),
        })),
}));

// convert boardStore to Persisting local storage

export const useBoardStoreLocalStorage = create<BoardState>((set) => ({
    boards: JSON.parse(localStorage.getItem('boards') || '[]'),
    setBoards: (boards) => {
        localStorage.setItem('boards', JSON.stringify(boards));
        set(() => ({ boards }));
    },
    addBoard: (board) =>
        set((state) => {
            const newBoards = [...state.boards, board];
            localStorage.setItem('boards', JSON.stringify(newBoards));
            return { boards: newBoards };
        }),
    deleteBoard: (boardId) =>
        set((state) => {
            const newBoards = state.boards.filter((board) => board.id !== boardId);
            localStorage.setItem('boards', JSON.stringify(newBoards));
            return { boards: newBoards };
        }),
    updateBoard: (board) =>
        set((state) => {
            const newBoards = state.boards.map((b) => (b.id === board.id ? board : b));
            localStorage.setItem('boards', JSON.stringify(newBoards));
            return { boards: newBoards };
        }),
}));

interface ModalState {
    visible: boolean;
    setVisible: (visible: boolean) => void;

    boardModal: {
        visible: boolean;
        board: Board | null;
    };
    setBoardModal: (boardModal: { visible: boolean; board: Board | null }) => void;

    taskModal: {
        visible: boolean;
        task: Task | null;
    };
    setTaskModal: (taskModal: { visible: boolean; task: Task | null }) => void;
    reset: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    visible: false,
    setVisible: (visible) => set(() => ({ visible })),

    boardModal: {
        visible: false,
        board: null,
    },
    setBoardModal: (boardModal) => set(() => ({ boardModal, visible: boardModal.visible })),

    taskModal: {
        visible: false,
        task: null,
    },
    setTaskModal: (taskModal) => set(() => ({ taskModal, visible: taskModal.visible })),
    reset: () =>
        set(() => ({
            visible: false,
            boardModal: { visible: false, board: null },
            taskModal: { visible: false, task: null },
        })),
}));

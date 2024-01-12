export type Board = {
    id: string;
    title: string;
    tasks: Task[];
};

export type Task = {
    id: string;
    title: string;
    description: string;
    badges: Badge[];
};

export type Badge = {
    id: string;
    title: string;
    color: string;
};

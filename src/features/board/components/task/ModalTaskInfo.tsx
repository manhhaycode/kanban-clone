import { IDisclosure } from '@/common/types';
import Modal from '@/components/Modal';
import Input from '@/components/common/Input';
import { Badge, Board, Task } from '@/features/board';
import { useBoardStoreLocalStorage } from '@/stores/componentStore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';
import { TwitterPicker } from 'react-color';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';
const BadgeForm = ({
    badge,
    index,
    onClickDelete,
    setBadge,
}: {
    badge: Badge;
    index: number;
    onClickDelete?: () => void;
    setBadge: (badge: Badge) => void;
}) => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between w-full">
                <label className="font-semibold text-sm">Badge</label>
                {onClickDelete && (
                    <button type="button" onClick={onClickDelete} className="text-red-500 hover:text-red-600">
                        <BsTrash className="text-xl" />
                    </button>
                )}
            </div>
            <div className="flex gap-x-2 items-center">
                <Input
                    style={{
                        backgroundColor: badge.color,
                    }}
                    onBlur={(e) => {
                        setBadge({
                            ...badge,
                            title: e.target.value,
                        });
                    }}
                    className={twMerge('grow font-medium text-sm px-3', badge.color ? 'text-white' : 'text-black')}
                    defaultValue={badge.title}
                    name={`badge-title-${index}`}
                    placeholder="Title"
                />
                <TwitterPicker
                    onChange={(color) => {
                        setBadge({
                            ...badge,
                            color: color.hex,
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default function ModalTaskInfo({ task, board, state }: { task: Task | null; state: IDisclosure; board: Board }) {
    const { updateBoard } = useBoardStoreLocalStorage();
    const [badges, setBadges] = useState<Badge[]>(task ? task.badges : [{ id: uuid(), title: '', color: '' }]);

    useEffect(() => {
        if (state.isOpen) {
            setBadges(task ? task.badges : [{ id: uuid(), title: '', color: '' }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isOpen]);

    return (
        <Modal
            onTransitionEnd={() => {
                if (!state.isOpen) {
                    setBadges([{ id: uuid(), title: '', color: '' }]);
                }
            }}
            state={state}
        >
            <div className="flex flex-col gap-y-9 p-6">
                <h1 className="font-semibold text-lg">{task ? 'Edit task' : 'New task'}</h1>
                <div className="overflow-y-auto max-h-[calc(100vh-134px)] px-3 pb-9">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = new FormData(e.target as HTMLFormElement);

                            if (data.get('title')?.length === 0) {
                                toast.error('Title is required');
                                return;
                            }

                            const badgesTitleEmpty = badges.filter((badge) => badge.title.length === 0);
                            if (badgesTitleEmpty.length > 0) {
                                toast.error('Badges title is required');
                                return;
                            }

                            if (task) {
                                const newTasks = board.tasks.map((t) => {
                                    if (t.id === task?.id) {
                                        return {
                                            ...t,
                                            title: data.get('title') as string,
                                            badges,
                                        };
                                    }
                                    return t;
                                });
                                updateBoard({
                                    ...board,
                                    tasks: newTasks,
                                });
                            } else {
                                updateBoard({
                                    ...board,
                                    tasks: [
                                        ...board.tasks,
                                        {
                                            id: uuid(),
                                            title: data.get('title') as string,
                                            description: 'New task description',
                                            badges: badges,
                                        },
                                    ],
                                });
                            }

                            state.close();
                            toast.success('Task saved');
                        }}
                    >
                        <div className="flex flex-col gap-y-4">
                            <label className="font-semibold text-sm">Title</label>
                            <Input defaultValue={task?.title} name="title" placeholder="Title" />

                            <div className="flex flex-col gap-y-9 mt-9">
                                {badges.map((badge) => (
                                    <BadgeForm
                                        key={badge.id}
                                        badge={badge}
                                        index={badges.findIndex((b) => b.id === badge.id)}
                                        {...(badges.length > 1 && {
                                            onClickDelete: () => {
                                                setBadges(
                                                    badges.filter(
                                                        (_, i) => i !== badges.findIndex((b) => b.id === badge.id),
                                                    ),
                                                );
                                            },
                                        })}
                                        setBadge={(badge: Badge) => {
                                            setBadges(
                                                badges.map((b) => {
                                                    if (b.id === badge.id) {
                                                        return badge;
                                                    }
                                                    return b;
                                                }),
                                            );
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setBadges([...badges, { id: uuid(), title: '', color: '' }]);
                                }}
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Add badge
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600 transition-colors w-full mt-6"
                        >
                            {task ? 'Save' : 'Add'}
                        </button>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

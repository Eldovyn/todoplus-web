import React, { useState } from 'react';
import { alertFailed, alertSuccess } from './../Alert';
import { apiUpdateTitle } from '@/api/task';
import Cookies from 'js-cookie';
import LoadingSpinnerComponent from 'react-spinners-components';

interface Task {
    id: string;
    title: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    setListTask: React.Dispatch<React.SetStateAction<Task[]>>
    limit: number
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, id, setListTask, limit }) => {
    if (!isOpen) return null;

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);

    const [titleMessageError, setTitleMessageError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (isOpen && !loading) {
                const api_task = async () => {
                    let response = await apiUpdateTitle(Cookies.get('accessToken') as string, title, id, limit as number);
                    let resp = await response.json();
                    if (response.status !== 201) {
                        if (response.status === 400) {
                            setTitleError(true);
                            setTitleMessageError(resp.errors.new_title[0]);
                        }
                        alertFailed(resp.message);
                        setLoading(false);
                        return;
                    }
                    setListTask(resp.new_task);
                    setLoading(false);
                    onClose();
                    alertSuccess(resp.message);
                    return
                };
                api_task();
                return
            }
            return
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const api_task = async () => {
            let response = await apiUpdateTitle(Cookies.get('accessToken') as string, title, id, limit as number);
            let resp = await response.json();
            if (response.status !== 201) {
                if (response.status === 400) {
                    setTitleError(true);
                    setTitleMessageError(resp.errors.new_title[0]);
                }
                alertFailed(resp.message);
                setLoading(false);
                return;
            }
            setListTask(resp.new_task);
            setLoading(false);
            onClose();
            alertSuccess(resp.message);
            return
        };
        api_task();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <form className="bg-white rounded-lg shadow-lg w-1/3" onSubmit={loading ? () => { } : handleSubmit}>
                <div className="border-b p-4 flex justify-between items-center">
                    <h5 className="text-lg font-bold">Modal title</h5>
                    <button onClick={onClose} className="text-black">&times;</button>
                </div>
                <div className="p-4">
                    <input
                        type={"text"}
                        id="exampleInputPassword"
                        className={`mt-1 block w-full px-3 py-2 border ${titleError ? "focus:ring-red-500 focus:border-red-500 border-red-500" : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"} rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm text-black`}
                        placeholder="Title"
                        aria-describedby="passwordHelp"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    {titleError && <p className="text-red-500 text-xs text-start">{titleMessageError}</p>}
                </div>
                <div className="border-t p-4 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">Close</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" type='submit'>
                        {loading ? <LoadingSpinnerComponent type={'Spinner'} color={'white'} size={'20px'} /> : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
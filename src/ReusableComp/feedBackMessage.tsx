'use client'
import { clearMessage } from '@/store/Slices/feedBackSlice';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const FeedbackMessage = () => {
    const messages = useSelector((state: RootState) => state.feedBack.message);
    const hrefLocation = useSelector((state: RootState) => state.feedBack.hrefLocation);
    const dispatch = useDispatch();

    useEffect(() => {
        if (messages.length > 0) {
            const timer = setTimeout(() => {
                dispatch(clearMessage());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [messages, dispatch]);

    if (messages.length === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 space-y-2">
            {messages?.map((message, index) => (
                <div
                    key={index}
                    className="bg-mainColor text-secondColor px-4 py-2 rounded-lg shadow-lg flex items-center justify-between"
                >
                    <Link href={`/${hrefLocation}`} className="hover:underline">{message}</Link>
                    <button
                        onClick={() => dispatch(clearMessage())}
                        className="ml-4 text-white hover:text-gray-200"
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FeedbackMessage;
import React, { useState } from 'react';

const Modal = ({ title, closeModal, children }) => {

    return (
        <div className='border-2 w-[90vw] border-green-500 flex items-center justify-center bg-black opacity-25'>
            <section className="fixed top-[3rem] border-2 w-[65vw] h-[35rem] py-10 my-auto dark:bg-gray-900 z-50 overflow-scroll">
                <span className="text-5xl cursor-pointer absolute right-[1rem] top-[-0.2rem]" onClick={closeModal}>
                    &times;
                </span>
                <div className="mx-auto flex gap-4">
                    <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div className="flex flex-row items-center justify-between">
                            <h1
                                className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                                {title}
                            </h1>
                        </div>
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Modal;
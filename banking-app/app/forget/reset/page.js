'use client'
import React, { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../layout";
import Footer from "@/components/footer/Footer";
import { forget } from "@/lib/forget/resetPassword";
import { useRouter } from "next/navigation";

export default function Reset() {
    const { setPage } = useContext(RecoveryContext);
    const router = useRouter();

    const [username, setUsername] = useState();
    const [newPassword, setNewPassword] = useState();

    const getUsername = (e) => {
        setUsername(e.target.value);
    };

    const getNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const changePassword = async (e) => {
        const res = await forget(username, newPassword);
        router.push("forget/recoved/");
    };

    return (
        <div>
            <section className="bg-gray-50 w-screen dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                            <div className="mb-3">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Enter Your Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder=""
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={getUsername}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={getNewPassword}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-start">
                                    <input
                                        id="newsletter"
                                        aria-describedby="newsletter"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                    <label
                                        htmlFor="newsletter"
                                        className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                onClick={() => changePassword()}
                                className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                            >
                                Reset Password
                            </button>

                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

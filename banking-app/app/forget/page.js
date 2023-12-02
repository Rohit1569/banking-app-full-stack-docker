'use client'

import axios from "axios";
import React from "react";
import { useContext } from "react";
import { RecoveryContext } from "./layout";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";

export default function () {
    const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
    const router = useRouter()
    function nagigateToOtp() {
        if (email) {
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            setOTP(OTP);

            axios
                .post(" http://127.0.0.1:20200/api/v1/send_recovery_email", {
                    recipient_email: email,
                    OTP
                })
                .catch(console.log);
            router.push('forget/otp/')
            return;
        }
        return alert("Please enter your email");
    }
    return (
        <div>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form>
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address"
                                    />
                                </div>


                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label
                                            className="form-check-label inline-block text-gray-800"
                                            htmlFor="exampleCheck2"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <a
                                        href="#"
                                        onClick={() => nagigateToOtp()}
                                        className="text-gray-800"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="text-center lg:text-left">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
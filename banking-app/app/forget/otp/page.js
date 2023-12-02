'use client'
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { RecoveryContext } from "../layout";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";

export default function () {
    const { email, otp, setPage } = useContext(RecoveryContext);
    const [timerCount, setTimer] = React.useState(60);
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);
    const router = useRouter();

    function resendOTP() {
        if (disable) return;
        axios
            .post("http://localhost:5000/send_recovery_email", {
                OTP: otp,
                recipient_email: email,
            })
            .then(() => setDisable(true))
            .then(() => alert("A new OTP has successfully been sent to your email."))
            .then(() => setTimer(60))
            .catch(console.log);
    }

    function verifyOTP() {
        if (parseInt(OTPinput.join("")) === otp) {
            router.push('/forget/reset/');
            return;
        }
        alert("The code you have entered is not correct, try again or re-send the link.");
        return;
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); // Each count lasts for a second
        // Cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {email}</p>
                        </div>
                    </div>

                    <div style={{}}>
                        <form>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs space-x-4">
                                    {OTPinput.map((digit, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                maxLength="1"
                                                className="w-full h-full text-center border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                                                type="text"
                                                name=""
                                                id=""
                                                onChange={(e) =>
                                                    setOTPinput((prev) =>
                                                        prev.map((d, i) => (i === index ? e.target.value : d))
                                                    )
                                                }
                                            ></input>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <a
                                            onClick={() => verifyOTP()}
                                            className="flex flex-row cursor-pointer items-center justify-center text-center font-medium text-blue-500 hover:underline"
                                        >
                                            Verify Account
                                        </a>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive the code?</p>{" "}
                                        <a
                                            className={`flex flex-row items-center ${disable ? 'text-gray-400' : 'text-blue-500 cursor-pointer'} ${disable ? 'pointer-events-none' : ''} hover:underline`}
                                            onClick={() => resendOTP()}
                                        >
                                            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

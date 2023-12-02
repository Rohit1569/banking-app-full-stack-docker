import { Reset } from '@/lib/reset/resetPassword';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ValidationError from '../errors/ValidationError';
import { logout } from '@/lib/logout/logout';
import { Button, Modal } from 'react-bootstrap';

const NavbarAll = () => {
    const [set] = useState()
    const [show, setShow] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const handleClose = () => setShow(false);
    const [oldPassword, setOldPassword] = useState('');
    const [username, setUsername] = useState('')
    const router = useRouter()
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
    }, [])

    const handleShow = () => setShow(true);

    const handleResetPassword = async () => {
        try {
            if (oldPassword.length == 0) {
                throw new ValidationError("invalid password")

            }
            if (newPassword.length == 0) {
                throw new ValidationError("invalid password")

            }

            // let username = localStorage.getItem("username")
            const res = await Reset(username, oldPassword, newPassword)
            enqueueSnackbar(' updated Successfully', { variant: "success" })
            handleClose()
            return
            // if (res.data === "updated password") {
            //     enqueueSnackbar('password updated', { variant: "success" });
            //     handleClose();
            // }
        }
        catch (error) {

            console.log(error, "errrrrrrrrrrrrrrrrrrrrr");
        }

    }

    const handleLogout = async (e) => {
        e.preventDefault()
        let res = await logout()
        localStorage.clear()
        router.push(`/`)
    }

    const validateOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    const validateNewPassword = (e) => {
        setNewPassword(e.target.value);
    };



    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <span className="text-white">Hello, {username}</span>
            <button
                onClick={handleShow}
                className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none mr-3"
            >
                Reset Password
            </button>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded focus:outline-none"
            >
                Logout
            </button>

            {/* <div className={`modal ${show ? 'block' : 'hidden'}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Reset Password</h5>
                            <button type="button" className="close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="block text-gray-700 text-sm font-bold">Please enter old password</label>
                                    <input
                                        type="password"
                                        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        value={oldPassword}
                                        onChange={validateOldPassword}
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-700 text-sm font-bold">Please enter new password</label>
                                    <input
                                        type="password"
                                        className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastname"
                                        value={newPassword}
                                        onChange={validateNewPassword}
                                        placeholder=""
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Close
                            </button>
                            <button onClick={handleResetPassword} type="button" className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Please enter old password </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" ></label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" value={oldPassword} onChange={validateOldPassword} placeholder='' />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Please enter new password </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label" > </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="lastname" value={newPassword} onChange={validateNewPassword} placeholder='' />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleResetPassword} variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </nav>
    );
};

export default NavbarAll;

'use client'

import React, { useEffect, useState } from 'react'
import { GetAllUsers as allUsers } from '@/lib/admin/getAllUsers/getAllUsers';
import Table from '@/components/Table/Table';
import NavbarAll from '@/components/Navbar/Navbar';
import { deleteUser } from '@/lib/admin/delete/deleteUser';
import { UpdateUser } from '@/lib/admin/update/updateUser';
import Createuser from '@/lib/admin/create/component/CreateUser';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Form, Modal } from 'react-bootstrap'
import Loader from '@/components/loader/Loader';
import ValidationError from '@/components/errors/ValidationError';
import { authorize } from '@/lib/authicateUser/authorize';
import { useRouter } from 'next/navigation';




const GetAllUsers = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [id, setId] = useState()
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLogin, setIsLogin] = useState()
    const [updateTable, setUpdateTable] = useState(false)
    const [reset, setReset] = useState(false)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const getName = (e) => {
        setName(e.target.value)
    }
    const getAge = (e) => {
        setAge(e.target.value)
    }

    const getGender = (e) => {
        setGender(e.target.value)
    }

    const getUsername = (e) => {
        setUsername(e.target.value)
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }



    const handleLogin = async (e) => {
        // e.preventDefault()
        console.log("first")
        console.log();
        const params = {
            name,
            age,
            gender,
            id,
            email,
            limit: limit,
            page: page
        }
        console.log(params);
        const res = await allUsers(params)
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);
        console.log("res>>>>>>>>>>>>", res)
        console.log(res.data, "dddddddddddddddddddddddddds");
    }


    useEffect(() => {
        handleLogin()
    }, [updateTable])


    useEffect(() => {
        handleLogin()
    }, [limit, page])


    const handleUpdate = async (d) => {
        console.log("handleupdate")
        setName(d.name)
        setAge(d.age)
        setUsername(d.username)
        setGender(d.gender)
        setId(d.id)
        setShow((prev) => true)

    }
    const updataUserButton = async () => {
        try {
            setLoading(true);
            if (name.length == 0) {
                throw new ValidationError('invalid name', { variant: "error" })
                return
            }


            const res = await UpdateUser(name, age, gender, username, id)
            console.log(res)
            if (res.status == 200) {
                setUpdateTable((prev) => !prev)
                alert('User Updated Successfully')
            }
            handleClose()
        }
        catch {
            throw new ValidationError('User Not Updated', { variant: "error" })
        }
        finally {
            setLoading(false);
        }

    }

    const handleDelete = async (d) => {
        try {
            setLoading(true);
            const res = await deleteUser(d.id)
            if (res.status == 200) {
                setUpdateTable((prev) => !prev);
                throw new ValidationError('User Deleted Successfully')
            }
            console.log(res)
        }
        catch (error) {
            throw new ValidationError('Please try again', { variant: "error" })
        }
        finally {
            setLoading(false);
        }
    }

    const allBanks = async (d) => {

        router.push(`/allbank`)
    }


    const authicateUser = async () => {
        const res = await authorize()
        setIsLogin((prev) => res.data)
    }
    const handleFilterbtn = async () => {
        setPage((prev) => 1)
        handleLogin()

    }

    useEffect(() => {
        handleFilterbtn();
    }, [reset])

    const resetButton = () => {
        setName(prev => "")
        setUsername(prev => "")
        setGender(prev => "")
        setEmail(prev => "")
        setReset((prev) => !prev)
    }

    useEffect(() => { authicateUser() }, []);

    useEffect(() => {
        handleLogin()
    }, [])

    if (!isLogin) {
        return (
            <h1><a href='/'>please login</a></h1>
        )
    }

    return (
        <>
            {loading && <Loader />}
            <NavbarAll />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Enter Your Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="name" className="form-control" id="name" placeholder='' value={name} onChange={getName} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Age </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="age" placeholder='' value={age} onChange={getAge} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Gender </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="gender" className="form-control" id="gender" placeholder='' value={gender} onChange={getGender} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label>Enter Your Username </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"> </label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="username" placeholder='' value={username} onChange={getUsername} />
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updataUserButton}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* <Createuser handleLogin={handleLogin} /> */}
            <Createuser handleLogin={handleLogin} />

            <Form>

                <input type="text" placeholder=' name' style={{ margin: 15 }} onChange={getName} />
                <input type="text" placeholder='username' style={{ margin: 15 }} onChange={getUsername} />
                <input type="text" placeholder='gender' style={{ margin: 15 }} onChange={getGender} />
                <input type="text" placeholder='email' style={{ margin: 15 }} onChange={getEmail} />
                <select name="" id="admin" style={{ margin: 15 }}>
                    <option value="1">user</option>
                    <option value="2">admin</option>
                </select>
                <Button onClick={handleFilterbtn} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Submit</Button>
                <Button onClick={resetButton} style={{ color: 'blueviolet', backgroundColor: 'red', margin: 15 }} >Reset</Button>

            </Form>


            <label htmlFor="count">{count}</label>
            <Button style={{
                float: 'right',
                width: 100,
                padding: 8,
            }} onClick={allBanks}>Bank</Button>
            {/* <Button onClick={handleLogin} >get</Button> */}
            <Table data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} updateUser={true} deleteUser={true} updateFunction={handleUpdate} deleteFunction={handleDelete} />

        </>
    )


}

export default GetAllUsers
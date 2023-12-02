'use client'

import React, { useEffect, useState } from 'react'
import { GetAllBanks as allBanks } from '@/lib/bank/getAllBanks/GetAllBanks';
import Button from 'react-bootstrap/Button';
import { Form, Modal } from 'react-bootstrap'
import { UpdateBank } from '@/lib/bank/update/UpdateBank';
import { useRouter } from 'next/navigation';
import Table from '@/components/Table/Table';
import Footer from '@/components/footer/Footer';
import NavbarAll from '@/components/Navbar/Navbar';
import CreateBank from '@/lib/bank/create/controller/createBank';


const GetAllBanks = () => {
    const [bankName, setBankName] = useState()
    const [id, setId] = useState()
    const [abrivation, setAbrivation] = useState()
    const [bankTotal, setBankTotal] = useState()
    const [data, setData] = useState([])
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateTable, setUpdateTable] = useState(false)
    const [reset, setReset] = useState(false)
    const router = useRouter()

    const getBankName = (e) => {
        setBankName(e.target.value)
    }

    const handleBank = async (e) => {
        const params = {
            id,
            bankName,
            abrivation,
            bankTotal,
            limit: limit,
            page: page
        }
        const res = await allBanks(params)
        console.log(res, "rrrrrrrrrrr");
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);

    }

    useEffect(() => {
        handleBank()
    }, [limit, page])


    const handleUpdate = async (d) => {
        console.log("handleupdate")
        setBankName(d.bankName)
        setAbrivation(d.abrivation)
        setId(d.id)
        setShow((prev) => true)

    }
    const updataBankButton = async () => {
        try {
            if (bankName.length == 0) {
                enqueueSnackbar('invalid Bankname', { variant: "error" })
                return
            }


            const res = await UpdateBank(bankName, id)
            console.log(res)
            if (res.status == 200) {
                setUpdateTable((prev) => !prev)
                enqueueSnackbar(' Updated Successfully', { variant: "success" })
            }
            handleClose()
        }
        catch {
            enqueueSnackbar('Not Updated', { variant: "error" })
        }

    }

    // const handleDelete = async (d) => {
    //     try {
    //         const res = await deleteBank(d.id)
    //         if (res.status == 200) {
    //             setUpdateTable((prev) => !prev);
    //             enqueueSnackbar('User Deleted Successfully', { variant: "success" })
    //         }
    //         console.log(res)
    //     }
    //     catch (error) {
    //         enqueueSnackbar('Please try again', { variant: "error" })
    //     }
    // }
    const handleFilterbtn = async () => {
        setPage((prev) => 1)
        handleBank()

    }

    useEffect(() => {
        handleFilterbtn();
    }, [reset])

    const resetButton = () => {
        setBankName(prev => "")
        setReset((prev) => !prev)
    }

    const AllUsers = () => {
        router.push("/admin")
    }

    return (
        <>
            <NavbarAll />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Enter Bank Name </label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="name" placeholder='' onChange={getBankName} />
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updataBankButton}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <CreateBank handleBank={handleBank} />

            <Form>

                <input type="text" placeholder=' BankName' style={{ margin: 15 }} onChange={getBankName} />
                <button onClick={handleFilterbtn} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Submit</button>
                <button onClick={resetButton} style={{ color: 'blueviolet', backgroundColor: 'red', margin: 15 }} >Reset</button>

            </Form> <button onClick={AllUsers} style={{
                float: 'right',
                width: 100,
                backgroundColor: 'green',
                padding: 8,
            }}>Users</button>

            <label htmlFor="count">{count}</label>
            <Table data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} updateUser={true} updateFunction={handleUpdate} />
            <Footer />
        </>
    )
}

export default GetAllBanks
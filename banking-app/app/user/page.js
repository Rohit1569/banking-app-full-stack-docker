
'use client'

import React, { useEffect, useState, useRef } from 'react'
import { GetAllAccount as AllAccounts } from '@/lib/user/getall/getAllAccounts'
import { Form, Modal } from 'react-bootstrap'
import { Button } from '@mui/material'
// import { GetAllBanks as allBanks } from '../services/getAllBanks'
import { DepositAmount } from '@/lib/user/deposit/depositAmount'
import ValidationError from '@/components/errors/ValidationError'
import { WithdrawAmount } from '@/lib/user/withdraw/withdrawAmount'
import CreateAccount from '@/lib/user/create/component/CreateAccount'
import NavbarAll from '@/components/Navbar/Navbar'
import Table from '@/components/Table/Table';
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loader from '@/components/loader/Loader'
const GetAllAccounts = () => {
    const tableRef = useRef(null);
    const [data, setData] = useState([])
    const [id, setId] = useState()
    const [accountId, setAccountId] = useState()
    const [bankName, setBankName] = useState()
    const [accoutBalance, setAccountBalance] = useState()
    const [amount, setAmount] = useState()
    const [bankId, setBankId] = useState()
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(4)
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateTable, setUpdateTable] = useState(false)
    const [reset, setReset] = useState(false)
    const [selectedBank, setSelectedBank] = useState('');
    const [abrivation, setAbrivation] = useState()
    const [bankTotal, setBankTotal] = useState()
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const getBankName = (e) => {
        setBankName(e.target.value)
    }

    const handleGetAccount = async () => {
        let userId = localStorage.getItem('id')
        const params = {
            id,
            bankName,
            accoutBalance,
            userId,
            bankId,
            limit: limit,
            page: page
        }
        const res = await AllAccounts(userId, params)
        console.log(res, "rrrrrrrrrrr");
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);

    }



    const handleFilterbtn = async (e) => {
        // e.preventDefault()
        setPage((prev) => 1)
        handleGetAccount()

    }

    useEffect(() => {
        handleFilterbtn();
    }, [reset])


    useEffect(() => {
        handleFilterbtn();
    }, [updateTable])

    const resetButton = () => {
        setBankName(prev => "")
        setReset((prev) => !prev)
    }



    useEffect(() => {
        handleGetAccount()
    }, [limit, page])

    const AllBanks = () => {
        // navigate('/allUserBanks/')
    }

    const getAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleDeposit = (d) => {
        setAccountId(d.id)
        setShow((prev) => true)
    }

    const handleWithdraw = (d) => {
        setShow((prev) => true)
    }

    const updateDeposit = async (d) => {
        try {
            setLoading(true);
            if (amount === "") {
                throw new ValidationError("please enter valid amount")
            }
            let id = localStorage.getItem('id')
            const res = await DepositAmount(id, accountId, amount)
            setUpdateTable((prev) => !prev)
            alert("Success", { variant: "success" })
            handleClose()
        }
        catch (error) {
            // enqueueSnackbar("please enter valid amount", { variant: "error" })
            new ValidationError("please enter valid amount")
        }
        finally {
            setLoading(false);
        }
    }

    const updateWithdraw = async (d) => {
        try {
            setLoading(true);
            if (amount === "") {
                throw new ValidationError("please enter valid amount")
            }
            let id = localStorage.getItem('id')
            const res = await WithdrawAmount(id, accountId, amount)
            setUpdateTable((prev) => !prev)
            alert("Success", { variant: "success" })
            handleClose()
        }
        catch (error) {
            new ValidationError("please enter valid amount")
        }
        finally {
            setLoading(false);
        }

    }

    const handleTransfer = (d) => {
        setAccountId(d.id)
        console.log(d.id, "d.id");
        router.push(`/user/${d.id}`)
        // <Link href={`/user/${post.slug}`}>{post.title}</Link>

    }

    const handlePassbook = (d) => {
        setAccountId(d.id)
        router.push(`/passbook/${d.id}`)
    }





    const handleBank = async () => {
        const params = {
            id,
            bankName,
            abrivation,
            bankTotal,
            limit,
            page,
        };
        const res = await allBanks(params);
        console.log(res, "rrrrrrrrrrr");
        setCount((prev) => res?.headers["x-total-count"]);
        // Use the data from the API response to populate your data state
        data.push(...res.data);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('your-api-endpoint-here');
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    console.error('Failed to fetch bank data');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);



    // return (
    //     <>
    //         <NavbarAll />

    //         <Modal show={show} onHide={handleClose}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Action</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 <form>
    //                     <div className="row mb-3">
    //                         <label>Please enter the amount </label>
    //                         <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
    //                         <div className="col-sm-10">
    //                             <input type="username" className="form-control" id="amount" placeholder='' onChange={getAmount} />
    //                         </div>
    //                     </div>

    //                 </form>
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={handleClose}>
    //                     Close
    //                 </Button>
    //                 <Button variant="primary" onClick={updateDeposit}>
    //                     Deposit
    //                 </Button>
    //                 <Button variant="primary" onClick={updateWithdraw}>
    //                     Withdraw
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>






    //         <CreateAccount handleGetAccount={handleGetAccount} />
    //         <label htmlFor="count">{count}</label>

    //         <Button onClick={AllBanks} style={{
    //             float: 'right',
    //             width: 100,
    //             backgroundColor: 'green',
    //             padding: 8,
    //         }}>Bank List</Button>


    //         <div>
    //             <label htmlFor="bank-dropdown">Select a Bank:</label>
    //             <select
    //                 id="bank-dropdown"
    //                 value={selectedBank}
    //                 onChange={(e) => setSelectedBank(e.target.value)}
    //             >
    //                 <option value="">Select a bank</option>
    //                 {data.map((data) => (
    //                     <option key={data.id} value={data.bankName}>
    //                         {data.bankName}
    //                         {' '}
    //                         {data.id}
    //                     </option>

    //                 ))}
    //             </select>
    //         </div>

    //         <Form>

    //             <input type="text" placeholder=' BankName' style={{ margin: 15 }} onChange={getBankName} />
    //             <Button onClick={handleFilterbtn} style={{ color: 'blueviolet', backgroundColor: 'red' }} >Submit</Button>
    //             <Button onClick={resetButton} style={{ color: 'blueviolet', backgroundColor: 'red', margin: 15 }} >Reset</Button>

    //         </Form>

    //         <Table data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} depositAmount={true} withdrawAmount={true} transferAmount={true} transferFunction={handleTransfer} depositFunction={handleDeposit} withdrawFunction={handleWithdraw} passBook={true} passbookFunction={handlePassbook} />
    //         <Footer />
    //     </>

    // )

    return (
        <div className="container">
            {loading && <Loader />}
            <NavbarAll />

            <CreateAccount />

            {/* Filter Section */}
            {/* <div className="filter-section">
                <div className="dropdown">
                    <label htmlFor="bank-dropdown">Select a Bank:</label>
                    <select
                        id="bank-dropdown"
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                    >
                        <option value="">Select a bank</option>
                        {data.map((item) => (
                            <option key={item.id} value={item.bankName}>
                                {item.bankName} ({item.bankId})
                            </option>
                        ))}
                    </select>
                </div>

                <form>
                    <div className="filter-input">
                        <input
                            type="text"
                            placeholder="Bank Name"

                            className="input-field"
                        />
                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                handleFilterbtn()
                            }}
                            className="filter-Button primary-Button"
                        >
                            Filter
                        </Button>
                        <Button
                            onClick={resetButton}
                            className="filter-Button secondary-Button"
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </div> */}
            {/* Data Table */}
            <div className='box'>
                <div>
                    <Table
                        tableRef={tableRef}
                        data={data}
                        count={count}
                        limit={limit}
                        setPage={setPage}
                        page={page}
                        setLimit={setLimit}
                        depositAmount={true}
                        withdrawAmount={true}
                        transferAmount={true}
                        transferFunction={handleTransfer}
                        depositFunction={handleDeposit}
                        withdrawFunction={handleWithdraw}
                        passBook={true}
                        passbookFunction={handlePassbook}

                    />
                </div>
            </div>

            <Footer />
            {/* Bank List Button */}
            {/* <Button onClick={AllBanks} className="bank-list-Button">
                Bank List
            </Button> */}

            {/* Deposit/Withdraw Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row mb-3">
                            <label>Please enter the amount</label>
                            <label for="amount" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input
                                    type="username"
                                    className="form-control"
                                    id="amount"
                                    placeholder=""
                                    onChange={getAmount}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={updateDeposit}
                        className="primary-Button"
                    >
                        Deposit
                    </Button>
                    <Button
                        variant="primary"
                        onClick={updateWithdraw}
                        className="primary-Button"
                    >
                        Withdraw
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default GetAllAccounts
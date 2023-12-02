'use client'
import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Table from '@/components/Table/Table';
import { Form } from 'react-bootstrap';
import { passBook } from '@/lib/user/passbook/passbook';
import { useRouter } from 'next/navigation';
import NavbarAll from '@/components/Navbar/Navbar';
import Footer from '@/components/footer/Footer';

const Passbook = ({ params }) => {
    const accountId = params.accountId;
    const tableRef = useRef(null);
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [senderAccountId, setSenderAccountId] = useState();
    const [receiverAccountId, setreceiverAccountId] = useState();
    const [amount, setAmount] = useState();
    const [currentBalance, setCurrentBalance] = useState();
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);
    const [type, setType] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [bankName, setBankName] = useState();
    const [accoutBalance, setAccountBalance] = useState();
    const [bankId, setBankId] = useState();
    const [selectedBank, setSelectedBank] = useState('');
    const router = useRouter();

    const getType = (e) => {
        setType(e.target.value);
    };

    const getFromDate = (date) => {
        setFromDate(date);
    };

    const getToDate = (date) => {
        setToDate(date);
    };

    const handlePassbook = async (e) => {
        const params = {
            id,
            senderAccountId,
            receiverAccountId,
            amount,
            currentBalance,
            type,
            accountId,
            limit: limit,
            page: page,
            fromDate,
            toDate,
        };
        const res = await passBook(localStorage.getItem("id"), accountId, params);
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);
    };

    useEffect(() => {
        handlePassbook();
    }, [limit, page]);

    const AllAccounts = () => {
        router.push('/user');
    };

    const handleFilterbtn = async () => {
        setPage((prev) => 1);
        handlePassbook();
    };

    const handleGetAccount = async (e) => {
        let userId = localStorage.getItem('id');
        const params = {
            id,
            bankName,
            accoutBalance,
            userId,
            bankId,
            limit: limit,
            page: page,
        };
        const res = await AllAccount(userId, params);
        setCount((prev) => res?.headers["x-total-count"]);
        setData((prev) => res.data);
    };

    return (
        <>
            <NavbarAll />
            <button
                onClick={AllAccounts}
                className="float-right w-20 bg-green-500 text-white py-2 px-4 rounded-full" // Tailwind CSS classes for the button
            >
                Accounts
            </button>

            <label htmlFor="count" className="block text-gray-600 text-lg">
                {count}
            </label>
            <div className="mb-4">
                <label htmlFor="bank-dropdown" className="block text-gray-600 text-lg">
                    Select an Account:
                </label>
                <select
                    id="bank-dropdown"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-64 rounded-md border py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    <option value="">Select an account</option>
                    {data.map((item) => (
                        <option key={item.id} value={item.accountId}>
                            ({item.id})
                        </option>
                    ))}
                </select>
            </div>
            <Form className="m-4">
                <input
                    type="text"
                    placeholder="Type"
                    onChange={getType}
                    className="w-64 rounded-md border py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <label htmlFor="custom-date-input" className="block text-gray-600 text-lg">
                    From Date
                </label>
                <DatePicker
                    id="custom-date-input"
                    selected={fromDate}
                    onChange={getFromDate}
                    placeholderText="yyyy-mm-dd"
                    dateFormat="yyyy-MM-dd"
                    className="w-64 rounded-md border py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <label htmlFor="custom-date-input" className="block text-gray-600 text-lg">
                    To Date
                </label>
                <DatePicker
                    id="custom-date-input"
                    selected={toDate}
                    onChange={getToDate}
                    placeholderText="yyyy-mm-dd"
                    dateFormat="yyyy-MM-dd"
                    className="w-64 rounded-md border py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <button
                    onClick={handleFilterbtn}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                >
                    Submit
                </button>
                <button
                    style={{ color: 'blueviolet', backgroundColor: 'red' }}
                    className="m-4 bg-red-500 text-white py-2 px-4 rounded-full"
                >
                    Reset
                </button>
            </Form>

            <Table tableRef={tableRef} data={data} count={count} limit={limit} setPage={setPage} page={page} setLimit={setLimit} />

            <Footer />
        </>
    );
};

export default Passbook;

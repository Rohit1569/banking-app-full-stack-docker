'use client'

// import React, { useState } from 'react'

// import { Button, Form } from 'react-bootstrap'
// import { TransferAmount as Transfer } from '@/lib/user/transfer/transferAmount'
// import ValidationError from '@/components/errors/ValidationError'
// import NavbarAll from '@/components/Navbar/Navbar'
// import Footer from '@/components/footer/Footer'


// const TransferAmount = ({ params }) => {
//     const [accountId, setAccountId] = useState()
//     const [amount, setAmount] = useState()
//     const accountid = params.accountId
//     const [receiverAccountId, setReceiverAccountId] = useState()
//     const [id, setId] = useState()


//     const getAmount = (e) => {
//         setAmount(e.target.value)
//     }

//     const getAccountId = (e) => {
//         setReceiverAccountId(e.target.value)
//     }

//     const handleTransfer = async (d) => {
//         try {
//             if (amount === "") {
//                 throw new ValidationError("Please Enter Amount")
//             }
//             let id = localStorage.getItem("id")
//             const res = await Transfer(id, accountid, receiverAccountId, amount)
//             enqueueSnackbar("money transferred successfully", { variant: "success" })
//         }
//         catch (error) {
//             new ValidationError("Please Enter Amount")
//         }
//     }

//     const AllAccounts = () => {
//         // navigate(`/allAccounts/:userId`)
//     }

//     return (
//         <>
//             <NavbarAll />
//             <h1>Transfer amount</h1>
//             <Form>
//                 <div className="row mb-3">
//                     <label>Please enter the account number </label>
//                     <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
//                     <div className="col-sm-10">
//                         <input type="username" className="form-control" id="amountId" placeholder='' onChange={getAccountId} />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <label>Please enter the amount </label>
//                     <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
//                     <div className="col-sm-10">
//                         <input type="username" className="form-control" id="amount" placeholder='' onChange={getAmount} />
//                     </div>
//                 </div>
//                 <Button onClick={handleTransfer}>Transfer</Button>
//                 <button onClick={AllAccounts} style={{
//                     float: 'right',
//                     width: 100,
//                     backgroundColor: 'green',
//                     padding: 8,
//                 }}>Accounts</button>
//             </Form>
//             <Footer />
//         </>
//     )
// }

// export default TransferAmount








import React, { useState } from 'react';
import { TransferAmount as Transfer } from '@/lib/user/transfer/transferAmount';
import ValidationError from '@/components/errors/ValidationError';
import NavbarAll from '@/components/Navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';

const TransferAmount = ({ params }) => {
    const [accountId, setAccountId] = useState();
    const [amount, setAmount] = useState();
    const accountid = params.accountId;
    const [receiverAccountId, setReceiverAccountId] = useState();
    const router = useRouter()
    const [id, setId] = useState();

    const getAmount = (e) => {
        setAmount(e.target.value);
    };

    const getAccountId = (e) => {
        setReceiverAccountId(e.target.value);
    };

    const handleTransfer = async (d) => {
        try {
            if (amount === "") {
                throw new ValidationError("Please Enter Amount");
            }
            let id = localStorage.getItem("id");
            const res = await Transfer(id, accountid, receiverAccountId, amount);
            enqueueSnackbar("money transferred successfully", { variant: "success" });
        } catch (error) {
            new ValidationError("Please Enter Amount");
        }
    };

    const AllAccounts = () => {
        // navigate(`/allAccounts/:userId`);
        router.push('/user')
        console.log('hello world');

    };

    return (
        <>
            <NavbarAll />
            <h1 className="text-2xl font-bold mb-4">Transfer Amount</h1>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Please enter the account number</label>
                    <input
                        type="username"
                        className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:ring-indigo-300"
                        onChange={getAccountId}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Please enter the amount</label>
                    <input
                        type="username"
                        className="w-full border rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:ring-indigo-300"
                        onChange={getAmount}
                    />
                </div>
                <button onClick={handleTransfer} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">Transfer</button>
                <button onClick={AllAccounts} className="float-right w-20 bg-green-500 text-white py-2 px-4 rounded-full" style={{ padding: 8 }}>Accounts</button>
            </form>
            <Footer />
        </>
    );
};

export default TransferAmount;

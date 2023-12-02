import { GetAllBanks } from '@/lib/bank/getAllBanks/GetAllBanks';
import React, { useEffect, useState } from 'react';
import { CreateAccount as create } from '../service/createAccount';
import ValidationError from '@/components/errors/ValidationError';
import DropdownBank from '@/components/bankdropdown/DropDownBank';

const CreateAccount = ({ handleAccount }) => {
    const [bankName, setBankName] = useState('');
    const [balance, setBalance] = useState('');
    const [bankId, setBankId] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        handleBankSubmit();
    }, []);

    const handleBankSubmit = async () => {
        const params = {};
        const response = await GetAllBanks(params);
        setData((prev) => response.data);
    };

    const getBalance = (e) => {
        setBalance(e.target.value);
    };

    const handleCreateAccount = async (e) => {
        // e.preventDefault();
        try {
            if (bankId === '') {
                throw new Error('Please enter bank ID');
            }
            let id = localStorage.getItem('id');
            const res = await create(id, bankId);
            alert('Account created');
            console.log('Account created successfully.');
        } catch (error) {
            new ValidationError(error);
        }
    };

    const dropDownFunction = async (value) => {
        setSelectedValue(value);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <form>
                <DropdownBank data={data} onSelect={dropDownFunction} />

                <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
                    onClick={handleCreateAccount}
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default CreateAccount;

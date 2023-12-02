'use client'
import React, { useState } from 'react';

const DropdownBank = ({ data, onSelect }) => {
    const [selectedName, setSelectedName] = useState('');

    const handleSelectChange = (event) => {
        if (event && event.target) {
            const selectedValue = event.target.value;
            setSelectedName(selectedValue);


            onSelect(selectedValue);
        } else {
            console.error('Invalid event object:', event);
        }
    };

    return (
        <div>


            <label htmlFor="idDropdown">Select Bank Id:</label>
            <select id="idDropdown" onChange={handleSelectChange} value={selectedName}>
                <option value="">Select Bank Id:</option>
                {data.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.id}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownBank;
import React, { useState } from 'react';

const DropdownAcc = ({ data, onSelect }) => {
    const [selectedId, setSelectedId] = useState('');

    const handleSelectChange = (event) => {
        if (event && event.target) {
            const selectedValue = event.target.value;
            setSelectedId(selectedValue);

            // Call the callback function to pass the selected value to the parent component
            onSelect(selectedValue);
        } else {
            console.error('Invalid event object:', event);
        }
    };

    return (
        <div>

            <select id="idDropdown" onChange={handleSelectChange} value={selectedId}>
                <option value="">Select an ID</option>
                {data.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.id}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownAcc;
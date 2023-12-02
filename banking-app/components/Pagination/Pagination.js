import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginations = ({ count, limit, setPage, page, setLimit }) => {
    const handleChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(count / limit)}
                    page={page}
                    onChange={handleChange}
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default Paginations;

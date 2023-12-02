import React, { useRef } from 'react';
import Paginations from '../Pagination/Pagination';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel, Input } from '@mui/material';
import { Update, Delete, Visibility, MonetizationOn, GetApp, SettingsEthernet } from '@mui/icons-material';

const TableComponent = ({
    tableRef,
    data,
    count,
    limit,
    setPage,
    page,
    setLimit,
    updateUser,
    deleteUser,
    updateFunction,
    deleteFunction,
    infoFunction,
    viewButton,
    setShow,
    depositAmount,
    withdrawAmount,
    transferAmount,
    depositFunction,
    withdrawFunction,
    transferFunction,
    passBook,
    passbookFunction,
}) => {
    let headerOfUserTable, rowsOfUserTable, filterHeaders;

    if (data.length > 0) {
        let key = Object.keys(data[0]);
        filterHeaders = Object.keys(data[0]).map((k) => {
            return (
                <div key={k} className="flex items-center mb-2">
                    <label className="text-blue-500 font-bold mx-5">{k}</label>
                    {k === "isAdmin" ? (
                        <FormControl className="w-1/4">
                            <InputLabel>Role</InputLabel>
                            <Select
                                label="Role"
                            >
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="User">User</MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <Input className="text-blue-500 font-bold p-1 w-1/4 rounded" />
                    )}
                </div>
            );
        });

        headerOfUserTable = Object.keys(data[0]).map((k) => {
            return <TableCell key={k}>{k}</TableCell>;
        });

        rowsOfUserTable = data.map((d) => {
            let singleRow = [];

            for (let i = 0; i < key.length; i++) {
                if (d[key[i]] === true) {
                    singleRow.push(<TableCell key={i}>true</TableCell>);
                } else if (d[key[i]] === false) {
                    singleRow.push(<TableCell key={i}>false</TableCell>);
                } else {
                    singleRow.push(<TableCell key={i}>{d[key[i]]}</TableCell>);
                }
            }

            if (updateUser === true) {
                singleRow.push(
                    <TableCell key="update">
                        <Button
                            variant="contained"
                            onClick={() => updateFunction(d)}
                            style={{ backgroundColor: '#3c8dbc' }}
                            startIcon={<Update />}
                        >
                            Update
                        </Button>
                    </TableCell>
                );
            }
            if (deleteUser === true) {
                singleRow.push(
                    <TableCell key="delete">
                        <Button
                            variant="contained"
                            onClick={() => deleteFunction(d)}
                            style={{ backgroundColor: 'red' }}
                            startIcon={<Delete />}
                        >
                            Delete
                        </Button>
                    </TableCell>
                );
            }
            if (viewButton === true) {
                singleRow.push(
                    <TableCell key="view">
                        <Button
                            variant="contained"
                            onClick={() => infoFunction(d)}
                            startIcon={<Visibility />}
                        >
                            View
                        </Button>
                    </TableCell>
                );
            }
            if (depositAmount === true) {
                singleRow.push(
                    <TableCell key="deposit">
                        <Button
                            variant="contained"
                            onClick={() => depositFunction(d)}
                            startIcon={<MonetizationOn />}
                        >
                            Deposit
                        </Button>
                    </TableCell>
                );
            }
            if (withdrawAmount === true) {
                singleRow.push(
                    <TableCell key="withdraw">
                        <Button
                            variant="contained"
                            onClick={() => withdrawFunction(d)}
                            startIcon={<MonetizationOn />}
                        >
                            Withdraw
                        </Button>
                    </TableCell>
                );
            }
            if (transferAmount === true) {
                singleRow.push(
                    <TableCell key="transfer">
                        <Button
                            variant="contained"
                            onClick={() => transferFunction(d)}
                            startIcon={<SettingsEthernet />}
                        >
                            Transfer
                        </Button>
                    </TableCell>
                );
            }
            if (passBook === true) {
                singleRow.push(
                    <TableCell key="passbook">
                        <Button
                            variant="contained"
                            onClick={() => passbookFunction(d)}
                            startIcon={<GetApp />}
                        >
                            Passbook
                        </Button>
                    </TableCell>
                );
            }

            return (
                <TableRow key={d.id}>
                    {singleRow}
                </TableRow>
            );
        });
    }

    return (
        <div className="part">
            <div className="main">
                <div className="flex justify-between mb-4">
                    <Paginations count={count} limit={limit} setPage={setPage} page={page} />
                    <FormControl className="w-1/4">
                        <InputLabel>Rows per page</InputLabel>
                        <Select
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <TableContainer component={Paper}>{
                    tableRef && <DownloadTableExcel filename="table" sheet="table" currentTableRef={tableRef.current}>
                        <Button
                            variant="contained"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            startIcon={<GetApp />}
                        >
                            Download
                        </Button>
                    </DownloadTableExcel>}

                    <Table size="small" ref={tableRef}>
                        <TableHead>
                            <TableRow>{headerOfUserTable}</TableRow>
                        </TableHead>
                        <TableBody>{rowsOfUserTable}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default TableComponent;

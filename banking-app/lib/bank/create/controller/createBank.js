import React, { useState } from 'react'
import { CreateBank as Bank } from '../service/CreateBank'
import ValidationError from '@/components/errors/ValidationError'
const CreateBank = ({ handleBank }) => {
    const [bankName, setBankName] = useState()
    const [abrivation, setAbrivation] = useState()

    const handleCreateBank = async (e) => {
        if (bankName === "") {
            throw new ValidationError("Please enter bank name")
        }
        const res = await Bank(bankName)
        alert('Bank Created', { variant: "success" })
    }

    const getBankName = (e) => {
        setBankName(e.target.value)
    }

    return (
        <>
            <div className="card mx-auto mt-1" style={{ width: "20rem" }}>
                <div className="card-body">
                    <form>
                        <div className="row mb-3">
                            <label>Enter The Bank Name</label>
                            <label for="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <input type="username" className="form-control" id="name" placeholder='' onChange={getBankName} />
                            </div>
                        </div>




                        <button type="button" className="btn btn-primary" onClick={handleCreateBank} >CreateBank</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBank
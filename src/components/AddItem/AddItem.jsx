import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



export default function AddItemToMasterList() {
    const dispatch = useDispatch();
    const { id } = useParams()

    // dispatch - should be doable in sql?
    // need to create new object, then immediately pull it's ID
    // then need to add to object_type and object_suppliers table
    // or do an INSERT into multiple tables simultaneously? Is it smart enough to hack that?


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [partName, setPartName] = useState('')
    const [partNumber, setPartNumber] = useState('')
    const [partDescription, setPartDescription] = useState('')
    const [objectTypeID, setObjectTypeID] = useState(1)
    const [mttfMonths, setmttfMonths] = useState(0)
    const [leadTimeWeeks, setLeadTimeWeeks] = useState(0)
    const [supplierID, setSupplierID] = useState(1)

    let suppliers = useSelector(store => store.suppliers)
    let itemTypes = useSelector(store => store.itemTypes)

    useEffect(() => {
        dispatch({ type: 'FETCH_SUPPLIERS' })
        dispatch({ type: 'FETCH_ITEM_TYPES' })
    }, []);

    const handleAddItemToMaster = () => {
        // console.log(`In handleadditemtomaster`);

        let addItemDetail = { partName, partNumber, partDescription, objectTypeID, mttfMonths, leadTimeWeeks, supplierID }
        // console.log(`details of item to be added to my_object_table:`, addItemDetail);

        dispatch({ type: "ADD_ITEM_TO_ALL_ITEMS", payload: addItemDetail })
        // write saga
        // write route

    }


    const handleSupplier = (e) => {
        setSupplierID(e.target.value)
    }
    const handleItemTypeChange = (e) => {
        setObjectTypeID(e.target.value)
    }

    return (
        <div>
            <Button onClick={handleOpen}>Add Item To Master List</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Item To Master List
                    </Typography>
                    <form onSubmit={handleAddItemToMaster}>
                        <div>
                            Part Name
                            <input placeholder='Part Name' value={partName} onChange={(e) => setPartName(e.target.value)} />
                        </div>
                        <div>
                            Part Number
                            <input placeholder='Part Number' value={partNumber} onChange={(e) => setPartNumber(e.target.value)} />
                        </div>
                        <div>
                            Part Description
                            <input placeholder='Part Description' value={partDescription} onChange={(e) => setPartDescription(e.target.value)} />
                        </div>
                        <label htmlFor='itemType'>Item Type</label>
                        <select name='itemType' defaultValue={objectTypeID} onChange={handleItemTypeChange}>
                            {itemTypes.map(type => {
                                return (
                                        <option key={type.id} value={type.id}>{type.object_type}</option>
                                )
                            })}
                        </select>

                        <div>
                            Part Lead Time - Weeks
                            <input placeholder='Lead Time in weeks' value={leadTimeWeeks} onChange={(e) => setLeadTimeWeeks(e.target.value)} />
                        </div>
                        <div>
                            Mean Time To Failure - Months
                            <input placeholder='MTTF in Months' value={mttfMonths} onChange={(e) => setmttfMonths(e.target.value)} />
                        </div>

                        <label htmlFor='suppliers'>Supplier</label>
                        <select name='suppliers' defaultValue={supplierID} onChange={handleSupplier}>
                            {suppliers.map(supplier => {
                                return (
                                    <option key={supplier.id} value={supplier.id}>{supplier.supplier_name}</option>
                                )
                            })}
                        </select>

                        <br /><br />
                        <button type='submit'>Submit</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

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

export default function EditStockItem() {
  const stockDetail = useSelector(store => store.stockItemDetails[0])
  console.log(`StockDetail:`, stockDetail);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch({ type: 'GET_STOCK_ITEM_DETAILS', payload: stockDetail.mot_id})
  }
  const handleClose = () => setOpen(false);

  // state - default should be relevant stockItemDetails
  const [qtyInField, setQtyInField] = useState(stockDetail.quantity_in_field)
  const [qtyOwned, setQtyOwned] = useState(stockDetail.quantity_owned)
  const [stockOverrideQty, setStockOverrideQty] = useState(stockDetail.stock_override_qty)

  const submitEdits = () => {
    // set up defaults.
    let updatedItemData = { qtyInField, qtyOwned, stockOverrideQty, mot_id: stockDetail.mot_id }
    dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
    setOpen(false)
    dispatch({ type: 'GET_STOCK_ITEM_DETAILS', payload: stockDetail.mot_id})
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Item
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <form onSubmit={submitEdits}>
            <div>Quantity in Field
              <input placeholder='Quantity installed' value={qtyInField} onChange={(e) => setQtyInField(e.target.value)} />
            </div>
            <div>Quantity in Stock
              <input placeholder='Quantity in stock' value={qtyOwned} onChange={(e) => setQtyOwned(e.target.value)} />
            </div>
            <div>Stock Override Quantity
              <input placeholder='Override Qty' value={stockOverrideQty} onChange={(e) => setStockOverrideQty(e.target.value)} />
            </div>
            <button type='submit'>Submit</button>
          </form>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
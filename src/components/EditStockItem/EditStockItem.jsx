import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router';

// TO DO : set up 'admin mode' allowing signficantly more modifications directly from this page.
// Currently they can only edit items they do not have in stock.

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

export default function EditStockItem(props) {
  const stockDetail = useSelector(store => store.stockItemDetails[0])
  let returnedQuant = props.returnedQuant
  // console.log(`Returned quant:`, returnedQuant);

  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dispatch({ type: 'GET_STOCK_ITEM_DETAILS', payload: stockDetail.mot_id })
    setOpen(true);
    setStockOverride(stockDetail.stock_override)
    setStockOverrideQty(stockDetail.stock_override_qty)
    setQtyInField(stockDetail.quantity_in_field)
    setQtyOwned(stockDetail.quantity_owned)
    setStockOverride(stockDetail.stock_override)
    setStockOverrideQty(stockDetail.stock_override_qty)
  }

  const handleClose = () => setOpen(false);

  const [qtyInField, setQtyInField] = useState(stockDetail.quantity_in_field)
  const [qtyOwned, setQtyOwned] = useState(stockDetail.quantity_owned)
  const [stockOverride, setStockOverride] = useState(stockDetail.stock_override)
  const [stockOverrideQty, setStockOverrideQty] = useState(stockDetail.stock_override_qty)

  const submitEdits = () => {
    event.preventDefault();
    // set up defaults.
    if (returnedQuant > 0) {
      // console.log(`returned Quant:`, returnedQuant);
      // console.log(`qtyOwned:`, qtyOwned);
      let newQuantityToOrder = returnedQuant - qtyOwned

      // console.log(`newquanttoorder:`, newQuantityToOrder);

      if (newQuantityToOrder > 0) {
        let updatedItemData = { qtyInField, qtyOwned, stockOverride, stockOverrideQty, mot_id: stockDetail.mot_id, newQuantityToOrder }
        console.log(`newquanttoorder:`, newQuantityToOrder);
        dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
      } else {
        let newQuantityToOrder = 0
        let updatedItemData = { qtyInField, qtyOwned, stockOverride, stockOverrideQty, mot_id: stockDetail.mot_id, newQuantityToOrder }
        console.log(`newquanttoorder:`, newQuantityToOrder);
        dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
      }
      if (stockOverride === true) {
        newQuantityToOrder = Number(stockOverrideQty)
        let updatedItemData = { qtyInField, qtyOwned, stockOverride, stockOverrideQty, mot_id: stockDetail.mot_id, newQuantityToOrder }
        console.log(`newquanttoorder:`, newQuantityToOrder);
        dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
      }
    } else {
      let newQuantityToOrder = 0
      let updatedItemData = { qtyInField, qtyOwned, stockOverride, stockOverrideQty, mot_id: stockDetail.mot_id, newQuantityToOrder }
      console.log(`newquanttoorder:`, newQuantityToOrder);
      dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
    }
    //   if (newQuantityToOrder > 0) {
    //     let updatedItemData = { qtyInField, qtyOwned, stockOverride, stockOverrideQty, mot_id: stockDetail.mot_id, quantityToOrder }
    //     dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
    //   } else {
    //     let updatedItemData = { qtyInField, qtyOwned, stockOverride, stockOverrideQty, mot_id: stockDetail.mot_id, quantityToOrder }
    //     dispatch({ type: 'UPDATE_MY_STOCK_ITEM', payload: updatedItemData })
    //   }
    // } else if (quantityToOrder <= 0) {
    //   let quantityToOrder = 0


    // }

    setOpen(false)
    dispatch({ type: 'GET_STOCK_ITEM_DETAILS', payload: stockDetail.mot_id })
    history.push(`/stockItemDetail/${stockDetail.mot_id}`)
  }


  return (
    <div>
      <div className='btn-container-no-margin'>
        <Button startIcon={<EditIcon />} sx={{ m: 1 }} variant='outlined' onClick={handleOpen}>Edit Stock Item</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, border: 'none' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Stock Item
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <form onSubmit={submitEdits}>
            <div>Quantity in Field
              <input placeholder='Quantity installed' type='number' value={qtyInField} onChange={(e) => setQtyInField(e.target.value)} />
            </div>
            <div>Quantity in Stock
              <input placeholder='Quantity in stock' type='number' value={qtyOwned} onChange={(e) => setQtyOwned(e.target.value)} />
            </div>
            <div>

            </div>

            {stockOverride ?
              <>
                <div>
                  <Button variant='outlined' color='secondary' onClick={() => { setStockOverride(false) }} type="button">Turn off Override</Button>
                </div>
                <div>Stock Override Quantity
                  <input placeholder='Override Qty' type="number" value={stockOverrideQty} onChange={(e) => setStockOverrideQty(e.target.value)} />
                </div>
              </>
              : <Button variant='outlined' onClick={() => { setStockOverride(true) }} type="button">Activate Stock Override</Button>}
            <div className='confirmBtn'>
              <Button sx={{ marginLeft: 2, marginTop: 1 }} type='submit' variant='contained'>Submit</Button>
              <Button sx={{ marginLeft: 2, marginTop: 1 }} type='button' color='secondary' variant='contained' onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </form>
          {/* </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
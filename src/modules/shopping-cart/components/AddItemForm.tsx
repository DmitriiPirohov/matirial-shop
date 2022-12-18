import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { ALL_PRODUCTS, ShoppingCartItem } from "../models";

const AddItemBox = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  marginTop: "25px"
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
  width: "200px",
  marginRight: "20px"
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
  width: "80px",
  marginRight: "20px"
}));

type AddItemFormProps = {
  adderGoods: Function
};

const AddItemForm: React.FC<AddItemFormProps> = ({ adderGoods }) => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  
  const handleShowCount = (num : string | number): any => {
    return setQuantity(prev => (prev + (+num)) > 0 ? (+num) : 0);
  }

  const handleSubmit = () => {
    return (
      adderGoods(productId, quantity),
      setProductId(""),
      setQuantity(0)
    )
  }

  return (
    <AddItemBox>
      <ItemSelectWrapper>
        <TextField
          select
          value={productId}
          label="Product"
          onChange={(event) => setProductId(event.target.value)}
        >
          {ALL_PRODUCTS.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelectWrapper>
      <QuantityInputWrapper
      >
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(event) => handleShowCount(event.target.value)}
          onMouseEnter={() => ((productId && quantity === 0) && setQuantity(1))}
        />
      </QuantityInputWrapper>
      <Button
        variant="contained"
        disabled={!quantity || !productId}
        onClick={() => handleSubmit()}
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItemForm;
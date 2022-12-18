import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const TotalWrapper = styled(Box)(() => ({
  paddingTop: 40
}));

type TotalProps = {
  items: ShoppingCartItem[];
  changeItems: Function;
};

const Total: React.FC<TotalProps> = ({ items, changeItems }) => {
  
  return (
    <TotalWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Total: ${items.map((item) => (PRODUCTS_MAP[item.productId].price) * item.quantity).reduce((a, b) => a + b, 0)}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={() => changeItems(null)}>Clear</Button>
        </Grid>
      </Grid>
    </TotalWrapper>
  );
};

export default Total;
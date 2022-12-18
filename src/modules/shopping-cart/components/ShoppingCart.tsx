import { styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ShoppingCartItem } from "../models";
import AddItemForm from "./AddItemForm";
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
  width: 600,
  margin: "auto",
  padding: 50,
  minHeight: 500
}));
const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: 24
}));
const ShoppingCart = () => {
  const [items, setItems] = useState<ShoppingCartItem[]>([]);

  const changeItems = (id: string , count: number) => {
    if(id === null){
      return setItems([]);
    }

    if (items.find(a => a.productId === id) !== undefined && count === 0) {
      return setItems(prev => prev.filter(a => a.productId !== id));
    }

    if (items.find(a => a.productId === id) === undefined) {
      return setItems(prev => [...prev, { "productId": id, "quantity": count, }]);
    }

    if (items.find(a => a.productId === id) !== undefined) {
      return setItems(prev => prev.map(a => a.productId === id ? {"productId" : id, "quantity": (a.quantity + count) > 0 ? (a.quantity + count) : 1} : a));
    }
  }

  return (
    <ShoppingCardWrapper>
      <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
      <AddItemForm adderGoods={changeItems} />
      {!!items.length && (
        <>
          <ItemsList items={items} changeItems={changeItems} />
          <Total items={items} changeItems={changeItems} />
        </>
      )}
    </ShoppingCardWrapper>
  );
};
export default ShoppingCart;

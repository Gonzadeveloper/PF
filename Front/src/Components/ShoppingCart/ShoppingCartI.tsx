import React from 'react';
import OffCanvasExample from "./ShoppingCart"
import { CartIcon } from './icons'

function Example() {
  return (
    <>
      {/* Aquí se usa solo la posición 'start' */}
      <OffCanvasExample placement="start" name="🛒">
        <CartIcon />
      </OffCanvasExample>
    </>
  );
}

export default Example;
import "./ShoppingListItem.less";
import { ShoppingListItemDto } from './ClientService';
import { useState } from "react";
import { Modal } from './ModifyShoppingListItemModal';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Represents a shopping list item component.
 * 
 * @param itemDto - The shopping list item data.
 * @param onDelete - Callback function to delete the item.
 * @param onUpdate - Callback function to update the item.
 * 
 * @returns {JSX.Element} The rendered shopping list item component.
 */
export function ShoppingListItem({ itemDto, onDelete, onUpdate }: {
  itemDto: ShoppingListItemDto,
  onDelete: () => void,
  onUpdate: (updatedItem: ShoppingListItemDto) => void,
}) {
  const [item, setItem] = useState(itemDto);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedItem: ShoppingListItemDto) => {
    setItem(updatedItem);
    onUpdate(updatedItem);
    setIsModalOpen(false);
  };

  return (
    <div className={"ShoppingListItem"} onClick={() => setIsModalOpen(true)}>
      <div className="Name">{item.name}</div>
      <div className="Description">{item.description ? item.description : ""}</div>
      <div className={item.purchased ? "Purchased" : "NotPurchased"}>{item.purchased ? "Purchased" : "Not Purchased"}</div>
      <div className="Quantity">Quantity: {item.quantity}</div>
      <div className="Price">Price: {item.price} Ft</div>
      <IconButton className="DeleteButton" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
        <DeleteIcon />
      </IconButton>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={item} setItem={handleSave} />
    </div>
  );
}
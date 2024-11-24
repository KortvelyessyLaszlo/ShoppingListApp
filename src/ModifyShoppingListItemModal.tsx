import './ModifyShoppingListItemModal.less';
import { ShoppingListItemDto } from './ClientService';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ShoppingListItemDto;
  setItem: (item: ShoppingListItemDto) => void;
}

/**
 * Modal component for modifying a shopping list item.
 *
 * @param {boolean} isOpen - Determines if the modal is open.
 * @param {() => void} onClose - Function to close the modal.
 * @param {ShoppingListItemDto} item - The shopping list item to be modified.
 * @param {(item: ShoppingListItemDto) => void} setItem - Function to update the shopping list item.
 *
 * @returns {JSX.Element | null} The modal component or null if not open.
 */
export function Modal({ isOpen, onClose, item, setItem }: ModalProps) {
  const [localItem, setLocalItem] = useState(item);

  useEffect(() => {
    if (isOpen) {
      setLocalItem(item);
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  const handleInputChange = (name: string, value: string | boolean | number) => {
    setLocalItem({
      ...localItem,
      [name]: value,
    });
  };

  const handleSave = () => {
    setItem(localItem);
    onClose();
  };

  return <div className="modal-overlay">
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-close">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <label>
        Name:
        <input name="name" value={localItem.name} onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><br />
      </label>
      <label>
        Description:
        <input name="description" value={localItem.description} onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><br />
      </label>
      <label>
        Quantity:
        <input name="quantity" type="number" value={localItem.quantity} onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><br />
      </label>
      <label>
        Price:
        <input name="price" type="number" value={localItem.price} onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><br />
      </label>
      <label>
        Purchased:
        <input name="purchased" type="checkbox" checked={localItem.purchased} onChange={(e) => handleInputChange(e.target.name, e.target.checked)} /><br />
      </label>
      <button className="modal-save" onClick={(e) => { e.stopPropagation(); handleSave(); }}>Save</button>
    </div>
  </div>;
}
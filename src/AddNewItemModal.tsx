import './AddNewItemModal.less';
import { ShoppingListItemDto } from './ClientService';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    addItem: (item: ShoppingListItemDto) => void;
}

/**
 * A modal component for adding a new item to the shopping list.
 *
 * @param {boolean} isOpen - Indicates whether the modal is open.
 * @param {() => void} onClose - Function to call when the modal is closed.
 * @param {(item: ShoppingListItemDto) => void} addItem - Function to call when a new item is added.
 *
 * @returns {JSX.Element | null} The modal component if `isOpen` is true, otherwise null.
 */
export function AddNewItemModal({ isOpen, onClose, addItem }: ModalProps) {
    const [localItem, setLocalItem] = useState<ShoppingListItemDto>({
        id: 0,
        name: '',
        quantity: 1,
        price: 0,
        description: '',
        purchased: false,
    });

    if (!isOpen) return null;

    const handleInputChange = (name: string, value: string | boolean | number) => {
        setLocalItem({
            ...localItem,
            [name]: value,
        });
    };

    const handleSave = () => {
        addItem(localItem);
        setLocalItem({
            id: 0,
            name: '',
            quantity: 1,
            price: 0,
            description: '',
            purchased: false,
        });
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
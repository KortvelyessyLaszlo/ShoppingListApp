import './AddNewListModal.less';
import { ShoppingListDto } from './ClientService';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Props for the AddNewListModal component.
 * 
 * @interface ModalProps
 * @property {boolean} isOpen - Indicates whether the modal is open.
 * @property {() => void} onClose - Function to call when the modal is closed.
 * @property {(list: ShoppingListDto) => void} addList - Function to call to add a new shopping list.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  addList: (list: ShoppingListDto) => void;
}

/**
 * AddNewListModal component allows users to add a new shopping list.
 * 
 * @param {ModalProps} props - The properties for the AddNewListModal component.
 * @returns {JSX.Element | null} The rendered modal component or null if the modal is not open.
 */
export function AddNewListModal({ isOpen, onClose, addList }: ModalProps) {
  const [localList, setLocalList] = useState<ShoppingListDto>({
    id: 0,
    name: '',
    dateCreated: new Date().toISOString(),
    items: [],
  });

  if (!isOpen) return null;

  const handleInputChange = (name: string, value: string | boolean | number) => {
    setLocalList({
      ...localList,
      [name]: value,
    });
  };

  const handleSave = () => {
    addList(localList);
    setLocalList({
      id: 0,
      name: '',
      dateCreated: new Date().toISOString(),
      items: [],
    });
    onClose();
  };

  return (
    <div className="add-list-modal-overlay" onClick={onClose}>
      <div className="add-list-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="add-list-modal-close">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <label>
          Name:
          <input name="name" value={localList.name} onChange={(e) => handleInputChange(e.target.name, e.target.value)} /><br />
        </label>
        <button className="add-list-modal-save" onClick={(e) => { e.stopPropagation(); handleSave(); }}>Save</button>
      </div>
    </div>
  );
}
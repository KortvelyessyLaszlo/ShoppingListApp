import { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EditableShoppingListNameProps {
  name: string;
  onSave: (newName: string) => void;
}

/**
 * EditableShoppingListName component allows the user to edit the name of a shopping list.
 * 
 * @param {EditableShoppingListNameProps} props - The properties for the component.
 * @param {string} props.name - The current name of the shopping list.
 * @param {(newName: string) => void} props.onSave - Callback function to save the new name.
 * 
 * @returns {JSX.Element} The rendered component.
 */
export function EditableShoppingListName({ name, onSave }: EditableShoppingListNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSave = () => {
    onSave(newName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(name);
    setIsEditing(false);
  };

  return (
    <div className="editable-shopping-list-name">
      {isEditing ? (
        <>
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            size="small"
            onClick={(e) => e.stopPropagation()}
          />
          <IconButton onClick={(e) => { e.stopPropagation(); handleSave(); }}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); handleCancel(); }}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <span>{name}</span>
          <IconButton onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </div>
  );
}
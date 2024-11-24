import { ShoppingListDto } from './ClientService';
import './ShoppingListPreview.less';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableShoppingListName } from './EditableShoppingListName';

/**
 * Props for the ShoppingListPreview component.
 * 
 * @interface ShoppingListPreviewProps
 * @property {ShoppingListDto} list - The shopping list data transfer object.
 * @property {(id: number) => void} onDelete - Callback function to handle deletion of a shopping list by id.
 * @property {(list: ShoppingListDto) => void} onSelect - Callback function to handle selection of a shopping list.
 * @property {(id: number, newName: string) => void} onUpdateName - Callback function to handle updating the name of a shopping list by id.
 */
interface ShoppingListPreviewProps {
  list: ShoppingListDto;
  onDelete: (id: number) => void;
  onSelect: (list: ShoppingListDto) => void;
  onUpdateName: (id: number, newName: string) => void;
}

/**
 * A component that displays a preview of a shopping list.
 * 
 * @param {ShoppingListPreviewProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export function ShoppingListPreview({ list, onDelete, onSelect, onUpdateName }: ShoppingListPreviewProps) {
  return (
    <div className="ShoppingListItem" onClick={() => onSelect(list)}>
      <EditableShoppingListName
        name={list.name}
        onSave={(newName) => onUpdateName(list.id, newName)}
      />
      <div className="Date">{new Date(list.dateCreated).toLocaleDateString()}</div>
      <IconButton className="DeleteButton" onClick={(e) => { e.stopPropagation(); onDelete(list.id); }}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
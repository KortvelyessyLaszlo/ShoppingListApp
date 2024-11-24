import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './ShoppingListTopBar.less';

/**
 * Props for the TopBar component.
 * 
 * @interface TopBarProps
 * @property {number} totalPrice - The total price of items in the shopping list.
 * @property {() => void} onAddNewItem - Callback function to handle adding a new item.
 * @property {string} title - The title to be displayed in the top bar.
 */
interface TopBarProps {
    totalPrice: number;
    onAddNewItem: () => void;
    title: string;
}

/**
 * A functional component that renders the top bar of the shopping list.
 * 
 * @param {TopBarProps} props - The props for the TopBar component.
 * @returns {JSX.Element} The rendered top bar component.
 */
export function TopBar({ totalPrice, onAddNewItem, title }: TopBarProps) {
    return <div className="top-bar">
            <IconButton onClick={onAddNewItem}>
                <AddIcon />
            </IconButton>
            <div className="title">{title}</div>
            <div className="total-price">Total Price: {totalPrice} Ft</div>
        </div>
    };


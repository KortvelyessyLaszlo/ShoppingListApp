import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './TopBar.less';
import { SearchBar } from './SearchBar';

/**
 * Props for the TopBar component.
 * 
 * @interface TopBarProps
 * @property {() => void} onAddNewList - Callback function to handle the addition of a new list.
 * @property {(query: string) => void} onSearch - Callback function to handle search queries.
 */

interface TopBarProps {
  onAddNewList: () => void;
  onSearch: (query: string) => void;
}

/**
 * TopBar component that renders the top navigation bar of the Shopping List App.
 * It includes an add button and a search bar.
 * 
 * @param {TopBarProps} props - The props for the TopBar component.
 * @returns {JSX.Element} The rendered TopBar component.
 */
export function TopBar({ onAddNewList, onSearch }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="left-section">
        <IconButton onClick={onAddNewList}>
          <AddIcon />
        </IconButton>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="app-name">Shopping List App</div>
    </div>
  );
}
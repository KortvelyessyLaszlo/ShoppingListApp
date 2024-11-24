import { useState } from 'react';
import './SearchBar.less';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

/**
 * SearchBar component allows users to input a search query and trigger a search action.
 *
 * @param {SearchBarProps} props - The properties for the SearchBar component.
 * @param {function} props.onSearch - Callback function to handle the search action.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search lists..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
import { useState, useEffect, useCallback } from 'react';
import { ShoppingListDto } from './ClientService';
import { ShoppingList } from './ShoppingList';
import { AddNewListModal } from './AddNewListModal';
import { ShoppingListPreview } from './ShoppingListPreview';
import { TopBar } from './TopBar';
import './ShoppingLists.less';

const LOCAL_STORAGE_KEY = 'shoppingLists';

/**
 * Component that manages and displays a list of shopping lists.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @description
 * This component handles the state and logic for managing multiple shopping lists.
 * It allows users to add, delete, update, and search through shopping lists.
 * The component also persists the shopping lists in the local storage.
 * 
 * @property {number} id - The unique identifier of the shopping list.
 * @property {string} name - The name of the shopping list.
 * 
 * @state {ShoppingListDto[]} shoppingLists - The list of shopping lists.
 * @state {ShoppingListDto | null} selectedList - The currently selected shopping list.
 * @state {boolean} isAddModalOpen - Whether the modal for adding a new list is open.
 * @state {string} searchQuery - The current search query for filtering shopping lists.
 * 
 * @function onAddNewList - Opens the modal for adding a new shopping list.
 * @function addList - Adds a new shopping list to the state.
 * @function onDeleteList - Deletes a shopping list from the state.
 * @function onSelectList - Selects a shopping list to view its details.
 * @function onUpdateList - Updates an existing shopping list in the state.
 * @function onUpdateName - Updates the name of an existing shopping list.
 * @function handleSearch - Updates the search query for filtering shopping lists.
 * 
 * @hook useState - Manages the state of the component.
 * @hook useEffect - Persists the shopping lists in local storage whenever they change.
 * @hook useCallback - Memoizes the onUpdateList function to prevent unnecessary re-renders.
 */
export function ShoppingLists() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingListDto[]>(() => {
    const storedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLists ? JSON.parse(storedLists) : [];
  });
  const [selectedList, setSelectedList] = useState<ShoppingListDto | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shoppingLists));
  }, [shoppingLists]);

  const onAddNewList = () => {
    setIsAddModalOpen(true);
  };

  const addList = (newList: ShoppingListDto) => {
    setShoppingLists(prevLists => {
      const existingIds = prevLists.map(list => list.id);
      const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
      const listWithId = { ...newList, id: newId };
      return [...prevLists, listWithId];
    });
  };

  const onDeleteList = (id: number) => {
    setShoppingLists(shoppingLists.filter(list => list.id !== id));
  };

  const onSelectList = (list: ShoppingListDto) => {
    setSelectedList(list);
  };

  const onUpdateList = useCallback(
    (updatedList: ShoppingListDto) => {
      setShoppingLists(prevLists =>
        prevLists.map(list => (list.id === updatedList.id ? updatedList : list))
      );
    },
    []
  );

  const onUpdateName = (id: number, newName: string) => {
    setShoppingLists(prevLists =>
      prevLists.map(list => (list.id === id ? { ...list, name: newName } : list))
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredLists = shoppingLists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedList) {
    return (
      <ShoppingList
        shoppingList={selectedList}
        onBack={() => setSelectedList(null)}
        onUpdateList={onUpdateList}
      />
    );
  }

  return (
    <div className="ShoppingLists">
      <TopBar onAddNewList={onAddNewList} onSearch={handleSearch} />
      {filteredLists.map(list => (
        <ShoppingListPreview
          key={list.id}
          list={list}
          onDelete={onDeleteList}
          onSelect={onSelectList}
          onUpdateName={onUpdateName}
        />
      ))}
      <AddNewListModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        addList={addList}
      />
    </div>
  );
}
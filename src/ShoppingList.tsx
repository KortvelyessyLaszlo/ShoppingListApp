import { useState, useEffect } from 'react';
import { ShoppingListItem } from './ShoppingListItem';
import { ShoppingListDto, ShoppingListItemDto } from './ClientService';
import { TopBar } from './ShoppingListTopBar';
import { AddNewItemModal } from './AddNewItemModal';
import './ShoppingList.less';

interface ShoppingListProps {
  shoppingList: ShoppingListDto;
  onBack: () => void;
  onUpdateList: (updatedList: ShoppingListDto) => void;
}

/**
 * ShoppingList component.
 * 
 * This component renders a shopping list with the ability to add, update, and delete items.
 * It also calculates the total price of the items in the list.
 * 
 * @param {ShoppingListProps} props - The props for the ShoppingList component.
 * @param {ShoppingListDto} props.shoppingList - The shopping list to render.
 * @param {() => void} props.onBack - Function to call when the back button is clicked.
 * @param {(updatedList: ShoppingListDto) => void} props.onUpdateList - Function to call to update the shopping list.
 * @returns {JSX.Element} The rendered ShoppingList component.
 */
export function ShoppingList({ shoppingList, onBack, onUpdateList }: ShoppingListProps) {
  const [items, setItems] = useState<ShoppingListItemDto[]>(shoppingList.items);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [items]);

  useEffect(() => {
    const updatedList = { ...shoppingList, items };
    onUpdateList(updatedList);
  }, [items, onUpdateList, shoppingList]);

  const onDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const onAddNewItem = () => {
    setIsAddModalOpen(true);
  };

  const addItem = (newItem: ShoppingListItemDto) => {
    setItems(prevItems => {
      const existingIds = prevItems.map(item => item.id);
      const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
      const itemWithId = { ...newItem, id: newId };
      return [...prevItems, itemWithId];
    });
  };

  const onUpdateItem = (updatedItem: ShoppingListItemDto) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  return (
    <div className="ShoppingList">
      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
      <TopBar totalPrice={totalPrice} onAddNewItem={onAddNewItem} title={shoppingList.name}/>
      {items.map(item => (
        <ShoppingListItem
          key={item.id}
          itemDto={item}
          onDelete={() => onDelete(item.id)}
          onUpdate={onUpdateItem}
        />
      ))}
      <AddNewItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        addItem={addItem}
      />
    </div>
  );
}
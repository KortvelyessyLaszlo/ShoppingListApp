
/**
 * Represents an item in the shopping list.
 */
export interface ShoppingListItemDto {
    /**
     * The unique identifier of the item.
     */
    id: number;

    /**
     * The name of the item.
     */
    name: string;

    /**
     * The quantity of the item.
     */
    quantity: number;

    /**
     * The price of the item.
     */
    price: number;

    /**
     * The description of the item (optional).
     */
    description?: string;

    /**
     * Indicates whether the item has been purchased.
     */
    purchased: boolean;
}

/**
 * Represents a shopping list.
 */
export interface ShoppingListDto {
    /**
     * The unique identifier of the shopping list.
     */
    id: number;

    /**
     * The name of the shopping list.
     */
    name: string;

    /**
     * The date when the shopping list was created.
     */
    dateCreated: string;

    /**
     * The items in the shopping list.
     */
    items: ShoppingListItemDto[];
}
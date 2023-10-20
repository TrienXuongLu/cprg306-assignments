"use client";

import ItemList from './item-list.js';
import NewItem from './new-item.js';
import itemsData from './items.json';
import { useState } from 'react';

export default function Page() {
    const [items, setItems] = useState(itemsData);

    function handleAddItem(item) {
        setItems([...items, item]);
    }

    return (
        <>
            <main>
                <NewItem onAddItem={(item) => handleAddItem(item)} />
                <ItemList ItemList={items} />
            </main>
        </>
    )
}
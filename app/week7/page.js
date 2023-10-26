"use client";

import ItemList from './item-list.js';
import NewItem from './new-item.js';
import itemsData from './items.json';
import MealIdeas from './meal-ideas.js';
import { useState, useEffect } from 'react';
import { set } from 'date-fns';

export default function Page() {
    const [items, setItems] = useState(itemsData);
    const [itemName, setItemName] = useState("");
    const [selectedItemName, setSelectedItemName] = useState("");

    function handleAddItem(item) {
        setItems([...items, item]);
    }

    function handleItemSelect(itemName) {
        setSelectedItemName(itemName);
    }

    useEffect(() => {
        if(selectedItemName === "") {
            return;
        } else {
            const name = selectedItemName.split(" ");
            if(name.length <= 2 && name.length > 0) {
                setSelectedItemName(name[0]);
            } else if(name.length > 2) {
                if(name[1].endsWith(",")) {
                    setSelectedItemName(`${name[0]} ${name[1].substring(0, name[1].length - 1)}`);
                } else if(name[0].endsWith(",")) {
                    setSelectedItemName(`${name[0].substring(0, name[0].length - 1)}`);
                } else {
                    setSelectedItemName(`${name[0]} ${name[1]}`);
                }
            }
        }
    }, [selectedItemName])

    return (
        <>
            <div className='bg-slate-900'>
                <h1 className="text-white font-bold text-2xl w-72">Shopping List</h1>
            </div>
            <main className="flex bg-slate-900">
                <span>
                    <NewItem onAddItem={(item) => handleAddItem(item)} />
                    <ItemList ItemList={items} onItemSelect={(itemName) => handleItemSelect(itemName)} />
                </span>
                <MealIdeas selectedItemName={selectedItemName} />
            </main>
        </>
    )
}
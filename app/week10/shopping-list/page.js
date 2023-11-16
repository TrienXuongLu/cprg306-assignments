"use client";

import ItemList from './item-list.js';
import NewItem from './new-item.js';
import MealIdeas from './meal-ideas.js';
import { useState, useEffect } from 'react';
import { set } from 'date-fns';
import { getItems, addItem } from '../_services/shopping-list-service.js';
import {getAuth, onAuthStateChanged} from "firebase/auth";

export default function ShoppingList() {
    //This line of code take data from JSON
    const [items, setItems] = useState('');
    const [selectedItemName, setSelectedItemName] = useState("");
    const [userId, setUserId] = useState("");

    async function handleAddItem(item) {
        const newItem = {name: item.name, quantity: item.quantity, category: item.category};
        await addItem(userId, newItem);

    }

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if(user) {
            await setUserId(user.uid);
        } else {
            return;
        }
    });

    async function loadItems() {
        try{
            const results = await getItems(userId);
            console.log(results);
            setItems(results);
            return;
        } catch (e) {
            console.error('Here my error', e);
        }
    };

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

    useEffect(() => {
        if(userId !== "") {
            loadItems();
        }
        return;
    }, [userId]);

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
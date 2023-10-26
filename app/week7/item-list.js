"use client";

import Item from "./item";
import React, {useState} from "react";

export default function ItemList({ItemList, onItemSelect}) {
    const [sortBy, setSortBy] = useState("name");

    function handleClickName() {
        setSortBy("name");
    }

    function handleClickCategory() {
        setSortBy("category");
    }

    const displayedList = sortBy == "name" ? ItemList.sort((a, b) => a.name.localeCompare(b.name)) : ItemList.sort((a, b) => a.category.localeCompare(b.category));

    return (
        <>
            <main className="p-4 pt-0">
                <p className="font-bold text-white text-lg mr-5">Sort By:</p>
                <div className="text-white flex m-2 h-14">
                    <button className={`w-36 h-10 bg-amber-700 hover:bg-amber-600 ${sortBy === 'name' ? "bg-amber-500" : ''}`} onClick={() => handleClickName()}>Sort By Name</button>
                    <button className={`w-36 h-10 bg-amber-700 hover:bg-amber-600 mx-3 ${sortBy === 'category' ? "bg-amber-500" : ''}`} onClick={() => handleClickCategory()}>Sort by Category</button>
                </div>
                {displayedList.map((item) => {
                    return <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} onSelect={() => onItemSelect(item.name)} />
                })
                }
            </main>
        </>
    )
}


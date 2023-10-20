"use client";

import Item from "./item";
import React, {useState} from "react";

export default function ItemList({ItemList}) {
    const [sortBy, setSortBy] = useState("name");

    function handleClickName() {
        setSortBy("name");
    }

    function handleClickCategory() {
        setSortBy("category");
    }

    function handleGroupCategory() {
        setSortBy("category");
    }

    const displayedList = sortBy == "name" ? ItemList.sort((a, b) => a.name.localeCompare(b.name)) : ItemList.sort((a, b) => a.category.localeCompare(b.category));

    return (
        <>
            <main className="bg-slate-900 p-4">
                <h1 className="text-white font-bold text-2xl">Shopping List</h1>
                <div className="text-white flex m-2 h-14">
                    <p className="font-bold text-lg mr-5">Sort By:</p>
                    <button className={`w-40 h-10 bg-amber-700 hover:bg-amber-600 ${sortBy === 'name' ? "bg-amber-500" : ''}`} onClick={() => handleClickName()}>Sort By Name</button>
                    <button className={`w-40 h-10 bg-amber-700 hover:bg-amber-600 mx-3 ${sortBy === 'category' ? "bg-amber-500" : ''}`} onClick={() => handleClickCategory()}>Sort by Category</button>
                    <button className={`w-40 h-10 bg-amber-700 hover:bg-amber-600 ${sortBy === 'group' ? "bg-amber-500" : ''}`} onClick={() => handleGroupCategory()}>Grouped Category</button>
                </div>
                {displayedList.map((item) => {
                    console.log(item);
                    return <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                })
                }
            </main>
        </>
    )
}


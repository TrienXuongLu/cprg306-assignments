"use client";

import { ca } from "date-fns/locale";
import Item from "./item";
import itemsList from "./items.json";
import React, {useState} from "react";

export default function ItemList() {
    const [sortBy, setSortBy] = useState("name");

    function handleClickName() {
        setSortBy("name");
    }

    function handleClickCategory() {
        setSortBy("category");
    }

    function handleGroupCategory() {
        setSortBy("group");
    }

    const groupList = itemsList.reduce((final, current) => {
        const cat = current.category;
        if(final[cat] == null) {
            final[cat] = [];
        }
        final[cat].push(current);
        return final;
    }, {})

    const categoryList = Object.entries(groupList);

    const categoryGroup = [];
    const categoryObject = [];

    const categoryListValue = categoryList.forEach((values) => {
        return values.map((item) => {
            console.log(item);
            return categoryGroup.push(item);
        })
    });

    for(let i = 0; i < categoryGroup.length; i + 2) {
        const category = categoryGroup[i];
        const categoryValue = categoryGroup[i + 1];
        categoryObject.push({category, categoryValue});
    }

    console.log(categoryObject);

    const displayedList = sortBy == "name" ? itemsList.sort((a, b) => a.name.localeCompare(b.name)) : itemsList.sort((a, b) => a.category.localeCompare(b.category));

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
                {sortBy != "group" ? displayedList.map((item) => {
                    console.log(item);
                    return <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                }) : "Couldn't solve this issue"
                }
            </main>
        </>
    )
}

//Run this lines of code got crashed
// categoryObject.map((item) => {
//     const category = item[0];
//     const categoryArray = item[1];
//     <h1 className="font-bold text-lg mr-5 text-white">{category}</h1>
//     return categoryArray.map(item => {
//         return <Item key={item.id} name={items.name} quantity={items.quantity} category={items.category} />
//     })})


//These lines of code and can read value but violate JSX issue. Couldn't find an issue.
// categoryList.forEach((values) => {
//     const [value, valueItems] = values;
//     <h1 className="font-bold text-lg mr-5 text-white">{value}</h1>
//     return valueItems.map((items, id) => {
//             console.log(items);
//             console.log(items.name)
//             return <Item key={id} name={items.name} quantity={items.quantity} category={items.category} />
//     })})
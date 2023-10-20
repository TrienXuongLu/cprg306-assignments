"use client";

import { set } from "date-fns";
import { useState } from "react";

export default function NewItem({onAddItem}) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");

    function handleSubmit(event) {
        event.preventDefault();
        const item = {name, quantity, category};
        console.log(item);
        onAddItem(item);
        alert(`Name: ${name} + Quantity: ${quantity} + Category: ${category}`);
        setName("");
        setQuantity(1);
        setCategory("Produce");
    }

    return (
        <>
            <div className="flex justify-center py-5 bg-slate-900 p-4">
                <form onSubmit={handleSubmit} className="w-72 h-52 bg-slate-800 text-white border rounded">
                    <div className="p-2">
                        <label htmlFor="name">Name</label><br />
                        <input className="max-w-full w-72 border rounded text-black h-8" value={name} type="text" id="name" onChange={(event) => setName(event.target.value)} required placeholder="  Item Name" />
                    </div>
                    <div className="flex p-2 max-w-full">
                        <div className="basis-2/5">
                            <label htmlFor="quantity">Quantity</label><br />
                            <input type="number" className="text-black border rounded w-14 h-8" min="1" max="99" value={quantity} id="quantity" onChange={(event) => setQuantity(event.target.value)} required  />
                        </div>
                        <div className="relative float-right basis-3/5">
                            <label htmlFor="category">Category</label><br />
                            <select name="category" id="category" value={category} onChange={(event) => setCategory(event.target.value)} className="text-black border rounded w-40 h-8">
                                <option value="produce" >Produce</option>
                                <option value="dairy" >Dairy</option>
                                <option value="bakery" >Bakery</option>
                                <option value="meat" >Meat</option>
                                <option value="frozen_foods" >Frozen Foods</option>
                                <option value="canned_foods" >Canned Foods</option>
                                <option value="dry_foods" >Dry Foods</option>
                                <option value="beverages" >Beverages</option>
                                <option value="snacks" >Snacks</option>
                                <option value="household" >Household</option>
                                <option value="other" >Other</option>
                            </select>
                        </div>
                    </div>
                    <input className="bg-blue-700 h-8 w-11/12 m-3 border rounded border-transparent hover:bg-indigo-500 hover:font-bold" type="submit" onClick={handleSubmit} value="Add" />
                </form>
            </div>
        </>
    )
}
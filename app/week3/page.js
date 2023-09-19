import ItemList from "./item-list.js";

export default function Page() {
    return (
        <>
            <main>
                <h1 className="m-4 text-2xl font-bold">Shopping List</h1>
                <ItemList />
            </main>
        </>
    )
}
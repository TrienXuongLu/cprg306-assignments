export default function Item({name, quantity, category}) {
    return (
        <>
            <ul className="m-4 text-base">
                <li className="border border-b-2 border-emerald-700 rounded-md">
                    <p className="text-lg font-medium capitalize">{name}</p>
                    <p className="">Buy {quantity} in {category}</p>
                </li>
            </ul>
        </>
    )
}
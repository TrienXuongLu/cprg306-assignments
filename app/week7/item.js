export default function Item({name, quantity, category, onSelect}) {
    return (
        <>
            <ul className="text-base hover:pl-2" onClick={() => onSelect(name)}>
                <li className="text-white border border-b-2 border-emerald-700 rounded-md my-4 w-80 hover:border-emerald-300">
                    <p className="text-lg font-medium capitalize pt-1 pl-1">{name}</p>
                    <p className="pb-1 pl-1">Buy {quantity} in {category}</p>
                </li>
            </ul>
        </>
    )
}
export default function Item({name, quantity, category}) {
    return (
        <>
            <ul className="text-base">
                <li className="text-white border border-b-2 border-emerald-700 rounded-md my-4 w-80">
                    <p className="text-lg font-medium capitalize pt-1 pl-1">{name}</p>
                    <p className="pb-1 pl-1">Buy {quantity} in {category}</p>
                </li>
            </ul>
        </>
    )
}
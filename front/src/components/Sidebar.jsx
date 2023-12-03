export const Sidebar = ({setPage}) => {
    return (
        <aside>
            <button onClick={() => setPage(0)}>Subir Modelo</button>
            <button onClick={() => setPage(1)}>Mis Modelos</button>
        </aside>
    )
}
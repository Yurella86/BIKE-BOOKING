import './Items.scss'

function Items({ id, name, type, color, status, prise, changeStatus, deleteItem }) {

    return (
        <div className={`item ${status}`}>
            <div className="column">
                <div className="column-left">
                    <div className="name-item">
                        <div className="name">{name}</div>
                        <div className="type">- {type}</div>
                        <div className="color">({color})</div>
                    </div>
                    <div className="id-item">ID:{id}</div>
                    <div className="status">STATUS:
                        <select name="status" id="status" value={status} onChange={(el) => { changeStatus(el.target.value, id) }}>
                            <option value="available">Available</option>
                            <option value="busy">Busy</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                </div>
                <div className="column-right">
                    <div className="icon-exit" onClick={(el) => { deleteItem(id) }}><span></span></div>
                    <div className="prise">{prise} UAH/hr.</div>
                </div>
            </div>
        </div >
    )
};

export default Items;

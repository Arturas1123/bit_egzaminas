import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";
import {useState} from "react";

export default function Index(props){
    const edit=props.can.edit;
    const [filter, setFilter]=useState({
        name:props.filter.name
    });
    const handleFilter=()=>{
        router.post(route("dishes.filter"),filter);
    }
    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        });
    }

    const dishList = [];
    props.dishes.forEach((dish)=>{
        dishList.push(<tr key={dish.id}>
            <td>{dish.name}</td>
            <td>{dish.summary}</td>
            <td>{dish.picture && <img alt="foto" width="80px" src={"/storage/books/"+dish.picture} />}</td>
            <td>{dish.price}</td>
            <td>{dish.cafe.name}</td>
            <td>
                {edit && <Link className="btn btn-primary" href={ route('dishes.edit', dish.id)}>Redaguoti</Link>}
                {edit && <button className="btn btn-warning" onClick={()=>{router.delete(route("dishes.destroy", dish.id))}}>Trinti</button>}
            </td>
        </tr> )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Patiekalų sąrašas
                    {edit && <Link className="btn btn-info float-end" href={route("dishes.create")}>Pridėti patiekalą</Link>}

                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>
                                <label>Pagal kavinės pavadinimą</label>
                                <input onChange={handleChange} id="name" value={filter.name} type="text" className="form-control"/>
                            </th>
                            <th>
                                <button onClick={handleFilter} className="btn btn-warning">Ieskoti</button>
                            </th>
                        </tr>
                        <tr>
                            <th>Patiekalas</th>
                            <th>Ingredientai</th>
                            <th>Nuotrauka</th>
                            <th>Kaina</th>

                            {edit &&<th>Veiksmai</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {dishList}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}

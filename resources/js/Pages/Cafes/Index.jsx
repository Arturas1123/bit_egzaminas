import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index(props){
    const edit=props.can.edit;
    const catList=[];
    props.cafes.forEach((cafe)=>{
        catList.push(<tr key={cafe.id}>
            <td>{cafe.name}</td>
            <td>
                {edit &&<Link className="btn btn-primary" href={ route('cafes.edit', cafe.id)}>Redaguoti</Link>}
                {edit &&<button className="btn btn-warning" onClick={()=>{router.delete(route("cafes.destroy", cafe.id))}}>Trinti</button>}
            </td>
        </tr> )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">
                    Kavunės
                    {edit &&<Link className="btn btn-info float-end" href={route("cafes.create")}>Pridėti kavinę</Link>}

                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Kavinė</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {catList}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}

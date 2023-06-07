import {router, useForm} from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";


export default function Edit(props){
    const {data, setData, post, errors} = useForm(props.dish);
    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        });
    };
    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post( route("dishes.update", data.id),{
            ...data,
            _method:'put',
        });
    }
    const catSele=[];
    props.cafes.forEach((cafe)=>{
        catSele.push(<option key={cafe.id} value={cafe.id}>{cafe.name}</option> )
    });
    return(
        <AppLayout>
            <div className="card">
                <div className="card-header">Redagavimas</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Patiekalas</label>
                            <input className={"form-control "+(errors.name!=null?"is-invalid":"")} type="text" id="name" value={data.name} onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.name}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ingredientai</label>
                            <input className={"form-control "+(errors.summary!=null?"is-invalid":"")} type="text" id="summary" value={data.summary} onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.summary}</div>
                        </div>

                        <div className="mb-3">
                            <input className="form-control" type="file" id="picture" onChange={(event)=>{
                                setData({
                                    ...data,
                                    picture: event.target.files[0]
                                })}
                            } />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kaina</label>
                            <input className={"form-control "+(errors.page!=null?"is-invalid":"")} type="text" id="price" value={data.page} onChange={handleChange}/>
                            <div className="invalid-feedback">{errors.page}</div>
                        </div>
                        <div className="mb-3">
                            <label>Kavinė</label>
                            <select className={"form-control "+(errors.cafe_id!=null?" is-invalid":"")}  id="cafe_id"  onChange={handleChange} value={data.cafe_id}>
                                {catSele}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success">Pridėti</button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {  useHistory } from 'react-router-dom';
import swal from 'sweetalert';



function EditCategory(props){

    const History = useHistory();
    const [loading, setloading ] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    

    useEffect(() => {
        const category_id = props.match.params.id;
         //console.log(category_id);
       axios.get(`/api/edit-category/${category_id}`).then(res=>{
           if(res.data.status === 200)
           {
            setCategory(res.data.category);
           }

           else if(res.data.status === 404)
           {
            swal("Error", res.data.message, "error");
            History.push('/admin/view-category')
          
           }
           setloading(false);
       });
    }, [props.match.params.id, History])


    const handleInput = (e) =>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value });
        
    }

    if(loading)
    {
        return <h4>Loading Category....</h4>
    }


    const updateCategory = (e) => {
     
        e.preventDefault();

        // const data = {
        //     slug:categoryInput.slug,
        //     name:categoryInput.name,
        //     description:categoryInput.descrip,
        //     status:categoryInput.status,
        //     meta_title:categoryInput.meta_title,
        //     meta_keywords:categoryInput.meta_keywords,
        //     meta_descrip:categoryInput.meta_descrip,
        // }
        const category_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/update-category/${category_id}`, data).then(res =>{
            if(res.data.status === 200)
            {
                    swal("Success", res.data.message, "success");
                    setError([]);
                    // document.getElementById('CATEGORY_FORM').reset();
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","", "error");
            
               
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                History.push('admin/view-category');
            }
        })
    }

    // var display_errors = [];
    // if(categoryInput.error_list)
    // {
    //     display_errors = [
    //         categoryInput.error_list.slug,
    //         categoryInput.error_list.name,
    //         categoryInput.error_list.meta_title,
           
    //     ]
    // }


    return (
        <div classNameName="container-fluid px-4">
            <h1 classNameName="mt-4">Edit Category</h1>
{/* 
            {
                display_errors.map( (item) => {
                    return( <li>item</li>) 
                })
            } */}


            <form  onSubmit={updateCategory}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SEO TAGS</button>
            </li>
           
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Slug</label>
                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                    <span className="text-danger">{error.slug}</span>
                   
                   

                </div>

                <div className="form-group mb-3">
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                    <span className="text-danger">{error.name}</span>
                  

                </div>

                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea  name="description" onChange={handleInput} value={categoryInput.description}className="form-control"> </textarea>
               

                </div>

                <div className="form-group mb-3">
                    <label>Status</label>
                    <input type="checkbox" name="status"  onChange={handleInput} value={categoryInput.status} />
                   
                     Status 0=shown/1=hidden

                </div>
                
                
                </div>

            <div className="tab-pane card-body border fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className="form-group mb-3">
                    <label>Title</label>
                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                    <span className="text-danger">{error.meta_title}</span>
                   
                  

                </div>
            
            <div className="form-group mb-3">
                    <label>Meta Keywords</label>
                    <textarea  name="meta_keywords" onChange={handleInput} value={categoryInput.meta_keywords} className="form-control"> </textarea>
                   

                </div>


                <div className="form-group mb-3">
                    <label>Meta Description</label>
                    <textarea  name="meta_descrip" onChange={handleInput} value={categoryInput.meta_descrip} className="form-control"> </textarea>
                   

                </div>
                
                
                </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </form>
        </div>
    )
}



export default EditCategory;
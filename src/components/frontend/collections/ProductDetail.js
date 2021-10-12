import React, {useEffect,useState} from 'react';
import {  useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';



function ProductDetail(props){

    const [loading, setloading ] = useState(true);
    const History = useHistory();
    const [product, setProduct ] = useState([]);

    const productCount = product.length;
    useEffect(() => {
        let isMounted = true;

        const category_slug = props.match.params.category
        const product_slug = props.match.params.product
        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(res=>{
          if(isMounted)
          {
            if(res.status === 200)
            {

                setProduct(res.data.product)
             
                setloading(false);
            }

            else if(res.data.status === 404)
            {
                History.push('/collections')
             swal("Warning", res.data.message, "error");
            
           
            }

          }
            
          

        });

        return () => {
            isMounted = false;
        }
      
    }, [props.match.params.category, props.match.params.product, History]);

    if(loading)
    {
        return <h4>Loading product Detail....</h4>
    }

    else
    {
        var availa_stock = '';

        if(product.qty > 0 )
        {

        availa_stock =  <div>
            <label className="btn-sm btn-success px-4 mt-2">In Stock</label>

            <div className="row">
                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <button  type="button" className="input-group-text">-</button>
                        <input type="text" className="form-control text-center" value="1"/>
                        <button  type="button" className="input-group-text">+</button>
                    </div>
                    </div>

                    <div className="col-md-3 mt-3">
                    <button  type="button" className="btn btn-primary w-100">Add to cart</button>

                    </div>




        
        </div>
        </div>
        }

        else
        {
            availa_stock =  <div>
            <label className="btn-sm btn-danger px-4 mt-2">out of Stock</label>
            </div>
        }
    }



    return (
        <div>
       
       <div className="py-3 bg-warning">
            <div className="container">
                <h6>Collections / {product.category.name} / {product.name}</h6>
            </div>
   
        </div>

        <div className="py-3">
            <div className="container">
                <h6>Product details</h6>
            </div>
   
        </div>

        <div className="container">
		<div className="card">
			<div className="container-fliud">
				<div className="wrapper row">
					<div className="preview col-md-6">
						
						<div className="preview-pic tab-content">
						  <div className="tab-pane active w-100" id="pic-1"><img src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} /></div>
						  
						</div>
					
						
					</div>
					<div className="details col-md-6">
						<h3 className="product-title">{product.name}</h3>
                        <h4 className="float-end badge btn-sm btn-danger badge-pill">{product.brand}</h4>
						<div className="rating">
						
						</div>
						<p className="product-description">{product.description}</p>
                        <h4 className="mb-1">
                        ${product.selling_price}
                        <s className="ms-2">${product.original_price}</s>

                        </h4>
						
                        {availa_stock}
                        <button  type="button" className="btn btn-danger mt-3">Add to wishlist</button>
					</div>
                  
				</div>
			</div>
		</div>
	</div>
         
        </div>
    )
}



export default ProductDetail;
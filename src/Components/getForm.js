import React, { Component } from 'react'
import axios from 'axios'
class getForm extends Component {
    constructor(props) {
        super(props)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
        this.state = {
             products : [],
             queryString : '',
             showTable : false,
             errorMessage : false
        }
    }
    changeHandler = (event) => {
        const query = event.target.value
        this.setState({
            queryString : query
        })
    }
    async onSubmitHandler(event) {
        event.preventDefault();
        if(this.state.queryString.length === 0){
            alert('Provide Details')
            this.setState({
                showTable : false
            })
            return;
        }
        await axios.get('http://localhost:8080/products/get?prod_name=' + this.state.queryString)
            .then((response) => {
                console.log(response)
                if(response.data.success === 1){
                    this.setState({
                        products : response.data.data,
                        queryString : '',
                        showTable : true
                    })
                }else if(response.data.success === 2){ 
                    this.setState({
                        queryString : '',
                        errorMessage : true
                    })
                   
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    newProductForm = () => 
    <form onSubmit={this.onSubmitHandler}>
        <input 
            placeholder="Search Products"
            value = {this.state.queryString}
            onChange = {this.changeHandler}
        ></input>
        <input 
            type="submit"
            value="submit"
        />
    </form>
    
    render() {
        return (
            <div>
                <h2>List Of Products</h2>
                {this.newProductForm()}
                {
                    this.state.showTable ? 
                    <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map((data, key) => {
                        return (
                        <tr key={key}>
                            <td>{data.prod_id}</td>
                            <td>{data.prod_name}</td>
                            <td>{data.unit_cost}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table> : this.state.errorMessage ? 
                    <h2>No Products found!</h2> : null
                }
            </div>
        )
    }
}

export default getForm

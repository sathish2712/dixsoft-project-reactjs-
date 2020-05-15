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
        await axios.get('https://vpsapg.dixsoft.online/product/get?prod_name=' + this.state.queryString)
            .then((response) => {
                if(this.state.products.length === 0){ 
                    alert('Provide details to search')
                    return;
                }
                if(response.data.success === 1){
                    this.setState({
                        products : response.data.data,
                        queryString : '',
                        showTable : true
                    })
                }else{
                    this.setState({
                        queryString : '',
                        errorMessage : true
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    
    render() {
        return (
            <div>
                <h2>List Of Products</h2>
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

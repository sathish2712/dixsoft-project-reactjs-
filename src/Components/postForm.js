import React, { Component } from 'react'
import axios from 'axios'
class postForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             model : '',
             cost : '',
             isFormFilled : false
        }
    }
    changehandler = e => { 
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    submitHandler = e => {
        e.preventDefault()
        if(this.state.model.length === 0 || this.state.cost.length === 0) {
            alert('Provide required details!')
            return;
        }
        const self = this
        axios.post('http://localhost:8080/products/save?prod_name=' + this.state.model + '&unit_cost=' + this.state.cost)
            .then(response => {
                console.log(response)
                if(response.data.success === 1){
                    self.setState({
                        isFormFilled : true,
                        model : '',
                        cost : ''
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        const { model , cost } = this.state
        return (
            <div>
                <h2>Create products</h2>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text"
                        name="model" 
                        placeholder="Product Name"
                        value={model}
                        onChange={this.changehandler}></input>
                    </div>
                    <div>
                        <input type="text" 
                        name="cost" 
                        placeholder="Cost"
                        value={cost}
                        onChange={this.changehandler}></input>
                    </div>
                    <button type="submit">Submit</button>
                    {
                        this.state.isFormFilled ? 
                        <div>
                            <h2>Data successfully created!</h2>
                        </div> : null
                    }
                </form>
            </div>
        )
    }
}

export default postForm

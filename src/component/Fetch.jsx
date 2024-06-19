import { Component } from "react";

export default class Fetch extends Component{
    constructor(props){
        super(props)

        this.state=({data:[],error:'',isData:false})

    }

    componentDidMount(){
        fetch('https://renderhm.onrender.com/food_items/')
        .then((res)=>res.json())
        .then((json)=>{
            this.setState({data:json,isData:true})
            console.log(this.state.data);
        })
        .catch((error)=>{
           this.setState({error:error.message})
        })
    }

    setData = ()=>{
        window.location.reload();
        fetch("https://renderhm.onrender.com/food_items/", { 
      
          
            method: "POST", 
              
         
            body: JSON.stringify({ 
               
               food_name:"Ice Cream",
               quantity_half:3,
               quantity_full:4,
               menu_id:1
            }), 
              
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        }) 
    }

 

    render(){
        const {data,isData} = this.state;

        if(!isData){
            return <p>Keep WAITING......</p>
        }
        return(
            <>
            <button onClick={this.setData}>Click</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Half Quantity</th>
                        <th>Full Quantity</th>
                        <th>Food Name</th>
                        <th>Menu Id</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data && data.map((item,index)=>{
                            return <tr key={index+1}>
                                <td>{item.id}</td>
                                <td>{item.quantity_half}</td>
                                <td>{item.quantity_full}</td>
                                <td>{item.food_name}</td>
                                <td>{item.menu_id}</td>
                            </tr>
                        })
                    }
                </tbody>

            </table>
        
            
            </>
        )
    }
}
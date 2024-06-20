import { Component } from "react";

export default class FetchUi extends Component{
    constructor(props){
        super(props)

        this.state=({data:[],foodList:[],foodListToggle:false})
    }

    

    componentDidMount(){
        fetch('https://renderhm.onrender.com/menus')
        .then((res)=>res.json())
        .then((json)=>{
            // console.log(json)
            this.setState({data:json})
            console.log("menus",json);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

showFood=()=>{

if(this.state.foodListToggle){
    this.setState({foodListToggle:false})
}
else{
    this.setState({foodListToggle:true})
}   

        console.log("I am showFood")
        fetch('https://renderhm.onrender.com/food_items/')
        .then((res)=>res.json())
        .then((json)=>{
            console.log(json)
           this.setState({foodList:json})
        })
    }

    render(){

        const {data,foodList} = this.state;
        return(
            <>
            <hr />

            <div style={{width:'full',height:'full',backgroundColor:'yellowgreen',display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
                {
                    data && data.map((item,index)=>{
                        return <div  style={{flexDirection:'column',backgroundColor:"pink",height:"100px",width:"100px",display:"flex",justifyContent:'center',alignItems:"center"}}> 
                        <p>{item.menu_type}</p>

                        <button onClick={this.showFood}>Foods</button>

                        </div>
        
                    })
                } </div>

{   this.state.foodListToggle?    <div style={{backgroundColor:'yellow', height:'250px',width:'200px',overflow:'auto'}}>

                {
               this.state.foodListToggle? foodList && foodList.map((item,index)=>{
                    return <div key={index} style={{height:'full',width:'full',border:'2px solid black',margin:'5px',backgroundColor:'skyblue'}}>
                           <p>{item.id}</p>
                           <p>{item.food_name}</p>
                    </div>
                }) :<span></span>
                }
                </div> : <span></span>
    }
            
            
            </>
        )
    }
}
import { Component } from "react";

export default class Crud extends Component{
    constructor(props){
        super(props)
        this.state=({apiData:[],isApiPresent:false,setNewRoomForm:false,setNewRoomNum:'' ,check:0 })

    }

    componentDidMount(){

        fetch('https://renderhm.onrender.com/api/tables')
        .then((res)=>res.json())
        .then((json)=>this.setState({apiData:json,isApiPresent:true}   )) 
    }

    setNewRoomFun=()=>{
        if(!this.state.setNewRoomForm){
        this.setState({setNewRoomForm:true});
        }
        else{
            this.setState({setNewRoomForm:false})
        } 
    }

    roomFormCancel = ()=>{
        this.setState({setNewRoomForm:false})
    }

    roomFormSubmit =  ()=>{
        if(this.state.setNewRoomNum !== ''){

            fetch('https://renderhm.onrender.com/api/tables',{

                    method: "POST",
                    body: JSON.stringify({
                     number:this.state.setNewRoomNum
                    }),
            
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
            });
            this.setState({setNewRoomForm:false})
        }    
    }

    formSubmit=(id)=>{

        fetch(`https:renderhm.onrender.com/api/tables/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "number": this.state.check,   
            })
            
        })
    }

    formUpdate = (index)=>{
    const latestUpdate = this.state.apiData.map((item, itemIndex) => {
        if (itemIndex === index) {
          return ({ ...item, formInput:true })
        }
        return item;
      }
      )
  
      this.setState({ apiData: latestUpdate })
    }

    deleteRoom = (index)=>{
  
        fetch(`https://renderhm.onrender.com/api/tables/${index}`,{
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
    });
    }

    render(){

        const {isApiPresent,apiData,setNewRoomForm} = this.state;
        if(!isApiPresent){
            return <p style={{fontSize:'50px',textAlign:'center',fontWeight:'bold',height:'full',width:'full',display:"flex",justifyContent:'center',alignItems:'center',color:'red'}}>Keep Waiting .......</p>
        }

        return(
        <>
   {/* SEt new Room form start */}
{setNewRoomForm?
   <div style={{height:'300px',width:'400px',display:"flex",flexDirection:'column',border:'2px solid black',backgroundColor:'yellow',padding:'10px',justifyContent:'center',alignItems:'center',gap:'10px',position:"absolute",left:'700px',top:'300px'}}>
    <input type="number"  style={{width:'100%',height:'50px'} } onChange={(e)=> this.setState({setNewRoomNum:e.target.value})}/>
    <button style={{width:'250px',height:'40px',backgroundColor:'blue',color:'white',fontSize:'18px',borderRadius:'20px'}} onClick={this.roomFormSubmit}>Submit</button>
    <button style={{width:'250px',height:'40px',backgroundColor:'blue',color:'white',fontSize:'18px',borderRadius:'20px'}} onClick={this.roomFormCancel}>Cancel </button>

   </div>
   :<span></span> }
   {/* set new room form end */}

        <div style={{width:'full',display:'flex', justifyContent:'center',alignItems:'center',marginTop:'10px'}}>

        <button style={{textAlign:'center',width:'350px',height:'50px',fontSize:'20px',fontWeight:'bold',backgroundColor:'brown',color:'white',borderRadius:'30px'}} onClick={this.setNewRoomFun}>Add New Rooms 	&#xf35a;</button>
        </div>
        <div style={{height:'auto',width:"full",display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr', gridGap:'20px',marginTop:'20px',paddingLeft:'100px'}}>
            {
                apiData && apiData.map((item,index)=>{
                    return <div key={index} style={{width:"250px", height:'250px',backgroundColor:'skyblue',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',borderRadius:'30px',}}>

                        {/* <h1>{item.id}</h1> */}
                            <div style={{width:'full',height:'50%',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcmJDIHy-V4dy701mKL5eL2uPaWwOiDIawA&s" alt=""  style={{height:"100%",width:'100%',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'}}/></div>
                            
                            {
                                apiData[index].formInput ? <div style={{display:'flex',flexDirection:'column'}}>
                                    
                                     <input type="number"  onChange={(e)=>this.setState({check:e.target.value})} />
                                     <button style={{width: ''}} onClick={()=>this.formSubmit(apiData[index].id)}>Submit</button>

                                </div> : <div style={{display:'flex',flexDirection:'column'}}>
                                    
                                     <h1>{item.number}</h1>
                                     <button style={{width: ''}} onClick={()=> this.formUpdate(index)}>Update</button>

                                </div> 
                            }
                      
                            
                        <div style={{width:'full',display:'flex',height:'30px',gap:'5px'}}>
                           
                            <button style={{width:''}} onClick={()=>this.deleteRoom(apiData[index].id)}>Delete</button>
                        </div>
                        {/* <h1>{item.bookingstatus}</h1> */}

                    </div>
                })

            }
        </div>
        </>
        )
    }
}
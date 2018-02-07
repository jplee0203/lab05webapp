import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            myImg:require("./images/robot.png"),
            myImg2:require("./images/robot1.png"),
            allusers:[],
            myId:null
        }
        this.handleImage = this.handleImage.bind(this);
    }
    
    componentDidMount(){
        
        this.socket=mySocket("https://git.heroku.com/lab05socket.git");
        this.socket.on("userjoined", (data)=>{
           this.setState({allusers:data
                         }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            })
        })
        this.socket.on("newmove", (data)=>{
           this.refs["u"+data.id].style.left = data.x + "px";
           this.refs["u"+data.id].style.top = data.y +"px";
        });
        
        
        this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myId === null){
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX + "px";                                    
            this.refs["u"+this.state.myId].style.top = ev.pageY + "px"; 
//            this.refs["u"+data.id].src = data.src;
            
            this.socket.emit("mymove", {
                x:ev.pageX+"px",
                y:ev.pageY+"px",
                id:this.state.myId,
                src:this.refs["u"+this.state.myId].src
            })
        });
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;
    }
    
  render() {
      
      var allimgs = this.state.allusers.map((obj,i)=>{
          return(
            <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i}/>
          )
      });
      
    return (
      <div className="App">

        <div ref="thedisplay" className="display">
            {allimgs}
           
        </div>
        
        <div className="control">
            {this.state.myId}
                <img ref="myImg" id="myImg" src={this.state.myImg} height={50} onClick={this.handleImage}/>
                <img ref="myImg2" id="myImg2" src={this.state.myImg2} height={50} onClick={this.handleImage}/>
        </div>
        
        
      </div>
    );
  }
}

export default App;

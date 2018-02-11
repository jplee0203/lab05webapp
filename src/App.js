import React, { Component } from 'react';
import './App.css';
import mySocket from "socket.io-client";

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            myImg: require("./img/img1.png"),
            myImg2: require("./img/img2.png"), 
            allUsers:[],
            myId: null,
            countUser:0        }
        
        this.handleImage = this.handleImage.bind(this);
        this.mouseHoverWin = this.mouseHoverWin.bind(this);
        this.mouseHoverEnd = this.mouseHoverEnd.bind(this);
        this.hoverStart = this.hoverStart.bind(this);
    }
    /* Start */
    mouseHoverEnd(){
   
       document.getElementById("App").removeChild(document.getElementById("display"));
      alert('Try Again');
        
    }
    /* End */
    mouseHoverWin(){
   
     alert('You WIN!');
    
    }
    
    componentDidMount(){
        this.socket = mySocket("https://lab05socket.herokuapp.com/");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allUsers: data
            }); 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId: data
            });
        });
        
        this.socket.on("newmove", (data)=>{
            this.refs["u"+data.id].style.left = data.x+"px"; 
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
        });
        
        this.refs.theDisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myId === null){
                //FAIL
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
            
            
            this.socket.emit("mymove", {
                x: ev.pageX,
                y: ev.pageY,
                id: this.state.myId,
                src: this.refs["u"+this.state.myId].src
            });
        });       
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;  
        document.getElementById("controls").removeChild(document.getElementById("selections"));
        document.getElementById("hoverStart").style.display = "block";
    
//          document.getElementById("App").removeChild(document.getElementById("controls"));  
        
//            this.state.countUser++;
//        if(this.state.countUser === this.state.allUsers.length){
//        }
//         console.log(this.state.countUser);
//            console.log("arr: "this.state.allUsers.length);
//            
    }
    
    hoverStart(){
    
    document.getElementById("App").removeChild(document.getElementById("controls"));  
        
    }
    

    
    render() {
   
        var allimgs = this.state.allUsers.map((obj, i)=>{
            return(
                <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i} />   
            );
        });
        
        return (
            <div className="App" id="App">
       
               <div ref="theDisplay" id="display">
                    <div onMouseOver={this.mouseHoverEnd} id="divBody"></div>
                    <div id="div1" className="maze"></div>
                    <div id="div2" className="maze"></div>
                    <div id="div3" className="maze"></div>
                    <div id="div4" className="maze"></div>
                    <div id="div5" className="maze"></div>
                    <div id="div6" className="maze"></div>
                    <div id="div7" className="maze"></div>
                    <div id="div8" className="maze"></div>
                    <div id="div9" className="maze"></div>
                    <div id="div10" className="maze"></div>
                    <div id="div11" className="maze"></div>
                    <div id="div12" className="maze"></div>
                    <div id="div13" className="maze"></div>
                    <div id="div14" className="maze"></div>
                    <div id="div15" className="maze"></div>
                    <div id="div16" className="maze"></div>
                    <div id="div17" className="maze"></div>
                    <div id="div18" className="maze"></div>
                    <div id="div18" className="maze"></div>
                    <div id="div19" className="maze"></div>
                    <div id="div20" className="maze"></div>
                    <div id="div21" className="maze"></div>
                    <div id="div22" className="maze"></div>
                    <div id="div23" className="maze"></div>
                    <div id="div24" className="maze"></div>
                    <div id="div25" className="maze"></div>
                    <div id="div26" className="maze"></div>
                    <div id="div27" className="maze"></div>
                    <div id="div28" className="maze"></div>
                    <div id="div29" className="maze"></div>
                    <div id="div30" className="maze"></div>
                    <div id="divEnd" onMouseOver={this.mouseHoverWin} className="maze"></div>

            
             
                    {allimgs}
                </div>
          
                <div id="controls">
                    <div className="hoverStart" id="hoverStart" onMouseOver={this.hoverStart}>Hover here to get READY</div>
                    <div className="selections" id="selections">

                    <img src={this.state.myImg} className="img1" height={100} onClick={this.handleImage} />
                    <img src={this.state.myImg2} className="img2" height={80} onClick={this.handleImage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

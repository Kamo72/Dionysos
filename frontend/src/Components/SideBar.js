import React from "react";
import "./SideBar.css"
import testIcon from "../Resources/magnifier.png"

class SideBar extends React.Component
{   
    render()
    {
        return (
        <div className={this.props.isOpened? "SideBar Open" : "SideBar"}>
            <SideBarUnit name={"Home"} direction={""} icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"Home"} direction={""} icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"Home"} direction={""} icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"Home"} direction={""} icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"Home"} direction={""} icon={testIcon}></SideBarUnit>
        </div>
        );
    }
}



class SideBarUnit extends React.Component
{
    state = 
    {
        mouseOn : false,
    }

    render()
    {
        return (<div
            onMouseEnter={ ()=>{ this.setState({ mouseOn : true}) }}
            onMouseLeave={ ()=>{ this.setState({ mouseOn : false}) }}
            style={{
                display: "flex",
                width: "100%",
                height : "25px",
                margin : "2px",
                alignItems : "center",
                margin : "5px",
            }}>
            <img style={{
                    margin : "5px",
                    height: "25px",
                    filter: "invert()",
                }}
                src={this.props.icon}></img>
            <p style={{
                    color : "white",
                }}
                onClick={()=>{ window.location.replace(`${window.location.origin}/${this.props.direction}`) }}
            >{this.props.name}</p>
        </div>)
    }
}

export default SideBar;



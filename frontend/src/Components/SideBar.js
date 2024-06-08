import React from "react";
import "./SideBar.css"
import testIcon from "../Resources/magnifier.png"
import { CookieLibrary } from "../Library";

class SideBar extends React.Component
{   
    render()
    {
        return (
        <div className={this.props.isOpened? "SideBar Open" : "SideBar"}>
            <SideBarUnit name={"Home"} direction={""} icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"MyChannel"} direction={
                new CookieLibrary().GetCookieUserId() == null? 'signin' :
                `channel/${new CookieLibrary().GetCookieUserId()}`
                } icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"Upload"} direction={
                new CookieLibrary().GetCookieUserId() == null? 'signin' :
                "upload"
                } icon={testIcon}></SideBarUnit>
            <SideBarUnit name={"AboutMe"} direction={""} icon={testIcon}></SideBarUnit>
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
            onClick={()=>{ window.location.replace(
                this.props.name == "AboutMe"? 
                "https://github.com/Kamo72" : 
                `${window.location.origin}/${this.props.direction}`
            ) }}
            style={{
                display: "flex",
                width: "94%",
                height : "25px",
                margin : "3%",
                alignItems : "center",
                margin : "5px",
                backgroundColor: this.state.mouseOn? "rgb(120, 120, 120)" :  "rgb(70, 70, 70)",
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
            >{this.props.name}</p>
        </div>)
    }
}

export default SideBar;



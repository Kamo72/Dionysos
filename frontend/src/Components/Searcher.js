import React from "react";
import "./Searcher.css"
import magnifier from "../Resources/magnifier.png"

class Searcher extends React.Component
{   
    state = 
    {
        isFocusedTextbox : false,
        isHighlightButton : false,
        isFocusedButton : false,

        searchString : ""
    }

    render()
    {
        return (<div className = "Searcher">
            <input className="TextBox"
                type="text"
                placeholder={"Let me search videos for you!"}
                onFocus={()=>{this.setState(current => {return { isFocusedTextbox : true}} )}}
                onBlur={()=>{this.setState(current => {return { isFocusedTextbox : false}} )}}
                onChange={event => {this.setState(current => { return { searchString : event.target.value}} )}}
                style={{
                    outlineColor : this.state.isFocusedTextbox? "#006eff" : "#34343f",
                }}
                value={this.state.searchString}
                ></input>
            <button className="ConfirmBtn"
                onFocus={()=>{this.setState(current => {return { isFocusedButton : true}} )}}
                onBlur={()=>{this.setState(current => {return { isFocusedButton : false}} )}}
                onMouseEnter={()=>{this.setState(current => {return { isHighlightButton : true}} )}}
                onMouseLeave={()=>{this.setState(current => {return { isHighlightButton : false}} )}}
                onClick={()=> {  window.location.replace('/search/' + this.state.searchString) }}
                style={{
                    outlineColor : this.state.isFocusedButton? "#006eff" : "#34343f",
                    backgroundColor : this.state.isHighlightButton? "#94949f" : "#34343f",
                }}
                >
                <img className='ConfirmIcon'
                    src = {magnifier}></img>
            </button>
        </div>)
    }

}

export default Searcher;
import React from 'react';
import "../Page.css"
import "./MainPage.css"
import Card from "../../Components/Card"

class MainPage extends React.Component
{
    constructor(props)
    {
        super(props)

        const handleResize = () => {
            this.setState(
                current => ({windowSize : [window.innerWidth, window.innerHeight]}) 
            )
        }
        window.addEventListener("resize", handleResize);
        
    }


    state = {
        windowSize : [window.innerWidth, window.innerHeight]
    };


	render() 
	{
        const margin = 30
        const sizeMin = 300
        const columnCount =  Math.floor(window.innerWidth/sizeMin);
        const thumbWidth = ((window.innerWidth - margin * 2) / columnCount);
        const thumbHeight = Math.floor(thumbWidth * 0.8);

		return (<div className='MainPage'
                style = {{
                    gridTemplateColumns : "repeat(" + columnCount +", " + thumbWidth + "px)",
                    gridTemplateRows : "repeat(" + 10  +", " + thumbHeight +"px)",
                }}
            >
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
            <Card videoCode = "" width = {thumbWidth} height = {thumbHeight}></Card>
        </div>);
	}
}

export default MainPage;
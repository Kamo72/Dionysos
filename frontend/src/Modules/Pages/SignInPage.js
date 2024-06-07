
import React from 'react';
import "./SignInPage.css"
import magnifier from "../../Resources/magnifier.png"
import { serverRoot } from '../../App';

class SignInPage extends React.Component
{
    PostSignin= async () =>
    {
        const postData = {
            idLogin : this.state.idLogin,
            password : this.state.password,
        }

        const response = await(
            //요청
            await fetch(serverRoot + "/api/signin", {
                method: "POST", // 또는 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
        );

        response.json().then(error => {
            console.log(error.message); // 서버에서 전달한 오류 메시지를 throw
            alert(error.message);
        });

        if(response.status == 200)
        {
            alert("로그인을 성공했습니다.");
            window.location.replace(`${window.location.origin}/`)
        }
    }

    state = 
    {
        idLogin : "",
        password : "",

        isHighlightButton : false,
        isFocusedButton : false,

        
        isHighlightSignup : false,
    }

    render(){
    
        return (<div className='SignInPage'>
            <div className='Wellcome'>
                <p className = "Announce">
                    Login
                </p>
            </div>
            <div className='Interface'>
                
                <div className='InputLine'>
                    <p className='InputName'>ID</p>
                    <input className='InputBox'
                        type="text"
                        placeholder={"Insert your id"}
                        onChange={e => this.setState(()=>{return {idLogin : e.target.value}})}
                    ></input>
                </div>

                <div className='InputLine'>
                    <p className='InputName'>PW</p>
                    <input className='InputBox'
                        type="password"
                        placeholder={"Insert your pw"}
                        onChange={e => this.setState(()=>{return {password : e.target.value}})}
                    ></input>
                </div>
                
            </div>
            <br/>
            <div className='Confirm'>

            <button className="SignupConfirmBtn"
                onFocus={()=>{this.setState(current => {return { isFocusedButton : true}} )}}
                onBlur={()=>{this.setState(current => {return { isFocusedButton : false}} )}}
                onMouseEnter={()=>{this.setState(current => {return { isHighlightButton : true}} )}}
                onMouseLeave={()=>{this.setState(current => {return { isHighlightButton : false}} )}}
                onClick={async ()=> {  this.PostSignin() }}
                style={{
                    outlineColor : this.state.isFocusedButton? "#006eff" : "#34343f",
                    backgroundColor : this.state.isHighlightButton? "#94949f" : "#34343f",
                }}
                >
                <p style={{ marginLeft:"5px", marginRight:"5px"}}>Confirm</p>
                <img className='ConfirmIcon'
                    src = {magnifier}></img>
            </button>
            </div>
            <div className='SignInAdvise'>
                <p 
                    onMouseEnter={()=>{this.setState(current => {return { isHighlightSignup : true}} )}}
                    onMouseLeave={()=>{this.setState(current => {return { isHighlightSignup : false}} )}}
                    onClick={()=>{
                        window.location.replace(`${window.location.origin}/signup`)
                    }}
                    style={{
                        color: this.state.isHighlightSignup? "lightblue":"white",
                    }}>
                haven't you any account? click here to <b>SIGNUP!</b></p>
            </div>
        </div>)
    }

}


export default SignInPage

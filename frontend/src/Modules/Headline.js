import React from 'react';
import "./Headline.css"
import Searcher from '../Components/Searcher';
import testIcon from '../Resources/magnifier.png'
import { ApiLibrary, CookieLibrary } from '../Library';
import { serverRoot, webRoot } from '../App';
import "../Components/Searcher.css";

class Headline extends React.Component 
{

	state={
		chImg : "---",
		chName : "aksda",

	}

	render() 
	{
		return (<header className='Headline'>
			<div className="SideIcon"
					style={{
						height: "10%",
						margin : "4px",
						marginRight : "300px",
					}}>
				<img 
					style={{
						height: "50px",
						filter: "invert()",
					}}	
					src = {testIcon}
					onClick={()=>{this.props.toggleFunc()}}></img>
			</div>
			<div>
				<i className="Logo"
					onClick={()=>{window.location.replace(`${window.location.origin}/`)}}
					>Dionysos</i>
				<Searcher></Searcher>
			</div>
			<UploadButton></UploadButton>
			<AccountCard
					chImg={this.state.chImg}
					chName={this.state.chName}></AccountCard>
		</header>);
	}
}

class AccountCard extends React.Component
{
	componentDidMount()
	{
		this.requestData();
	}

	requestData = async () => 
	{
		const cLib = new CookieLibrary();
		const userId = cLib.GetCookieUserId()

		this.setState(cur=>{return {userId : userId}})

		if(userId == null) return;
		
		const aLib = new ApiLibrary();
		const data = aLib.GetProfileBasic(userId);

		data.then(e=>{

			this.setState(cur=>{return {userImg : e.userImg}})
			this.setState(cur=>{return {userName : e.userName}})
		})
	}

	state={
		userId : null,
		userImg : "---",
		userName : "---",

		isHighlightSignin : false,
	}

    PostSignout = async () =>
	{
		const response = await(
			//요청
			await fetch(serverRoot + "/api/signout", {
				method: "POST", // 또는 'PUT'
			})
		);

		response.json().then(error => {
			console.log(error.message); // 서버에서 전달한 오류 메시지를 throw
			alert(error.message);
		});

		if(response.status == 200)
		{
			alert("로그아웃을 성공했습니다.");
			window.location.reload();
		}
	}

	render()
	{
		return this.state.userId == null? (
			<p 
				onMouseEnter={()=>{this.setState(current => {return { isHighlightSignin : true}} )}}
				onMouseLeave={()=>{this.setState(current => {return { isHighlightSignin : false}} )}}
				onClick={()=>{
					window.location.replace(`${window.location.origin}/signin`)
				}}
				style={{
					color: this.state.isHighlightSignin? "lightblue":"white",
					marginRight : "20px",
					fontSize : "20px",
				}}>
				<b>SIGNIN</b>
			</p>
		):(
			<div className="AccountCard"
			
			style={{
				display : "flex",
				alignItems : "center",
				textAlign : "left",
				width : "165px",
			}}>
				<img className='ChannelIcon'
					onClick={()=>{
						window.location.replace(`${window.location.origin}/channel/${this.state.userId}`)
					}}
					onError={e=>{
						e.target.onError = null; // 무한 루프를 방지하기 위해 onerror 핸들러를 제거
						e.target.src = "https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg"; // 대체 이미지로 변경
					}}
					src={`${serverRoot}/api/chImg/${this.state.userImg}`}>
				</img>
				<div style={{
						width : "120px",
					}}>
					<p style={{
							color:"white",
							fontSize : "20px",
							margin : "0",
						}}
						onClick={()=>{
							window.location.replace(`${window.location.origin}/profile/${this.state.userId}`)
						}}>
						{this.state.userName}</p>
					<p style={{
						color: this.state.isHighlightSignin? "lightblue":"white",
						marginRight : "4px",
						fontSize : "10px",
					}}
						onMouseEnter={()=>{this.setState(current => {return { isHighlightSignin : true}} )}}
						onMouseLeave={()=>{this.setState(current => {return { isHighlightSignin : false}} )}}
						onClick={()=>{ this.PostSignout() }}>
						<b>SIGNOUT</b>
					</p>
				</div>
			</div>
		)
		
	}

}

class UploadButton extends React.Component
{
	state={
		isHighlight : false,
	}

	render()
	{
		return (
			<div className="AccountDiv"
				onMouseEnter={()=>{this.setState(current => {return { isHighlightSignin : true}} )}}
				onMouseLeave={()=>{this.setState(current => {return { isHighlightSignin : false}} )}}
				onClick={()=> {window.location.replace(`${webRoot}/upload`)}}>
			{( this.state.chName == "---" )?
			<div></div> : <div>
				<img 
					style= {{
						height : "50px",
						filter: "invert()",
					}}
					src = "https://cdn-icons-png.flaticon.com/512/126/126477.png"></img>
			</div>
			}
		</div>)
	}

}
export default Headline;

import { serverRoot } from "./App";


export class ApiLibrary{

    GetThumbData = async (videoCode) => {
        
        let json = await (
            await fetch(`${serverRoot}/api/video/thumb/${videoCode}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
    GetViewData = async (videoCode) => {
        console.log("requesting GetViewData as " + videoCode);
        let json = await (
            await fetch(`${serverRoot}/api/video/view/${videoCode}`)
            // await fetch(`${window.location.origin}/api/video/thumb/${videoCode}`)
        ).json();

        return json
    };
}



export class CookieLibrary{
    getCookieValue = (name) => {
        // document.cookie 문자열에서 각 쿠키를 세미콜론으로 분리
        const cookies = document.cookie.split(';');
        
        // 각 쿠키를 순회하며 원하는 쿠키를 찾음
        for (let cookie of cookies) {
            // 쿠키 앞뒤의 공백을 제거
            cookie = cookie.trim();
            
            // 쿠키 이름과 값으로 분리
            const [cookieName, cookieValue] = cookie.split('=');
            
            // 원하는 쿠키 이름과 일치하면 값을 반환
            if (cookieName === name) {
                return cookieValue;
            }
        }
        
        // 원하는 쿠키를 찾지 못했을 경우 null 반환
        return null;
    }

}
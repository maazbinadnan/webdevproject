export function GetToken(){
    const token = localStorage.getItem('token')
    if(token !== null){
        return token
    }else{
        return null
    }
}

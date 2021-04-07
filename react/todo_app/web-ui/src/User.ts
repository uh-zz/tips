import { ajax } from "rxjs/ajax"
import { first } from "rxjs/operators"

export default class User{
    id?:number
    userName?:string

    constructor(id?:number,userName?:string,sessionId?:string){
        this.id = id
        this.userName = userName
    }

    create = (userName:string,password:string,callbackFunc:(user:User)=>void)=>{
        let data$ = ajax({
            url: '/user/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                userName:userName,
                password:password,
            }
        }).pipe(
            first(),
        )

        let subsc = data$.subscribe({
            next:responce => {
                this.id = responce.response.id
                this.userName = responce.response.userName
                console.log("CREATE USER",this)
                callbackFunc(this)
            },
            error:err=> {throw new Error('Can\' execute callback function!')},
            complete: ()=>{subsc.unsubscribe()}
        })
    }

}
import { User } from './User'

/**
 * @classdesc Todo.
 */
export class Todo{
    id?:number
    order?:number // order to display
    user:User
    title:string  // What's to do
    startAt:Date  // When should user start todo
    deadline:Date // deadline
    category:string
    importance:string
    detail:string
    status:"Completed"|"Incompleted"
    constructor(
        user:User,
        title:string,
        startAt:Date,
        deadline:Date,
        category:string,
        importance?:string,
        detail?:string,
        status?:"Completed"|"Incompleted"
        ){
        this.user = user
        this.title = title
        this.startAt = startAt
        this.deadline = deadline
        this.category = category
        this.importance = importance?importance:"normal"
        this.detail = detail?detail:""
        if(status){
            this.status = status
        }else{
            this.status = "Incompleted"
        }
    }
    /**
     * @description 
     * Id is number|undefined. 
     * So you should use this method to make it number.
     */
    setId = (id:number)=>{
        this.id = id
    }
    /**
     * @description 
     * Order is number|undefined. 
     * So you should use this method to make it number.
     */
    setOrder = (order:number) =>{
        this.order = order
    }
}
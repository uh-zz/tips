class Todo{
    id?:number
    event?:string
    deadline?:Date
    constructor(event?:string,deadline?:Date,id?:number){
        this.event = event
        this.deadline = deadline
        this.id=id
    }
}

export default Todo
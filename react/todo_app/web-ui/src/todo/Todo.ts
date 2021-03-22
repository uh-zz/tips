class Todo{
    id?:number
    event?:string
    deadline?:Date
    constructor(event?:string,deadline?:Date){
        this.event = event
        this.deadline = deadline
    }
}

export default Todo
import { Action, createSlice, ThunkDispatch } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state =>{
            state.value += 1
        },
        decrement: state =>{
            state.value -= 1
        },
        incrementByAmount: (state,action) =>{
            state.value += action.payload
        },
    }
})

export const { increment, decrement, incrementByAmount } = slice.actions
export const incrementAsync = (amount:number) => (
    (dispatch:ThunkDispatch< number,number,Action<any> > )=>{
        setTimeout(()=>{
            dispatch(incrementByAmount(amount))
        },1000)
    }
)
export default slice.reducer

export const selectCount = (state:{counter:{value:number}}) => state.counter.value
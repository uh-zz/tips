import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, thunkApi) => {
        try{
            console.log("State of notifications: ",thunkApi.getState())
            const allNotifications = selectAllNotifications(thunkApi.getState())
            const [latestNotification] = allNotifications
            const latestTimestamp = latestNotification ? latestNotification.date : ''
            const response = await client.get(
                `/fakeApi/notifications?since=${latestTimestamp}`
                )
                console.log("Notifications Response: ",response)
            return response.notifications
        }catch(err){
            console.error("Fetch notifications failed: ",err)
        }
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState:notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead: (state, action) => {
            Object.values(state.entities).forEach(notification =>{
                notification.read = true
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            Object.values(state.entities).forEach( notification => {
                notification.isNew = !notification.read
            })
            notificationsAdapter.upsertMany(state, action.payload)
        }
    }
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions
// export const selectAllNotifications = state => state.notifications
export const {
    selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)
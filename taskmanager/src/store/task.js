import { createSlice } from '@reduxjs/toolkit';

const initialtaskState = { modalstate : "addtask" };

const taskSlice = createSlice({
  name: 'task',
  initialState: initialtaskState,
  reducers: {
    changetoeditmode(state){
      state.modalstate = 'edittask'
    },
    changetoaddmode(state){
      state.modalstate = 'addtask'
    },
    changetodeletemode(state){
      state.modalstate = 'deletetask'
    }
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;
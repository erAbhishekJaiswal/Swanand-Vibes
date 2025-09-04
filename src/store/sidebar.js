import { createSlice } from '@reduxjs/toolkit';

// Initial cart state
const initialState = {
    isOpen: false,
};

// Redux slice to manage cart state
const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
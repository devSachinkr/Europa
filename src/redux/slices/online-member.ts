/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
    members: {
        id: string;
    }[];
};

const InitialState: InitialStateProps = {
    members: [],
};

export const OnlineTracking = createSlice({
    name: "online",
    initialState: InitialState,
    reducers: {
        onOnline: (state, action: PayloadAction<InitialStateProps>) => {
            const list = state.members.find((data: any) =>
                action.payload.members.find(
                    (member: any) => member.id === data.id,
                ),
            );
            if (!list) {
                state.members = [...state.members, ...action.payload.members];
            }
        },

        onoffline: (state, action: PayloadAction<InitialStateProps>) => {
            state.members = state.members.filter((member) =>
                action.payload.members.find((m) => m.id !== member.id),
            );
        },
    },
});

export const { onOnline, onoffline } = OnlineTracking.actions;

export default OnlineTracking.reducer;

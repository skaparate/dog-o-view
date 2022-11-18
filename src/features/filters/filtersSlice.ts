import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Breed} from "../../types";

export interface BreedsFilter {
    data: Breed[],
    active: string[],
}

export interface BreedsFilterState {
    data: Breed[]
}

const initialState: BreedsFilterState = {
    data: []
}

export const filtersSlice = createSlice({
    name: 'breedsFilter',
    initialState,
    reducers: {
        applyFilters: (state, action: PayloadAction<BreedsFilter>) => {
            const {active} = action.payload;

            if (active.length === 0) {
                state.data = action.payload.data;
            } else {
                state.data = action.payload.data.filter(breed => {
                    return active.some(filter => {
                        const split = filter.split('/')

                        if (split.length === 2) {
                            const isSub = breed.children.find(sub => sub === split[1])
                            return isSub !== undefined
                        }

                        return breed.name === split[0]
                    });
                });
            }
        },
    },
});

export const {applyFilters} = filtersSlice.actions;

export default filtersSlice.reducer;

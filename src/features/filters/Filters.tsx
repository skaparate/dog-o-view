import "./filters.css"
import {Breed} from "../../types";
import React, {useState} from "react";
import {Checkbox, List, ListItemButton, ListItemText, Stack, TextField} from "@mui/material";
import {useAppDispatch} from "../../app/hooks";
import Collapse from "@mui/material/Collapse";
import {applyFilters} from "./filtersSlice";

function recursiveList(data: Breed[], activeFilters: string[], clickHandler: Function, parent?: string) {
    return (
        <List component={parent ? "nav" : "div"} sx={{width: "100%"}} disablePadding={parent !== undefined}>
            {data.map((i, index) => {
                let subGroup = null;

                if (i.children.length > 0) {
                    subGroup = (
                        <Collapse in={true} unmountOnExit>
                            {
                                recursiveList(i.children.map(x => ({
                                    name: x,
                                    children: []
                                })), activeFilters, clickHandler, i.name)
                            }
                        </Collapse>
                    );
                }

                const value = parent ? `${parent}/${i.name}` : i.name;
                const labelId = 'filter-item-' + index;

                return (
                    <div key={'filter-' + index} className={parent !== undefined ? 'sub-breed' : ''}>
                        <ListItemButton onClick={() => clickHandler(value)}>
                            <Checkbox
                                checked={activeFilters.find(i => i === value) !== undefined}
                                edge="start"
                                disableRipple
                            />
                            <ListItemText id={labelId} primary={`${i.name}`}/>
                        </ListItemButton>
                        {subGroup}
                    </div>
                )
            })}
        </List>
    )
}

export default function Filters({breeds}: { breeds: Breed[] }) {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [search, setSearch] = useState<Breed[]>(breeds);
    const dispatch = useAppDispatch();

    const handleAddFilter = (value: string) => {
        const found = activeFilters.indexOf(value);
        const newFilters = [...activeFilters];

        if (found < 0) {
            newFilters.push(value);
        } else {
            newFilters.splice(found, 1);
        }

        dispatch(applyFilters({
            data: breeds,
            active: newFilters
        }))
        setActiveFilters(newFilters);
        window.scrollTo({top: 0})
    }

    const handleSearch = (value: string) => {
        if (!value) {
            setSearch(breeds);
            return;
        }

        const searchText = value.toLowerCase();
        const newSearch = breeds.filter(i => {
            return i.name.indexOf(searchText) > -1 || i.children.some(x => x.indexOf(searchText) > -1);
        });

        setSearch(newSearch);
    }

    return (
        <Stack maxHeight={500}>
            <TextField id="filter-search" label="Buscar" type="search" variant="standard"
                       onChange={(e) => handleSearch(e.target.value)}/>
            {recursiveList(search, activeFilters, handleAddFilter)}
        </Stack>
    )
}

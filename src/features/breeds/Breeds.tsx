import BreedItem from "./BreedItem";
import {Masonry} from "@mui/lab";
import {Breed} from "../../types";

export default function Breeds({breeds}: { breeds: Breed[] }) {
    if (breeds === undefined) {
        return null;
    }

    return (
        <Masonry columns={{
            xs: 1,
            md: 2,
        }} spacing={2}>
            {breeds.map((i, index) => (<BreedItem key={`breed-item-${index}`} breed={i}/>))}
        </Masonry>
    );
}

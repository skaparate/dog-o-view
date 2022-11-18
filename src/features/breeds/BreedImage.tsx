import {useGetRandomImageQuery} from "./breedsApi";
import {Skeleton} from "@mui/material";

export default function BreedImage({breed}: { breed: string }) {
    const {data, isLoading} = useGetRandomImageQuery(breed);

    if (isLoading) {
        return (
            <Skeleton width={150} height={250} variant="rectangular"/>
        )
    }

    return (
        <img src={data}
             srcSet={data}
             alt="Imagen de la raza"
             loading="lazy" height={250}/>
    );
}

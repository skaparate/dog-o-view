import {ImageList, ImageListItem} from "@mui/material";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import BreedImage from "./BreedImage";

export default function BreedImages({list}: {
    list: Array<{
        name: string,
        url: string,
    }>
}) {
    return (
        <ImageList cols={1}>
            {list.map((item, index) => (
                <ImageListItem key={'breed-image-item-' + index}>
                    <BreedImage breed={item.url}/>
                    <ImageListItemBar
                        title={item.name}
                        actionIcon={
                            <IconButton
                                sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                aria-label={`info about ${item.name}`}
                            >
                                <InfoIcon/>
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

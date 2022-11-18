import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BreedImages from "./BreedImages";
import BreedImage from "./BreedImage";
import {useState} from "react";
import {Breed as BreedType} from "../../types";
import {Typography} from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function BreedItem({breed}: { breed: BreedType }) {
    const [isExpanded, setIsExpanded] = useState(false);
    let children = null

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    }

    if (breed.children.length > 0) {
        children = (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <BreedImages list={breed.children.map((x) => ({name: x, url: `${breed.name}/${x}`}))}/>
                </CardContent>
            </Collapse>
        )
    }

    return (
        <Card className="breed-item">
            <CardHeader title={breed.name}></CardHeader>
            <CardMedia>
                <BreedImage breed={breed.name}/>
            </CardMedia>
            <CardActions disableSpacing>
                {children != null ?
                    <Typography>
                        Mostrar razas derivadas
                    </Typography>
                    : null}
                {children != null ? <ExpandMore
                    expand={!isExpanded}
                    onClick={handleExpandClick}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore> : null}
            </CardActions>
            {children}
        </Card>
    )
}

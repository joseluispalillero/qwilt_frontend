import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add"
import { Search as SearchIcon } from "react-feather";
import {useNavigate} from "react-router-dom";

const PropertiesListToolbar = (props) => {
    const navigate = useNavigate();

    return (
        <Box {...props}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}>
                <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={()=>{ navigate("add")}} >
                    Add property
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon fontSize="small" color="action">
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search properties"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default PropertiesListToolbar;
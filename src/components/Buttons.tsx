import { styled } from "@mui/system";


// Submit button to be compatible with forms
export const Submit = styled("input")(({theme}) => ({
    background: theme.palette.white,
    color: theme.palette.primary,
    padding: theme.spacing(),
    border: `1px solid ${theme.palette.primary}`,
    borderRadius: theme.shape.borderRadius,
    transition: "all .3s ease",
    cursor: "pointer",
    "&:hover": {
        background: theme.palette.primary,
        color: theme.palette.white
    },
    "&:disabled": {
        background: theme.palette.white,
    color: theme.palette.primary,
        cursor: "not-allowed"
    }
}))
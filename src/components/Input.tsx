import { styled } from "@mui/system";


type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> 
const InputWrapper = styled("div")(({theme}) => ({
    border: `1px solid ${theme.palette.primary}`,
    borderRadius: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.spacing(0.5),
    flex: 1,
    "> label": {
        color: theme.palette.primary,
        fontWeight: 600
    }
}))

const ActualInput = styled("input")(({theme}) => ({
    outline: "none",
    border: "none",
    flex: 1,
    textAlign: "right"
}))


// somewhat nicer input to be used in forms (no time to make it fancier ahah)
export const Input: React.FC<InputProps & {label: string}> = ({label, ...props}) => {
    return (
        <InputWrapper>
            <label>{label}</label>
            <ActualInput {...props} />
        </InputWrapper>
    );
}
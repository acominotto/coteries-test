import { styled } from "@mui/system";
import { desktop } from "./mediaQueries";

export type ModalProps = {
    visible: boolean,
    onClose: () => any,
    children: React.ReactNode
}

const Backdrop = styled("div")(({theme}) => ({
  position: "fixed",
  top: 0, right: 0, bottom: 0, left: 0,
  background: "black",
  opacity: 0.3,
  zIndex: 1
}))

const ModalWindow = styled("div")(({theme}) => ({
  position: "absolute",
  margin: "auto",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(6),
  background: "white",
  boxShadow: `3px 3px ${theme.palette.primary}`,
  zIndex: 2,
  width: 300,
  left: `calc(50% - ${150 + 16}px)`, // as padding is added to width, we need to remove the 2 spacings to be centered
  borderRadius: 5,
  [desktop]: {
    width: 1024,
    left: `calc(50% - ${512 + 16}px)`,
  }
}))

const CloseButton = styled("button")(({theme}) => ({
    position: "absolute",
    right: theme.spacing(), top: theme.spacing(),
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 24,
    color: theme.palette.primary,
    "&:hover" : {
        fontWeight: "bold"
    }
}))


// Simple modal display with close button and backdrop close
export const Modal: React.FC<ModalProps> = ({visible, children, onClose}) => {
    if(!visible) return null;
    return (<>
        <Backdrop onClick={e => onClose()} />
        <ModalWindow>
            <CloseButton onClick={onClose}>x</CloseButton>
            {children}
        </ModalWindow>
    </>);
}
import { Box, styled } from "@mui/system";
import { useMemo, useState } from "react";
import { Developer } from "../apis";
import { desktop, Input, Modal, ModalProps, Submit } from "../components";

// just a wrapper to have access to sx
const Span = styled("span")(({theme}) => ({

}))

const Avatar = styled("img")(({theme}) => ({
    height: 100,
    borderRadius: 10,
    objectFit: "fill"
}))

const Picture = styled("img")(({theme}) => ({
    borderRadius: 10,
    objectFit: "fill",
    float: "left",
    width: 200,
    margin: theme.spacing(),
    [desktop]: {
        width: 450
    }
}))

const ListItem = styled("li")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(),
    padding: theme.spacing(),
    fontSize: 16,
    margin: 16,
    cursor: "pointer",
    transition: "all .3s ease",
    border: `1px solid ${theme.palette.white}`,
    borderRadius: 5,
    "&:hover": {
        border: `1px solid ${theme.palette.primary}`
    },
    [desktop]: {
        fontSize: 32,
        marginTop: 32
    }
}))

// Developer list Item to display a developer inside of the main list
export const DevListItem: React.FC<{developer: Developer, onClick: () => any}> = ({developer, onClick}) => {
    return <ListItem onClick={onClick}>
        <Avatar src={developer.picture} alt={`${developer.name}'s avatar `}/>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Span sx={{fontWeight: 600}}>{developer.name}</Span>
            <Span sx={{color: "gray", fontSize: 16}}>{developer.description}</Span>
            <Span sx={{color: "gray", fontSize: 16}}>{developer.hired ? "Hired" : "Not in the company"}</Span>
        </Box>
    </ListItem>
}


// Developer readonly Modal, to show its handsome face in a big picture
export const DevModal: React.FC<Omit<ModalProps, "children"> & {developer: Developer}> = ({developer, ...props}) => {
    if(!developer) return null;
    return (
        <Modal {...props}>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", [desktop]: {flexDirection: "row", alignItems: "start"}}}>
                <Picture src={developer.picture}alt={`${developer.name}'s picture`} />
                <Box sx={theme => ({
                    display: "flex", 
                    flexDirection: "column", 
                    gap: theme.spacing(),
                    fontSize: 24,
                    [desktop]: {
                        fontSize: 32
                    }
                })}>
                    <Span><strong>Name: </strong>{developer.name}</Span>
                    <Span><strong>Description: </strong>{developer.description}</Span>
                    <Span><strong>Status: </strong> {developer.hired ? "Hired" : "Not in the company"}</Span>
                </Box>
            </Box>
        </Modal>
    )
}



export const AddDevModal: React.FC<Omit<ModalProps, "children"> & {onSave: (dev: Omit<Developer, "id">) => any}> = ({onSave, ...props}) => {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [hired, setHired] = useState(false);

    const isButtonDisabled = useMemo(() => {
        return !name || !picture || !description;
    }, [name, picture, description])
    return (
        <Modal {...props}>
            <form onSubmit={e => {
                e.preventDefault();
                if(!isButtonDisabled) {
                    onSave({name, picture, description, hired: hired ? 1 : 0})
                }
            }}>
                <Box sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(),
                    margin: "auto",
                    "> label": {
                        color: theme.palette.primary,
                        fontWeight: 600
                    }
                })}>
                <Input value={name} label="Name" onChange={e => setName(e.target.value)}/>
                <Input value={picture} label="Picture" onChange={e => setPicture(e.target.value)}/>
                <Input value={description} label="Description" onChange={e => setDescription(e.target.value)}/>
                <label>
                    Is currently hired
                    <input type="checkbox" checked={hired} onChange={e => setHired(!hired)} />
                </label>
                <Submit disabled={isButtonDisabled} type="submit"></Submit>
                </Box>
            </form>
        </Modal>
    )
}
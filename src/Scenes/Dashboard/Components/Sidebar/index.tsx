import profile_pic from "./Images/Oval.png"
import "./index.css"
import { Button, ListGroup, Tab, Row, Col} from "react-bootstrap"
import React, { FunctionComponent, useRef, useState} from 'react'; 

const sidebarData = [
    {   
        title: "Talk to your bot",
        sublist: []
    }, 
    {   
        title: "Conversations",
        sublist: []
    }, 
    {   
        title: "NLU inbox",
        sublist: []
    },
    {   
        title: "Models",
        sublist: []
    },
    {   
        title: "Training",
        sublist: ["NLU Data", "Responses", "Stories", "Rules", "Configuration", "Domain"]
    }
]

interface Isidebar{
    changeTitle: (str: string) => void
}

const Sidebar: FunctionComponent<Isidebar> = ({changeTitle} : Isidebar) => {
    return <div id="sidebar">
        <div id="profile">
            <img id="profile-pic" src={profile_pic}/>
            <h3>Roman Kutepov</h3>
            <h4>Brain Director</h4>
            <hr/>
        </div>
        <div id="options">
            <List titles={sidebarData} changeTitle={changeTitle} />
        </div>
    </div> 
    
}
export default Sidebar

interface Ilist{
    titles: {
        title: string,
        sublist: string[]
    }[],
    changeTitle: (str: string) => void
}

const List: FunctionComponent<Ilist> = ({titles, changeTitle} : Ilist) => {
    const [selected, setSelected] = useState<string>("Talk to your bot")
    
    return <div className="list">
        {
            titles.map((obj) => 
                <SubList parent = {obj.title} titles = {obj.sublist} selected = {selected} onClick = {(title) => {setSelected(title); changeTitle(title)}} />
            )
        }
    </div>
}

interface IsubList{
    parent: string,
    titles: string[],
    selected: string | null,
    onClick: (title: string) => void,
}

const SubList: FunctionComponent<IsubList> = ({parent, titles, selected, onClick} : IsubList) => {

    return <div>
        <ListItem title = {parent} selected = {parent === selected || (selected !== null && titles.includes(selected))} onClick = {() => onClick(parent)}/>
        {
            titles.map((title) => 
                <ListItem title={title} selected = {title === selected} onClick = {() => onClick(title)} subEl = {true}/>
            )
        }
    </div>
}

interface IlistItem{
    title: string,
    selected: boolean,
    subEl?: boolean,
    onClick: () => void,
}

const ListItem: FunctionComponent<IlistItem> = ({title, selected, onClick, subEl}: IlistItem) => {
    let classNm = "listItem"
    if(selected)classNm += " listItemSelected"
    if(subEl)classNm += " subEl"

    return <div onClick={onClick} className={classNm}>
        {title}
    </div>
}
import React,{useState} from 'react'
import Sidebar from './Sidebar'
import TASK from './Tasks'



function Content() {
    const [selectedTab, setselectedTab] = useState("Inbox")
    return (
        <section className="content">
            <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab} />
            <TASK selectedTab={selectedTab }K/>
      </section>
    )
}

export default Content

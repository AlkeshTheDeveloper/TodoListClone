import React from 'react'
import {FaInbox,FaRegCalendarAlt,FaRegCalendar} from 'react-icons/fa'
function sidebar({ selectedTab, setselectedTab }) {
    console.log({selectedTab});
    return (
        <div className="sidebar">
            <div className={selectedTab==="INBOX"?"active":""} onClick={()=>setselectedTab("INBOX")}>
                <FaInbox className="icon"/>Inbox</div>
            <div className={selectedTab==="Today"?"active":""}onClick={()=>setselectedTab("Today")}>
                <FaRegCalendarAlt className="icon"/>Today</div>
            <div className={selectedTab==="Next_7"?"active":""}onClick={()=>setselectedTab("Next_7")}>
                <FaRegCalendar className="icon"/>Next 7 days</div>

        </div>
    )
}

export default sidebar

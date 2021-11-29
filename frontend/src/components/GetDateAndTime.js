import React from 'react'
import dateFormat from "dateformat";
import ReactTimeAgo from 'react-time-ago'

export default function GetDateAndTime(props) {

    const published24hAgo = (date) =>{ 
        // console.log('hola from published24hago function , that is the date i got: ' + date);
        let nowInMilliseconds = Date.now();
        let dateFormat = new Date(date);
        const updatedAt = dateFormat.getTime(); 
        let oneDay = 24 * 60 * 60 * 1000;
  
        // console.log('now:' + nowInMilliseconds);
        // console.log('updatedAt:' + updatedAt);
        if( nowInMilliseconds >= (updatedAt+oneDay) ) {
          return true;
        }
        return false;
      }
  
    const time = props.time;
    // console.log(Date(time));

    return (
        <React.Fragment>
            <span class="post_time">
                {dateFormat(time, "HH:MM")}
                {(published24hAgo(time))? dateFormat(time, " dd mmm, yyyy") : ''}
            </span>
            
            <span class="post_date"><ReactTimeAgo date={time} locale="en-US"/></span>

        </React.Fragment>
    )
}

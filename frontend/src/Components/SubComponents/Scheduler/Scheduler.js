import React, {useMemo, useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const DnDCalendar = withDragAndDrop(Calendar)

export const Scheduler = (props) => {
  const [events, setEvents] = useState(props.events);
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const {defaultDate} = useMemo(() => ({
    defaultDate: new Date(year, month, date)
  }), [])

  const moveEvent = ({ event, start, end }) => {
    const moveEvent = event;
 
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    // const targetPlan = props.plans.filter((plan) => plan.planId === event.planId)
    // const recipe = props.recipes.filter((recipe) => recipe.name === targetPlan.title);
    // const target = recipeId.filter((target) => target.recipeId === event.recipeId)
    // console.log(props.recipes)
    // console.log(recipe)
    // console.log("SCHED " + props.user.id + event.planId + event.recipeId + event.start + event.end)
    // props.edit()
    setEvents(nextEvents);
  };

 
  return(
    <div className="component-list">
        <DnDCalendar
            localizer={localizer}
            events={events}
            defaultDate={defaultDate}
            startAccessor="start"
            endAccessor="end"

            draggableAccessor={(event) => true}
            onEventDrop={moveEvent}
            style={{height:500}}
            resizable={false}
            onDropFromOutside={true}
         />
      </div>
    )
  }
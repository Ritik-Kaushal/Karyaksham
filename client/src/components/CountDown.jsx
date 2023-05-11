import React, { useEffect, useState } from 'react';
import moment from 'moment';
import store from '@/store/baseStore';
import { moveToMissed } from '@/store/taskStore';

export default function CountDown(props) {
  const [countdown, setCountdown] = useState(calculateCountdown(props.date));

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(props.date);
      setCountdown(newCountdown);

      if (newCountdown.days === 0 && newCountdown.hours === 0 && newCountdown.minutes === 0 && newCountdown.seconds === 0) {
        store.dispatch(moveToMissed({title:props.title,category:props.category}));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props.date]);

  function calculateCountdown(date) {
    const targetDate = moment(date, 'DD/MM/YYYY HH:mm');
    const now = moment();
    const timeDifference = targetDate.diff(now);

    if (timeDifference < 0) {
      return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const duration = moment.duration(timeDifference);

    return {
      years: duration.years(),
      months: duration.months(),
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    };
  }

  return (
    <div className="flex gap-5 text-red-600">
      <div>
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": countdown.years }}></span>
        </span>
        {` years`}
      </div>
      <div>
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": countdown.months }}></span>
        </span>
        {` months`}
      </div>
      <div>
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": countdown.days }}></span>
        </span>
        {" days"}
      </div>
      <div>
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": countdown.hours }}></span>
        </span>
        {" hours"}
      </div>
      <div>
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": countdown.minutes }}></span>
        </span>
        {" min"}
      </div>
      <div>
        <span className="countdown font-mono text-lg">
          <span style={{ "--value": countdown.seconds }}></span>
        </span>
        {" sec"}
      </div>
    </div>
  );
}
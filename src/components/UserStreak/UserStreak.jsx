import React, { useState, useEffect } from "react";
import "./UserStreak.scss";

const UserStreak = () => {
  const [streak, setStreak] = useState(0); 
  const [completedDays, setCompletedDays] = useState([]); 
  const incrementStreak = () => {
    setStreak((prevStreak) => prevStreak + 1);
  };

  const markDayCompleted = () => {
    const today = new Date().toLocaleDateString(); 
    if (!completedDays.includes(today)) {
      setCompletedDays([...completedDays, today]);
      incrementStreak();
    }
  };

  useEffect(() => {
    const handleCongratsModalClose = () => {
      markDayCompleted();
    };

    window.addEventListener("congratsModalClose", handleCongratsModalClose);

    return () => {
      window.removeEventListener("congratsModalClose", handleCongratsModalClose);
    };
  }, [completedDays]);

  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "short" });

  const handleCheckboxChange = (day) => {
    if (day === currentDay) {
      markDayCompleted();
    }
  };

  return (
    <div className="user-streak">
      <div className="user-container">
        <div className="user-container__header">
          <div className="user-container__profile">👤</div>
          <span className="user-name">User Name</span>
        </div>
        <div className="user-container__buttons user-buttons">
          <button className="user-buttons--active buttons">My Streak</button>
          <button className="buttons">Learn More</button>
        </div>
      </div>
      <h2 className="streak-text">
        Keep up your <span className="streak-text--bold">{streak}</span> day
        streak with Co-Pilot
      </h2>
      <div className="week-days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="day-container">
            <div className="day">{day}</div>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={
                  completedDays.includes(new Date().toLocaleDateString()) &&
                  day === currentDay
                }
                onChange={() => handleCheckboxChange(day)}
                disabled={day !== currentDay}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStreak;
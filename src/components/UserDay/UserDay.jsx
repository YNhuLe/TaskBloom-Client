import React from 'react';
import './UserDay.scss';

const UserDay = () => {
    return (
        <div className="user-day">
            <div className='user-day__my-day user-day__container user-day__container--active'>
                
                <div className='user-day--icon'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="12" y1="2" x2="12" y2="5" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="12" y1="19" x2="12" y2="22" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="2" y1="12" x2="5" y2="12" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="19" y1="12" x2="22" y2="12" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="4" y1="4" x2="6" y2="6" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="18" y1="18" x2="20" y2="20" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="4" y1="20" x2="6" y2="18" stroke="#0F6CBD" stroke-width="2"/>
                    <line x1="18" y1="6" x2="20" y2="4" stroke="#0F6CBD" stroke-width="2"/>
                    </svg>
                </div><p>My Day</p><span></span>
            </div>
            <div className='user-day__important user-day__container'>
                <div className='user-day--icon'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12,2 15,9 22,9 16.5,14 18,21 12,17 6,21 7.5,14 2,9 9,9" stroke="#0F6CBD" stroke-width="2" fill="none"/>
                    </svg>
                </div><p>Important<span></span></p></div>
            <div className='user-day__my-todo user-day__container'>
                <div className='user-day--icon'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 11L12 3L21 11V21H3V11Z" stroke="#0F6CBD" stroke-width="2" fill="none"/>
                    <path d="M9 15L11 17L15 13" stroke="#0F6CBD" stroke-width="2" fill="none"/>
                    </svg>
                </div><p>To-Do</p><span></span></div>
        </div>
    );
};

export default UserDay;
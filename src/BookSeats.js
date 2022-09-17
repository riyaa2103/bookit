import React, { useState } from 'react';
import './BookSeats.css';
import Seats from './Seats';

const createSeats = (rows, startIndex) => {
    
    let j = startIndex;
    let k = 'A';
    const section = [];
    
    while (j <= rows && section.length<=80) {
        if (k > 'G') {
            k = 'A';
            j++;
        }
        if (j < rows + 1) {
            section.push(j + k);
            k = String.fromCharCode(k.charCodeAt(0) + 1);
        }
    }
    return section;

}


const BookSeats = () => {
    const totalSeats = createSeats(11, '1');
    const [availableSeats, setAvailableSeats] = useState(['1A', '1B', '2A', '2B','5A','5B','5C','5D','5E','5F','5G','6A','6B','6C',
                                                        '6D','6E','6F','6G','7A','7B','7C','7D','7E','7F','8A','8B','8C','8D','8E','8F','9A','9B',
                                                        '9C','9D','9E','9F','10A','10B','10C','10D','10E']);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [bookedStatus, setBookedStatus] = useState(''); 
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const addSeat = (ev) => {
        if (numberOfSeats && !ev.target.className.includes('disabled')) {
            const seatsToBook = parseInt(numberOfSeats, 8);
            if (bookedSeats.length <= seatsToBook) {
                if (bookedSeats.includes(ev.target.innerText)) {
                    const newAvailable = bookedSeats.filter(seat => seat !== ev.target.innerText);
                    setBookedSeats(newAvailable);
                } else if (bookedSeats.length < numberOfSeats) {
                    setBookedSeats([...bookedSeats, ev.target.innerText]);

                } else if (bookedSeats.length === seatsToBook) {
                    bookedSeats.shift();
                    setBookedSeats([...bookedSeats, ev.target.innerText]);
                }
            }
        }
    };

    const confirmBooking = () => {
        setBookedStatus('You have successfully booked the following seats:');
        bookedSeats.forEach(seat => {
            setBookedStatus(prevState => {
                return prevState + seat + ' ';
            })
        });
        const newAvailableSeats = availableSeats.filter(seat => !bookedSeats.includes(seat));
        setAvailableSeats(newAvailableSeats);
        setBookedSeats([]);
        setNumberOfSeats(0);
    };
   

    return (
        <div className='main-conatiner'>
            <p><h1>How many seats would you like to book?</h1></p>
            <p style={{fontSize:'12px'}}>Note: You can only book upto 7 seats at a time</p>
            <input value={numberOfSeats} onChange={(ev) => setNumberOfSeats(ev.target.value)} />
            <div className='seat-container'>

                <Seats values={totalSeats}
                    availableSeats={availableSeats}
                    bookedSeats={bookedSeats}
                    addSeat={addSeat} />
            </div>


            <button onClick={confirmBooking}>Book seats</button>
            <p>{bookedStatus}</p>
        </div>

    );
}

export default BookSeats;
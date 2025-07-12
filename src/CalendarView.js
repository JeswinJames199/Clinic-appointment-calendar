import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const dummyPatients = ['John Doe', 'Mary Smith', 'Ali Khan'];
const dummyDoctors = ['Dr. House', 'Dr. Wilson', 'Dr. Lisa Cuddy'];

function CalendarView({ onLogout, darkMode, setDarkMode }) {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);
  const [feedback, setFeedback] = useState('');

  const formRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments, hasLoaded]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAddAppointment = () => {
    if (!selectedPatient || !selectedDoctor || !selectedTime) return;

    const newAppointment = {
      date: date.toDateString(),
      patient: selectedPatient,
      doctor: selectedDoctor,
      time: selectedTime,
    };

    let updatedAppointments;
    if (editingAppointment) {
      updatedAppointments = appointments.map((appt) =>
        appt === editingAppointment ? newAppointment : appt
      );
    } else {
      updatedAppointments = [...appointments, newAppointment];
    }

    setAppointments(updatedAppointments);
    setSelectedPatient('');
    setSelectedDoctor('');
    setSelectedTime('');
    setEditingAppointment(null);
    setFeedback(editingAppointment ? 'Appointment updated successfully!' : 'Appointment added successfully!');
  };

  const handleEditAppointment = (appt) => {
    setSelectedPatient(appt.patient);
    setSelectedDoctor(appt.doctor);
    setSelectedTime(appt.time);
    setEditingAppointment(appt);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteAppointment = (indexToDelete) => {
    const updated = appointments.filter((_, i) => i !== indexToDelete);
    setAppointments(updated);
    if (editingAppointment === appointments[indexToDelete]) {
      setEditingAppointment(null);
    }
  };

  const renderTileAppointments = (tileDate) => {
    const dayAppointments = appointments.filter(
      (a) => a.date === tileDate.toDateString()
    );
    if (dayAppointments.length === 0) return null;

    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {dayAppointments.map((appt, index) => (
          <li
            key={index}
            style={{
              fontSize: '0.65rem',
              lineHeight: '1rem',
              color: darkMode ? '#f0f0f0' : '#333',
              backgroundColor: darkMode ? '#2a2a2a' : 'transparent',
              padding: '1px 2px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            🕒 {appt.time.split(' ')[0]} — {appt.patient.split(' ')[0]}
          </li>
        ))}
      </ul>
    );
  };

  const filteredAppointments = appointments.filter((a) => {
    return (
      a.date === date.toDateString() &&
      (filterDoctor ? a.doctor === filterDoctor : true) &&
      (filterPatient ? a.patient === filterPatient : true)
    );
  });

  const bgImage = darkMode ? "url('/images/dark.jpg')" : "url('/images/bg.jpg')";

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: darkMode ? '#f0f0f0' : '#000',
      }}
    >
     
      <nav
        style={{
          backgroundColor: 'transparent',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: darkMode ? '#00ccff' : '#0077cc' }}>
          Clinic Portal
        </h1>
        <div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              marginRight: '1rem',
              padding: '6px 10px',
              borderRadius: '4px',
              border: '1px solid',
              background: darkMode ? '#222' : '#eee',
              color: darkMode ? '#f0f0f0' : '#000',
              cursor: 'pointer',
            }}
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className={`calendar-container ${darkMode ? 'dark-mode' : ''}`}>
        <div className="card">
          <h3>Select Date</h3>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date: tileDate }) => renderTileAppointments(tileDate)}
            showNeighboringMonth={false}
          />
        </div>

        {/* Form */}
        <div ref={formRef} className="card" style={{ minWidth: '300px', maxWidth: '400px' }}>
          <h3>{editingAppointment ? 'Edit Appointment' : `New Appointment - ${date.toDateString()}`}</h3>

          <label>Patient</label>
          <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
            <option value="">-- Select Patient --</option>
            {dummyPatients.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>

          <label>Doctor</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">-- Select Doctor --</option>
            {dummyDoctors.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label>Time</label>
          <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">-- Select Time --</option>
            {[
              '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
              '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
              '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
              '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
              '05:00 PM', '05:30 PM',
            ].map((time, i) => (
              <option key={i} value={time}>
                {time}
              </option>
            ))}
          </select>

          {editingAppointment && (
            <p style={{ color: 'orange', fontStyle: 'italic', marginTop: '-0.5rem' }}>
              Editing appointment — click "Update" to save changes
            </p>
          )}

          <button className="btn" onClick={handleAddAppointment}>
            {editingAppointment ? 'Update Appointment' : 'Add Appointment'}
          </button>

          {feedback && (
            <p style={{
              marginTop: '1rem',
              textAlign: 'center',
              color: 'green',
              fontWeight: 'bold',
              background: '#e0ffe0',
              padding: '0.5rem',
              borderRadius: '6px'
            }}>
              {feedback}
            </p>
          )}
        </div>

        <div className="card" style={{ flexBasis: '100%' }}>
          <h3>Appointments on {date.toDateString()}</h3>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <select value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)}>
              <option value="">All Doctors</option>
              {dummyDoctors.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            <select value={filterPatient} onChange={(e) => setFilterPatient(e.target.value)}>
              <option value="">All Patients</option>
              {dummyPatients.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {filteredAppointments.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.7, fontStyle: 'italic' }}>
              📭 No appointments scheduled for this day.
            </p>
          ) : (
            <ul className="appointments">
              {filteredAppointments.map((a, i) => {
                const globalIndex = appointments.findIndex((ap) => ap === a);
                return (
                  <li key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span>
                      🕒 {a.time} — <strong>{a.patient}</strong> with <em>{a.doctor}</em>
                    </span>
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEditAppointment(a)}
                        style={{
                          background: '#ffa726',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 12px',
                          minWidth: '80px',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(globalIndex)}
                        style={{
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 12px',
                          minWidth: '80px',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
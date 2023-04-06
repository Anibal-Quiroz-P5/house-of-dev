import axios from "axios";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
const Turner = () => {
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
  // const handleAgendar = () => {
  //   const formattedDate = selectedDate.toISOString().slice(0, 10);
  //   const data = { date: formattedDate, time: selectedTime };
  //   console.log("fecha formateada", data);
  //   axios.post("/api/appointment/1/add/4", data).then((res) => {
  //     console.log("cita agendada", res.data);
  //   });
  // };
  // return (
  // <div className="contenedor">
  //   SELECCIONA LA FECHA DE TU CITA
  //   <div className="center">
  //     <ReactDatePicker
  //       selected={selectedDate}
  //       onChange={(date) => setSelectedDate(date)}
  //       dateFormat={"dd/MM/yyyy"}
  //       // filterDate={(date) => date.getDay() !== 5}
  //       showYearDropdown
  //       scrollableMonthYearDropdown
  //     />{" "}
  //     <br />
  //     <br />
  //     <div className="container">
  //       <TimePicker
  //         value={selectedTime}
  //         onChange={(time) => setSelectedTime(time)}
  //         disableClock={true}
  //       />
  //     </div>{" "}
  //     <br /> <br />
  //     <input
  //       type="button"
  //       value="Agendar"
  //       className="btn btn-primary"
  //       onClick={() => {
  //         handleAgendar();
  //       }}
  //     />
  //   </div>
  // </div>
  //)
};

export default Turner;

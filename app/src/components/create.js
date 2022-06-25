import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   name: "",
   date: "",
   amount: "",
   paidfor: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", date: "", amount: "",paidfor:"" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add New Payment</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <b><label htmlFor="name">Name</label></b>
         
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
      
       <div className="form-group">
         <label htmlFor="date">Date</label>
         <input
           type="date"
           className="form-control"
           id="date"
           value={form.date}
           onChange={(e) => updateForm({ date: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="amount">Amount Paid</label>
         <input
           type="text"
           className="form-control"
           id="amount"
           value={form.amount}
           onChange={(e) => updateForm({ amount: e.target.value })}
         />
       </div>
       <div className="form-group">
       <label htmlFor="paidfor">Amount Paid for</label>
<br></br><br></br>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionInformal Dress code"   
             value="Informal Dress code"
             checked={form.paidfor === "Informal Dress code"}
             onChange={(e) => updateForm({ paidfor: e.target.value })}
           />
           <label htmlFor="positionInformal Dress code" className="form-check-label">Informal Dress code</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionLate Submission"
             value="Late Submission"
             checked={form.paidfor === "Late Submission"}
             onChange={(e) => updateForm({ paidfor: e.target.value })}
           />
           <label htmlFor="positionLate Submission" className="form-check-label">Late Submission</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionLate Comer"
             value="Late Comer"
             checked={form.paidfor === "Late Comer"}
             onChange={(e) => updateForm({ paidfor: e.target.value })}
           />
           <label htmlFor="positionLate Comer" className="form-check-label">Late Comer</label>
         </div>
         
       </div>
       <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Add Payment"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
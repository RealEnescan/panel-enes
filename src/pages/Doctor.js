import React from 'react'
import "../style/Doctor.css"
import { useState } from 'react'
import {db} from "../firebase"

import { collection,addDoc } from 'firebase/firestore'





const Doctor = () => {
    
    const [specilization, setSpecilization] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const[birthDate, setBirthDate] = useState('')

    const handleRegister = async () => {
        try {
          
          const docRef = await addDoc(collection(db, 'users'), {
            name,
            surname,
            birthDate,
            specilization
          });
    
           alert('Kaydınız Oluşturuldu.')
           console.log('Doktor başarıyla eklendi. ID:', docRef.id);
    
         
          setName('');
          setSurname('');
          setSpecilization('')
          setBirthDate('');
          
        } catch (error) {
          console.error('Doktor eklenirken bir hata oluştu:', error);
        }
      };
    

  return (
    <div className = "custom-page">
    <div className = "containerr custom-page">
        <h2 className = "flex justify-center">Doktor Kayıt Formu</h2>
        <div>
            <label htmlFor = "name">Ad:</label>
            <input 
               type = "text"
               id = "name"
               value = {name}
               onChange={(e) => setName(e.target.value)}
               />
        </div>
        <div>
            <label htmlFor = "surname">Soyad:</label>
            <input 
               type = "text"
               id = "surname"
               value = {surname}
               onChange={(e) => setSurname(e.target.value)}
               />
        </div>
        <div>
            <label htmlFor = "specilization">Uzmanlık:</label>
            <input 
               type = "text"
               id = "specilization"
               value = {specilization}
               onChange={(e) => setSpecilization(e.target.value)}
               />
        </div>
        <div>
            <label htmlFor = "birthDate">Doğum Tarihi:</label>
            <input 
               type = "text"
               id = "birthDate"
               value = {birthDate}
               onChange={(e) => setBirthDate(e.target.value)}
               />
        </div>
        <button className = "btn"onClick = {handleRegister}>Kaydet</button>
    </div>
    </div>
  )
}

export default Doctor

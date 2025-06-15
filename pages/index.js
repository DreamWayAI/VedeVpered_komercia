import { useState } from 'react';
import Head from 'next/head';
import RoomForm from '../components/RoomForm';


export default function Home() {
  const [rooms, setRooms] = useState([{ id: 1, area: '', layers: 4, type: 'standard' }]);
  const [country, setCountry] = useState('Україна');
  const [currency, setCurrency] = useState('грн');
  const [customCountry, setCustomCountry] = useState('');

  const handleAddRoom = () => setRooms([...rooms, { id: Date.now(), area: '', layers: 4, type: 'standard' }]);
  const handleChangeRoom = (index, updated) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], ...updated };
    setRooms(newRooms);
  };

  const handleDownload = async (type) => {
    const payload = {
      country: country === 'Інше' ? customCountry : country,
      currency,
      rooms,
    };
    const res = await fetch(`/api/generate-${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'pdf' ? 'Комерційна_пропозиція.pdf' : 'Комерційна_пропозиція.docx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>PoliBest Generator</title>
      </Head>
      <div className="container">
        <h1>Генератор комерційної пропозиції</h1>
        <div className="form-block">
          <label>Країна:</label>
          <select value={country} onChange={e => setCountry(e.target.value)}>
            <option>Україна</option>
            <option>Казахстан</option>
            <option>Польща</option>
            <option>Німеччина</option>
            <option>Молдова</option>
            <option>Грузія</option>
            <option>Литва</option>
            <option>Румунія</option>
            <option>Інше</option>
          </select>
          {country === 'Інше' && (
            <input type="text" placeholder="Введіть країну" value={customCountry} onChange={e => setCustomCountry(e.target.value)} />
          )}
          <label>Валюта:</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="грн">Гривня (₴)</option>
            <option value="євро">Євро (€)</option>
            <option value="долар">$ Долар</option>
          </select>
        </div>
        {rooms.map((room, index) => (
          <RoomForm key={room.id} index={index} data={room} onChange={handleChangeRoom} />
        ))}
        <button onClick={handleAddRoom}>Додати приміщення</button>
        <div className="btn-block">
          <button onClick={() => handleDownload('pdf')}>⬇ Завантажити PDF</button>
          <button onClick={() => handleDownload('docx')}>⬇ Завантажити Word</button>
        </div>
      </div>
    </>
  );
}
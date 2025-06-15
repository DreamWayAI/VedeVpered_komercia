import { useState } from 'react';
import Head from 'next/head';
import RoomForm from '../components/RoomForm';

export default function Home() {
  const [rooms, setRooms] = useState([{ id: 1, area: '', layers: 4, type: 'standard' }]);
  const [country, setCountry] = useState('Україна');
  const [currency, setCurrency] = useState('грн');
  const [customCountry, setCustomCountry] = useState('');
  const [discount, setDiscount] = useState(20);
  const [preview, setPreview] = useState('');

  const handleAddRoom = () => setRooms([...rooms, { id: Date.now(), area: '', layers: 4, type: 'standard' }]);
  const handleChangeRoom = (index, updated) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], ...updated };
    setRooms(newRooms);
  };

  const generatePreview = () => {
    let html = `<h2 style='color:#b5331b'>Комерційна пропозиція</h2>`;
    html += `<p>Країна: <b>${country === 'Інше' ? customCountry : country}</b><br>Валюта: <b>${currency}</b><br>Знижка: <b>${discount}%</b></p>`;
    rooms.forEach((room, i) => {
      const weight = parseFloat(room.area || 0) * (room.layers * 0.1);
      const pricePerKg = currency === 'грн' ? 1512 : currency === 'євро' ? 34.56 : 38;
      const total = weight * pricePerKg;
      const final = total * (1 - discount / 100);
      html += `<h3>Приміщення №${i + 1}</h3>
        <p>Площа: ${room.area} м²<br>Кількість шарів: ${room.layers}<br>Тип: ${room.type}</p>
        <table border='1' cellpadding='8' cellspacing='0' style='width:100%;margin-top:10px'>
        <tr><th>Матеріал</th><th>Витрата, кг</th><th>Ціна/${currency}</th><th>Сума ${currency}</th></tr>
        <tr><td>Емаль PoliBest 911</td><td>${weight.toFixed(1)}</td><td>${pricePerKg}</td><td>${total.toFixed(2)}</td></tr>
        </table>
        <p><b>Після знижки: ${final.toFixed(2)} ${currency}</b></p>`;
    });
    html += `<p>З повагою,<br>Генеральний директор<br>ТОВ «ВЕДЕВПЕРЕД»</p>`;
    setPreview(html);
  };

  return (
    <>
      <Head><title>PoliBest Generator</title></Head>
      <div className="container">
        <h1>Генератор комерційної пропозиції PoliBest 911</h1>
        <div className="form-block">
          <label>Країна:</label>
          <select value={country} onChange={e => setCountry(e.target.value)}>
            <option>Україна</option><option>Казахстан</option><option>Польща</option><option>Німеччина</option>
            <option>Молдова</option><option>Грузія</option><option>Литва</option><option>Румунія</option><option>Інше</option>
          </select>
          {country === 'Інше' && (
            <input type="text" placeholder="Ваша країна" value={customCountry} onChange={e => setCustomCountry(e.target.value)} />
          )}
          <label>Валюта:</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="грн">Гривня</option><option value="євро">Євро</option><option value="долар">Долар</option>
          </select>
          <label>Знижка (%):</label>
          <input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
        </div>

        {rooms.map((room, index) => (
          <RoomForm key={room.id} index={index} data={room} onChange={handleChangeRoom} />
        ))}
        <button onClick={handleAddRoom}>➕ Додати приміщення</button>
        <div className="btn-block">
          <button onClick={generatePreview}>🔍 Згенерувати пропозицію</button>
        </div>
        {preview && <div className="preview" dangerouslySetInnerHTML={{ __html: preview }} />}
      </div>
    </>
  );
}
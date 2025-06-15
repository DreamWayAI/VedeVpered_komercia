export default function RoomForm({ index, data, onChange }) {
  return (
    <div className="room-form">
      <h3>Приміщення №{index + 1}</h3>
      <input type="number" placeholder="Площа, м²" value={data.area} onChange={e => onChange(index, { area: e.target.value })} />
      <select value={data.layers} onChange={e => onChange(index, { layers: parseInt(e.target.value) })}>
        {[2,3,4,5,6].map(n => <option key={n} value={n}>{n} шари</option>)}
      </select>
      <select value={data.type} onChange={e => onChange(index, { type: e.target.value })}>
        <option value="standard">Звичайне</option>
        <option value="iskro">Іскробезпечне</option>
      </select>
    </div>
  );
}
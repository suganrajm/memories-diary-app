const form = document.getElementById('memoryForm');
const list = document.getElementById('memoriesList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const memory = {
    name: document.getElementById('name').value,
    place: document.getElementById('place').value,
    date: document.getElementById('date').value,
    details: document.getElementById('details').value
  };

  const res = await fetch('http://localhost:5000/api/memories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(memory)
  });

  if (res.ok) {
    alert("Memory Saved!");
    form.reset();
    loadMemories();
  }
});

async function loadMemories() {
  const res = await fetch('http://localhost:5000/api/memories');
  const data = await res.json();
  list.innerHTML = data.map(mem => `
    <div class="memory">
      <strong>${mem.date}</strong><br>
      <b>${mem.name}</b> at <i>${mem.place}</i><br>
      <p>${mem.details}</p>
    </div>
  `).join('');
}

loadMemories();

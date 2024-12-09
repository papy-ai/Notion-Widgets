function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    const day = now.toLocaleString('fr-FR', { weekday: 'long' });
    const month = now.toLocaleString('fr-FR', { month: 'long' });
    const date = now.getDate();
  
    document.getElementById('time').textContent = `${hours}:${minutes}`;
    document.getElementById('date').textContent = `${day} ${date} ${month}`;
  }
  
  setInterval(updateTime, 1000); // Mise à jour chaque seconde
  updateTime(); // Appel initial
  
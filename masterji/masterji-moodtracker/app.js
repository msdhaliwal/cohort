let selectedMood = null;

const moodButtons = document.querySelectorAll('.mood-btn');
moodButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedMood = button.getAttribute('data-mood');
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

document.getElementById('submitMood').addEventListener('click', () => {
  if (!selectedMood) {
    alert('Please select a mood!');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const moodEntry = { date: today, mood: selectedMood };

  let moods = JSON.parse(localStorage.getItem('moodLogs')) || [];
  const existingEntry = moods.find(entry => entry.date === today);

  if (existingEntry) {
    existingEntry.mood = selectedMood;
  } else {
    moods.push(moodEntry);
  }

  localStorage.setItem('moodLogs', JSON.stringify(moods));
  renderTimeline();
});

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  const moods = JSON.parse(localStorage.getItem('moodLogs')) || [];

  moods.sort((a, b) => new Date(b.date) - new Date(a.date));

  moods.forEach(entry => {
    const moodDiv = document.createElement('div');
    moodDiv.classList.add('timeline-entry');
    moodDiv.innerHTML = `📅 ${entry.date} — ${entry.mood}`;
    timeline.appendChild(moodDiv);
  });
}

renderTimeline();

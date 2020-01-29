import React,  { useState } from 'react';
import './App.css';
import Event from './Components/Event'

function App() {

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  async function onSubmit(event) {
      event.preventDefault();
      setLoading(true);
      const username = event.target.elements[0].value;
      const response = await fetch(`https://api.github.com/users/${username}/events`);
      const json = await response.json();
      setLoading(false);
      const events = json.filter((githubEvent) => Object.values(Event.EVENT_TYPES).indexOf(githubEvent.type) > -1)
      setEvents(events)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Github snippets</h1>
        <p>Enter a github username to see their public activity</p>
        <form onSubmit={onSubmit}>
          <label>
            <span>Github username</span>
          <input type={"text"} name={"username"}/>
          </label>
          <button>{loading ? '...': 'Submit'}</button>
        </form>
        <ul>
          { events.map((event) => (<li key={event.id}>
            <Event event={event} />
          </li>))}
          </ul>
      </header>
    </div>
  );
}

export default App;

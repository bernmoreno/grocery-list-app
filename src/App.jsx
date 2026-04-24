import { useEffect, useState } from 'react';
import './App.css';

const STORAGE_KEY = 'grocery-basket-items';

const CATEGORY_OPTIONS = [
  'Produce',
  'Dairy',
  'Bakery',
  'Pantry',
  'Frozen',
  'Drinks',
  'Household',
];

const FILTERS = ['all', 'active', 'completed'];

function App() {
  const [draft, setDraft] = useState({
    name: '',
    quantity: '1',
    category: CATEGORY_OPTIONS[0],
  });
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);

    if (!savedItems) {
      return [
        { id: 1, name: 'Avocados', quantity: '3', category: 'Produce', completed: false },
        { id: 2, name: 'Sourdough loaf', quantity: '1', category: 'Bakery', completed: true },
        { id: 3, name: 'Sparkling water', quantity: '2', category: 'Drinks', completed: false },
      ];
    }

    try {
      return JSON.parse(savedItems);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const filteredItems = items.filter((item) => {
    if (filter === 'active') {
      return !item.completed;
    }

    if (filter === 'completed') {
      return item.completed;
    }

    return true;
  });

  const completedCount = items.filter((item) => item.completed).length;
  const stats = {
    total: items.length,
    completed: completedCount,
    remaining: items.length - completedCount,
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleAddItem = (event) => {
    event.preventDefault();

    const nextName = draft.name.trim();

    if (!nextName) {
      return;
    }

    setItems((current) => [
      {
        id: crypto.randomUUID(),
        name: nextName,
        quantity: draft.quantity.trim() || '1',
        category: draft.category,
        completed: false,
      },
      ...current,
    ]);

    setDraft((current) => ({ ...current, name: '', quantity: '1' }));
  };

  const handleToggleItem = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDeleteItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const handleClearCompleted = () => {
    setItems((current) => current.filter((item) => !item.completed));
  };

  return (
    <main className="app-shell">
      <section className="app-panel">
        <div className="hero-copy">
          <p className="eyebrow">Weekly Planner</p>
          <h1>Grocery List</h1>
          <p className="hero-text">
            Build your shopping run, track what is already in the cart, and keep the list saved in your browser.
          </p>
        </div>

        <div className="stats-grid">
          <article>
            <span>{stats.total}</span>
            <p>Total items</p>
          </article>
          <article>
            <span>{stats.remaining}</span>
            <p>Still needed</p>
          </article>
          <article>
            <span>{stats.completed}</span>
            <p>Already picked</p>
          </article>
        </div>

        <form className="composer" onSubmit={handleAddItem}>
          <label>
            Item
            <input
              name="name"
              type="text"
              placeholder="Add milk, pasta, apples..."
              value={draft.name}
              onChange={handleDraftChange}
            />
          </label>

          <div className="input-row">
            <label>
              Qty
              <input
                name="quantity"
                type="text"
                value={draft.quantity}
                onChange={handleDraftChange}
              />
            </label>

            <label>
              Category
              <select name="category" value={draft.category} onChange={handleDraftChange}>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button type="submit" className="primary-button">
            Add To List
          </button>
        </form>

        <div className="toolbar">
          <div className="filter-pills" aria-label="Filter grocery items">
            {FILTERS.map((option) => (
              <button
                key={option}
                type="button"
                className={filter === option ? 'pill active' : 'pill'}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={handleClearCompleted}
            disabled={stats.completed === 0}
          >
            Clear Completed
          </button>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <h2>No items in this view</h2>
            <p>Add a new grocery item or switch filters to see the rest of your basket.</p>
          </div>
        ) : (
          <ul className="grocery-list">
            {filteredItems.map((item) => (
              <li key={item.id} className={item.completed ? 'grocery-item done' : 'grocery-item'}>
                <button
                  type="button"
                  className={item.completed ? 'check-button selected' : 'check-button'}
                  onClick={() => handleToggleItem(item.id)}
                  aria-label={`Mark ${item.name} as ${item.completed ? 'not completed' : 'completed'}`}
                >
                  {item.completed ? '✓' : ''}
                </button>

                <div className="item-copy">
                  <h2>{item.name}</h2>
                  <p>
                    {item.quantity} • {item.category}
                  </p>
                </div>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteItem(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;

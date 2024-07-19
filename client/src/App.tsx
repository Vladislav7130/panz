import { useState } from 'react';
import Notification from './Notification.tsx';

const App = () => {
  const [notification, setNotification] = useState(null);

  const simulateServer = () => {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        setTimeout(() => {
          reject();
        }, 1000);
      }
    });
  };

  const handleClick = async () => {
    try {
      await simulateServer();
      setNotification({ status: 'success', label: 'Успешно', text: 'Изменения успешно сохранены' });
    } catch {
      setNotification({ status: 'error', label: 'Изменения не сохранены', text: 'Потеря интернет соединения' });
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Отправить запрос</button>
      {notification && <Notification {...notification} />}
    </div>
  );
};

export default App;
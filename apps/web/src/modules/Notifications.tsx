import React, { useEffect, useState } from 'react';

type N = { id: string; type: string; payload_json: string; created_at: number; read_at?: number };

export function Notifications({ user = 'anon' }: { user?: string }) {
  const [items, setItems] = useState<N[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
  useEffect(() => { 
    fetch(apiUrl + '/v1/notifications?user_id=' + user)
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .catch(() => setItems([]));
  }, [user, apiUrl]);
  
  return (
    <div className="absolute right-0 top-10 w-80 bg-white border rounded-xl shadow-lg p-2 z-50">
      {!items.length && <div className="p-3 text-sm opacity-70">No notifications (yet).</div>}
      {items.map(n => {
        const p = n.payload_json ? JSON.parse(n.payload_json) : {};
        const isUnread = !n.read_at;
        return (
          <div key={n.id} className={`p-2 text-sm border-b last:border-b-0 ${isUnread ? 'bg-blue-50' : ''}`}>
            <div className="font-medium capitalize">{n.type}</div>
            <div className="opacity-80 text-xs">
              {n.type === 'vote' && `Someone reacted "${p.reaction}" to your term`}
              {n.type === 'follow' && `New follower!`}
              {n.type === 'comment' && `New comment on your content`}
            </div>
            <div className="text-xs opacity-60 mt-1">
              {new Date(n.created_at).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function NotificationBell({ user = 'anon' }: { user?: string }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://learnings-api.kevin-mcgovern.workers.dev';
  
  useEffect(() => {
    fetch(apiUrl + '/v1/notifications?user_id=' + user)
      .then(r => r.json())
      .then(d => {
        const items = d.items || [];
        setUnreadCount(items.filter((n: N) => !n.read_at).length);
      })
      .catch(() => setUnreadCount(0));
  }, [user, apiUrl]);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {showNotifications && <Notifications user={user} />}
    </div>
  );
}

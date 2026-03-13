import axios from "axios";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  function deleteAllNotifications() {
    axios
      .delete("http://localhost:8000/api/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setNotifications([]);
      })
      .catch((err) => console.error(err));
  }

  function deleteNotification(id) {
    axios
      .delete(`http://localhost:8000/api/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      })
      .catch((err) => console.error(err));
  }

  function markAllAsRead() {
    axios
      .patch(
        "http://localhost:8000/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      })
      .catch((err) => console.error(err));
  }

  function markAsRead(id) {
    axios
      .patch(
        `http://localhost:8000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? res.data : n)),
        );
      })
      .catch((err) => console.error(err));
  }

  useEffect(function notificationsList() {
    axios
      .get("http://localhost:8000/api/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-full p-6">
      <div className="w-full flex flex-col gap-4 md:flex-row justify-start md:justify-between items-start md:items-start">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <span className="flex flex-col md:flex-row  gap-4 justify-start md:justify-between items-start md:items-start">
          <span className="flex gap-2 items-center">
            <h3>Mark all as read</h3>
            <button
              className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 text-white transition duration-150 ease-in"
              onClick={markAllAsRead}
            >
              <i className="bi bi-eye"></i>
            </button>
          </span>
          <span className="flex gap-2 items-center">
            <h3>Delete all</h3>
            <button
              className="bg-red-500 rounded-md p-2 hover:bg-red-700 text-white transition duration-150 ease-in"
              onClick={deleteAllNotifications}
            >
              <i className="bi bi-trash"></i>
            </button>
          </span>
        </span>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-8 rounded-md bg-slate-300 flex gap-2 md:gap-4"
          >
            <div className="w-full rounded-md bg-slate-100 p-4 flex flex-col gap-4">
              <h2 className="font-extrabold flex flex-wrap">
                {notification.title}
              </h2>
              <h3 className="font-bold flex flex-wrap">
                {notification.subject}
              </h3>
              <p className="flex flex-wrap">{notification.message}</p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                className={`${notification.read ? "text-green-400 bg-slate-100 rounded-md p-2" : "bg-blue-500 rounded-md p-2 hover:bg-blue-700 text-white transition duration-150 ease-in"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <i
                  className={`bi ${notification.read ? "bi-check2-all" : "bi-eye"}`}
                ></i>
              </button>
              <button
                className="bg-red-500 rounded-md p-2 hover:bg-red-700 text-white transition duration-150 ease-in"
                onClick={() => deleteNotification(notification.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";

export default function Inbox() {
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/notifications/send",
        {
          recipient,
          title,
          subject,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);
      setRecipient("");
      setTitle("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        className="w-full md:w-200 h-100 p-6 md:rounded-2xl bg-slate-200 flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-4 rounded-md bg-slate-100 outline-none"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-md bg-slate-100 outline-none"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-4 rounded-md bg-slate-100 outline-none"
        />
        <textarea
          placeholder="Message"
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 rounded-md bg-slate-100 outline-none"
        ></textarea>
        <input
          type="submit"
          className="w-full p-4 bg-blue-500 hover:bg-blue-700 transition duration-150 ease-in rounded-md text-white"
        />
      </form>
    </div>
  );
}

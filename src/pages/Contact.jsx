import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Send,
  Instagram,
  Linkedin,
  Mail,
  Github,
  ArrowUpRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [links, setLinks] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "contact", "links")).then((snap) => {
      if (snap.exists()) setLinks(snap.data());
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "#",
        "#",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        "MMbCVpYodQFmKujx0",
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Pesan kamu berhasil dikirim.",
            confirmButtonColor: "#ec4899",
            confirmButtonText: "OK",
            background: "#ffffff",
            color: "#000",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Gagal mengirim email", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Terjadi kesalahan. Coba lagi nanti.",
            confirmButtonColor: "#d33",
            confirmButtonText: "Tutup",
            background: "#ffffff",
            color: "#000",
          });
        },
      );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 text-black bg-transparent">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-black">Contacts</h1>
        <p className="text-gray-600 text-sm max-w-lg leading-relaxed">
          Mari hubungi saya
        </p>
        <div className="border-t border-pink-300 my-4" />
      </div>

      {/* Social Media Section */}
      <h2 className="text-lg font-medium mb-4 text-black">Temukan saya di media sosial</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactCard
          title="Stay in Touch"
          description="Reach out via email for any inquiries or collaborations."
          link={`mailto:${links?.email ?? "elsa@gmail.com"}`}
          buttonText="Go to Gmail"
          bg="bg-red-100/50 border border-red-200"
          icon={<Mail size={26} />}
          buttonBg="bg-red-600 hover:bg-red-700"
        />
        <ContactCard
          title="Follow My Journey"
          description="Stay updated with my latest posts and stories on Instagram."
          link={links?.instagram ?? "https://instagram.com/"}
          buttonText="Go to Instagram"
          bg="bg-gradient-to-br from-purple-100/50 to-pink-100/50 border border-pink-200"
          icon={<Instagram size={26} />}
          buttonBg="bg-pink-600 hover:bg-pink-700"
        />
        <ContactCard
          title="Let's Connect"
          description="Connect for collaboration or explore my professional experience."
          link={links?.linkedin ?? "https://linkedin.com/in/"}
          buttonText="Go to LinkedIn"
          bg="bg-blue-100/50 border border-blue-200"
          icon={<Linkedin size={26} />}
          buttonBg="bg-blue-600 hover:bg-blue-700"
        />
        <ContactCard
          title="Join the Fun"
          description="Follow me on TikTok for entertaining and engaging content."
          link={links?.tiktok ?? "https://www.tiktok.com/"}
          buttonText="Go to TikTok"
          bg="bg-gray-100/50 border border-gray-200"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          }
          buttonBg="bg-gray-700 hover:bg-gray-800"
        />
        <div className="sm:col-span-2">
          <ContactCard
            title="Explore the Code"
            description="Explore the source code for all my projects on GitHub."
            link={links?.github ?? "https://github.com/ElsaUdb23"}
            buttonText="Go to GitHub"
            bg="bg-gray-100/50 border border-gray-200"
            icon={<Github size={26} />}
            buttonBg="bg-gray-900 hover:bg-black"
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-5 text-black">Or send me a message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <InputField
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="bg-pink-100/50 border border-pink-200 rounded p-3 text-black w-full focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none text-sm"
            required
          />
          <button
            type="submit"
            className="bg-pink-600 text-white w-full py-3 px-6 rounded flex items-center justify-center gap-2 hover:bg-pink-700 transition text-sm"
          >
            Send Email <Send size={16} />
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-500 text-xs pb-6">
        <p>COPYRIGHT © 2025</p>
        <p>As'ad Mahmud Akram. All rights reserved.</p>
      </div>
    </div>
  );
};

const ContactCard = ({
  title,
  description,
  link,
  buttonText,
  bg,
  icon,
  buttonBg,
}) => (
  <div
    className={`${bg} rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 h-full`}
  >
    <div className="flex justify-between items-start gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold mb-1.5 text-black">{title}</h3>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button
            className={`${buttonBg} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition text-xs font-medium`}
          >
            {buttonText} <ArrowUpRight size={13} />
          </button>
        </a>
      </div>
      <div className="p-2 bg-black/5 rounded-lg flex-shrink-0 text-gray-600">
        {icon}
      </div>
    </div>
  </div>
);

const InputField = ({ name, value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="bg-pink-100/50 border border-pink-200 rounded p-3 text-black w-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
    required
  />
);

export default Contact;
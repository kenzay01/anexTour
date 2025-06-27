import { FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/anextour",
      icon: <FaFacebookF className="text-white" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/anextour",
      icon: <FaTwitter className="text-white" />,
    },
    {
      name: "Telegram",
      url: "https://t.me/goryashiy_tur",
      icon: <FaTelegramPlane className="text-white" />,
    },
  ];
  return (
    <footer className="flex justify-center items-center bg-blue-900 p-4 gap-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 border-2 border-red-500 hover:border-white rounded-full"
        >
          {link.icon}
        </a>
      ))}
    </footer>
  );
}

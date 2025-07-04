import { Mail, Facebook, Instagram, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-24 px-4 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch With Us
        </motion.h1>

        {/* Call to Collaborate Section */}
        <div className="mt-14 bg-white border border-blue-200 shadow-xl rounded-3xl px-8 py-10 text-left">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🤝 Interested in Partnering with Health Hub?
          </motion.h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            Whether you're a certified <span className="text-blue-700 font-semibold">doctor</span>, licensed
            <span className="text-blue-700 font-semibold"> nutritionist</span>, experienced
            <span className="text-blue-700 font-semibold"> fitness coach</span>, or a reputable
            <span className="text-blue-700 font-semibold"> health product provider</span>, we’re always excited to build meaningful collaborations.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-xl shadow-sm mb-4">
            <p className="text-blue-900 font-medium">
              🌱 If you're passionate about improving lives through wellness, nutrition, and health education — you're exactly who we’re looking for.
            </p>
          </div>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            Our community is growing, and we believe in working with like-minded professionals who are ready to make an impact.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-xl shadow-sm mb-8">
            <p className="text-yellow-800 font-medium">
              💬 Have feedback, suggestions, or even a complaint? We value your input and would love to hear from you.
            </p>
          </div>
        </div>

        {/* Contact Options */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ContactCard
            icon={<Mail className="text-blue-600" />}
            title="Email"
            content="Send us an email directly"
            link="mailto:healthhub.team@example.com"
            label="healthhub.team@example.com"
          />
          <ContactCard
            icon={<Phone className="text-green-600" />}
            title="WhatsApp"
            content="Message us on WhatsApp"
            link="https://wa.me/201234567890"
            label="+20 123 456 7890"
          />
          <ContactCard
            icon={<Facebook className="text-blue-700" />}
            title="Facebook"
            content="Follow and message us"
            link="https://facebook.com/healthhub.official"
            label="@healthhub.official"
          />
          <ContactCard
            icon={<Instagram className="text-pink-600" />}
            title="Instagram"
            content="Follow us for daily tips"
            link="https://instagram.com/healthhub.official"
            label="@healthhub.official"
          />
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({
  icon,
  title,
  content,
  link,
  label,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
  link: string;
  label: string;
}) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-500 transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="p-3 bg-blue-100 rounded-full shadow-inner shrink-0">{icon}</div>
    <div>
      <h3 className="text-xl font-bold text-blue-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
      <span className="text-sm text-blue-600 font-medium mt-2 block">{label}</span>
    </div>
  </motion.a>
);

export default ContactUs;

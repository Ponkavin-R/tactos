import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    emailjs
      .send(
        "service_74d285g",
        "template_saqfs1l",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "_JSL-KW4lT2G4D1Qz"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "", agreement: false });
        },
        () => {
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full  bg-white rounded-3xl shadow-xl p-8 md:p-12"
      >
        <h2 className="text-4xl font-semibold text-gray-900 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-8">
          We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-800 to-blue-950 p-6 rounded-2xl shadow-md text-white"
          >
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="flex items-center mb-3">
              <FaMapMarkerAlt className="mr-2" /> Address
            </p>
            <p className="flex items-center mb-3">
              <FaPhoneAlt className="mr-2" /> +91 12345 67890
            </p>
            <p className="flex items-center mb-3">
              <FaEnvelope className="mr-2" /> info@tactos.com
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-2" /> info@tactos2.com
            </p>
          </motion.div>
          {/* Contact Form */}
          <motion.form
            onSubmit={sendEmail}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-4 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-4 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              className="w-full p-4 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the data collection policy
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-950 text-white py-4 rounded-xl font-medium text-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

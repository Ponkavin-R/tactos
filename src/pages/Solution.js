import React, { useState } from 'react';
import { FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot, FaCogs } from 'react-icons/fa';

export default function Solution() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    phoneNumber: '',
    budget: '',
  });

  const services = [
    { name: 'Web Development', icon: <FaLaptopCode size={40} className="text-blue-500" />, points: ['Responsive Design', 'Admin Dashboard', 'User Authentication', 'Payment Gateway'] },
    { name: 'App Development', icon: <FaMobileAlt size={40} className="text-green-500" />, points: ['iOS & Android App', 'Firebase Integration', 'Push Notifications', 'Payment Gateway'] },
    { name: 'Digital Marketing', icon: <FaChartLine size={40} className="text-yellow-500" />, points: ['SEO Optimization', 'Google Ads Setup', 'Email Marketing', 'Social Media Management'] },
    { name: 'Automation', icon: <FaRobot size={40} className="text-purple-500" />, points: ['Email Automation', 'Chatbot Setup', 'Task Automation', 'Google Sheet Automation'] },
    { name: 'Business Solution', icon: <FaCogs size={40} className="text-red-500" />, points: ['Project Analysis', 'Budget Planning', 'On-time Delivery', 'Post Launch Support'] },
  ];

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form Submitted Successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black px-4 md:px-10 py-10">
 <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">IT Solutions</h1>
        <p className="text-gray-500 mt-2">We build tailored solutions to elevate your business growth.</p>
        <p className="text-gray-400 mt-1">Our expertise lies in creating digital products that drive success.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all  ${expandedIndex === index ? 'border-blue-500' : ''}`}
            onClick={() => handleExpand(index)}
          >
            <div className="flex items-center space-x-3">
              {service.icon}
              <h2 className="text-xl font-semibold">{service.name}</h2>
            </div>
            {expandedIndex === index && (
              <div className="mt-3 text-gray-500">
                <ul className="list-disc pl-5">
                  {service.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600">Select Service</label>
            <select
              name="selectedService"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Service</option>
              {services.map((service, index) => (
                <option key={index} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-600">Budget (in $)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">Startup Name</label>
            <input
              type="text"
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">Founder Name</label>
            <input
              type="text"
              name="founderName"
              value={formData.founderName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-fit p-5 justify-center items-center bg-green-500 text-white rounded-lg py-3 hover:bg-green-600"
        >Submit</button>
      </form>
    </div>
  );
}

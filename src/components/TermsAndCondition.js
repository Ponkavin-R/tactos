import { useState } from "react";
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  FiShield,
  FiUser,
  FiActivity,
  FiPieChart,
  FiShare2,
  FiServer,
  FiAlertTriangle,
  FiBell,
  FiClock,
  FiShieldOff,
  FiSliders,
  FiFlag,
  FiRefreshCw,
  FiMail,
} from 'react-icons/fi';

const underlineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '100%',
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut', delay: 0.3 },
  },
};

const fadeInUp = (delay = 0.6, custom = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: delay,
        delay: custom,
      },
    },
  });

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };


const SectionTitle = ({ title, subtitle }) => (
  <motion.div
    className="text-center mb-12 md:mb-16"
    variants={fadeInUp(0.7)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {subtitle && (
      <p className="text-pink-600 font-semibold text-sm md:text-base mb-2 tracking-wider uppercase">
        {subtitle}
      </p>
    )}
    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
      {title}
    </h1>
    <motion.div
      className="w-32 h-1 bg-gradient-to-r from-teal-500 to-pink-500 mx-auto mt-3 rounded-full"
      variants={underlineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    />
  </motion.div>
);

const iconMap = {
  shield: <FiShield />,
  user: <FiUser />,
  activity: <FiActivity />,
  piechart: <FiPieChart />,
  share2: <FiShare2 />,
  server: <FiServer />,
  alert: <FiAlertTriangle />,
  bell: <FiBell />,
  clock: <FiClock />,
  shieldoff: <FiShieldOff />,
  sliders: <FiSliders />,
  flag: <FiFlag />,
  refresh: <FiRefreshCw />,
  mail: <FiMail />,
};

const termsAndConditionsData = [
  {
    icon: "shield",
    heading: "Eligibility",
    description:
      "To use the Platform, you must be at least 18 years old and capable of forming a binding contract. If you are using the Platform on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.",
  },
  {
    icon: "shield",
    heading: "Description of Services",
    items: [
      "Business ideation and startup resources",
      "Conducting startup events",
      "A job portal for entrepreneurial opportunities and startup hiring",
      "Tech Support services including web/app development and digital marketing",
      "Commission-free quotation services based on startup budget",
      "An Invest in Startups page to attract local investors for startups",
      "Dedicated startup dashboards for job postings, content uploads (including fundraising), and controlled event listings",
    ],
    description:
      "TACTOS provides a digital platform for multiple services aimed at supporting startups, including business ideation, event management, job portals, IT solutions, and more.",
  },
  {
    icon: "shield",
    heading: "Refund Policy",
    items: [
      "Event Attendance: Refunds are not applicable if the attendee fails to attend the event.",
      "Organizer-Cancelled Events: If an event is cancelled by the organizer, a full refund will be issued to all registered participants.",
      "Natural Cancellations: Events cancelled due to natural causes (such as extreme weather, national emergencies, or force majeure conditions) will also qualify for a full refund.",
    ],
    description:
      "Refunds for events are subject to the above conditions and are handled accordingly.",
  },
  {
    icon: "shield",
    heading: "Startup Registration Fee",
    description:
      "The price for registering a startup on the Platform is ₹999. This registration is valid for one year from the date of registration and is non-refundable under all circumstances.",
  },
  {
    icon: "shield",
    heading: "Invest in Startups",
    description:
      "TACTOS offers an 'Invest in Startups' feature to help startups gain visibility among local investors by showcasing ventures, funding needs, business models, and traction.",
    items: [
      "Startups must submit accurate and up-to-date business information including pitch decks, valuation expectations, and founder profiles.",
      "Clearly indicate fundraising stage and capital requirements.",
      "Respond promptly to investor inquiries.",
      "TACTOS provides standardized listing templates and promotes selected startups via newsletters, webinars, and curated investor outreach.",
      "Verified local investors can explore startup profiles and initiate conversations directly via the Platform.",
      "Startups featured are selected based on traction, value proposition clarity, and readiness for investment.",
      "All fundraising content is subject to TACTOS approval within 36 to 48 hours before visibility on the Platform.",
    ],
    note:
      "TACTOS does not mediate or guarantee investment outcomes. Startups and investors are responsible for their due diligence and any transactions. TACTOS disclaims liability for any disputes arising from investment discussions. The feature is subject to change without prior notice.",
  },
  {
    icon: "shield",
    heading: "Startup Dashboards and Event Visibility",
    description:
      "Registered startups receive personalized dashboards to post job openings, upload fundraising content (subject to approval), and manage event listings.",
    items: [
      "Only events created or approved by TACTOS are listed publicly.",
      "Startups must submit formal requests via email to post events, subject to TACTOS review and approval.",
      "TACTOS reserves the right to decline events based on relevance, quality, and community standards.",
    ],
  },
  {
    icon: "shield",
    heading: "User Accounts",
    description:
      "To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information, maintain confidentiality of your login credentials, and notify us immediately of any unauthorized use. You are responsible for all activities under your account.",
  },
  {
    icon: "shield",
    heading: "User Responsibilities",
    items: [
      "Not violate any applicable laws or regulations.",
      "Not upload or share unlawful, harmful, defamatory, or infringing content.",
      "Not interfere with the operation or security of the Platform.",
      "Not use bots, scrapers, or automated systems without written consent.",
    ],
    description:
      "You agree to abide by these responsibilities when using the Platform.",
  },
  {
    icon: "shield",
    heading: "Intellectual Property",
    description:
      "All Platform content, including logos, text, graphics, software, and trademarks, is owned by TACTOS or licensors. Copying or reproducing content without permission is prohibited. User-submitted content remains yours, but you grant TACTOS a non-exclusive, royalty-free license to use it for operating and promoting the Platform.",
  },
  {
    icon: "shield",
    heading: "Startup Quotes and Tech Support Services",
    description:
      "TACTOS provides startups with non-binding feature quotations based on their budget and connects them with service providers. We facilitate communication and document agreements but do not directly deliver services.",
    items: [
      "Help startups clearly define requirements.",
      "Connect startups with suitable service providers.",
      "Document communications, budgets, and deliverables.",
      "Monitor progress to minimize discrepancies.",
      "Provide a platform to attract funding opportunities.",
    ],
    note:
      "TACTOS is not liable for third-party service failures or disputes.",
  },
  {
    icon: "shield",
    heading: "Community Engagement and Collaboration Tools",
    description:
      "TACTOS offers collaboration tools, networking features, and access to volunteers, mentors, and advisors to support startups. Access depends on availability and relevance.",
    items: [
      "Startups agree to respect volunteers and community members.",
      "Use collaboration features responsibly and constructively.",
    ],
    note:
      "TACTOS does not guarantee availability or outcomes from these interactions and disclaims liability.",
  },
  {
    icon: "shield",
    heading: "Data Privacy",
    description:
      "Your use of the Platform is governed by our Privacy Policy, which details data collection, use, and protection.",
  },
  {
    icon: "shield",
    heading: "Termination",
    description:
      "TACTOS may suspend or terminate your access without notice for violations of these Terms or harmful conduct.",
  },
  {
    icon: "shield",
    heading: "Changes to Terms",
    description:
      "We may update these Terms periodically. Material changes will be notified, but it is your responsibility to review the Terms. Continued use implies acceptance of updated Terms.",
  },
  {
    icon: "shield",
    heading: "Contact",
    description:
      "For any questions about these Terms, please contact us at: contact@tactos.in",
  },
];


const TermsAndCondition = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <SectionTitle
          title="Terms and Condition"
          subtitle="Effective from 4th May 2025"
        />
        <p style={{
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#333',
  maxWidth: '900px',
  margin: '20px auto',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  textAlign: 'justify',
  padding: '0 10px'
}}>Welcome to TACTOS Strategic Solutions LLP (“TACTOS”, “we”, “us”, or “our”). These Terms and Conditions (“Terms”) govern your use of our website and web application (the “Platform”), including all features, tools, and services provided through it. By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, please refrain from using our Platform</p>
<motion.div
  className="space-y-10"
  variants={staggerContainer}
  initial="hidden"
  animate="visible" // ← fallback
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>

{termsAndConditionsData.map((section, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-md cursor-pointer"
          onClick={() => toggle(index)}
          aria-expanded={openIndex === index}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggle(index);
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl text-indigo-600">
              {iconMap[section.icon.toLowerCase()] || <FiShield />}
            </div>
            <h3 className="flex-1 text-lg font-semibold text-slate-800">
              {section.heading}
            </h3>
            <div className="text-indigo-600">
              {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
            </div>
          </div>
          {openIndex === index && (
  <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
    {section.description && <p>{section.description}</p>}
    {section.items && section.items.length > 0 && (
      <ul className="list-disc list-inside ml-4">
        {section.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )}
    {section.note && (
      <p className="mt-2 text-sm text-gray-500 italic">{section.note}</p>
    )}
  </div>
)}

        </div>
      ))}

        </motion.div>
      </div>
    );
  };
  
  export default TermsAndCondition;
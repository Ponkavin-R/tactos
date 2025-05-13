import { motion } from 'framer-motion';
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

const fadeInUp = (duration = 0.6, delay = 0) => ({
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
  ShieldCheck: <FiShield />,
  User: <FiUser />,
  Activity: <FiActivity />,
  PieChart: <FiPieChart />,
  Share2: <FiShare2 />,
  Server: <FiServer />,
  AlertTriangle: <FiAlertTriangle />,
  Bell: <FiBell />,
  Clock: <FiClock />,
  ShieldOff: <FiShieldOff />,
  Sliders: <FiSliders />,
  Flag: <FiFlag />,
  RefreshCcw: <FiRefreshCw />,
  Mail: <FiMail />,
};

const privacyPolicyData = [
  {
    icon: 'ShieldCheck',
    heading: 'Privacy Policy',
    effectiveDate: 'Effective Date: 4th May 2025',
    description:
      'TACTOS Strategic Solutions ("TACTOS", "we", "us", or "our") values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our website and web application (the "Platform"). By accessing or using the Platform, you consent to the practices described in this Policy.',
  },
  {
    icon: 'User',
    heading: '1. Information We Collect',
    items: [
      'Personal Information: Name, email, phone number, organization, designation, etc.',
      'Pitch Decks and CVs: Uploaded by users for validation or job applications; treated confidentially.',
      'Event Registrations: Data needed for organizing events including preferences or roles.',
      'Job Applications: Collected and shared with startups under supervision.',
      'Usage Data: IP address, browser type, OS, pages visited, time spent, etc.',
    ],
  },
  {
    icon: 'Activity',
    heading: '2. How We Use Your Information',
    items: [
      'User registration and access',
      'Processing event registrations and job applications',
      'Pitch deck and CV validation',
      'Communications and updates',
      'Service improvements and troubleshooting',
    ],
  },
  {
    icon: 'PieChart',
    heading: '3. Analytics and Cookies',
    items: [
      'Google Analytics used for user behavior analysis',
      'Cookies manage sessions, preferences, and analytics (not for ads)',
      'Users can disable cookies via browser settings',
    ],
  },
  {
    icon: 'Share2',
    heading: '4. Data Sharing and Supervision',
    items: [
      'No data sold or rented for marketing',
      'Shared only with trusted service providers and startups under supervision',
      'May be shared with legal authorities if required',
    ],
  },
  {
    icon: 'Server',
    heading: '5. Data Hosting and Security',
    items: [
      'Hosted on third-party cloud infrastructure with strong security',
      'TACTOS is not liable for third-party breaches but will act swiftly',
    ],
  },
  {
    icon: 'AlertTriangle',
    heading: '6. Data Breach Protocol',
    items: [
      'Prompt investigation and user notification',
      'Disclosure of breach details and mitigation steps',
    ],
  },
  {
    icon: 'Bell',
    heading: '7. Communication',
    items: [
      'Users receive service and operational notifications',
      'Marketing emails can be opted out, but service messages cannot',
    ],
  },
  {
    icon: 'Clock',
    heading: '8. Data Retention',
    items: [
      'Data retained only as needed for legal or operational reasons',
      'Users can request data/account deletion via contact details',
    ],
  },
  {
    icon: 'ShieldOff',
    heading: '9. Children’s Privacy',
    items: [
      'Platform not for children under 13',
      'Minor data is deleted if discovered',
    ],
  },
  {
    icon: 'Sliders',
    heading: '10. User Rights',
    items: [
      'Access, correct, or delete your personal data',
      'Withdraw consent where applicable',
      'File complaints with authorities if rights are violated',
    ],
  },
  {
    icon: 'Flag',
    heading: '11. Handling Violations of User Rights',
    items: [
      'Internal investigation and user notification',
      'Corrective actions and legal cooperation',
      'Dispute resolution mechanisms provided where required',
    ],
  },
  {
    icon: 'RefreshCcw',
    heading: '12. Changes to This Policy',
    items: [
      'Changes will be posted or emailed',
      'Continued use means acceptance of changes',
    ],
  },
  {
    icon: 'Mail',
    heading: '13. Contact Us',
    items: [
      'TACTOS Strategic Solutions',
      'Email: tactosinfo@gmail.com',
      'Phone: +91 84385 01830',
      'Website: www.tactos.in',
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <SectionTitle title="Privacy Policy" subtitle="Effective from 4th May 2025" />
      <motion.div
        className="space-y-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {privacyPolicyData.map((section, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            variants={fadeInUp(0.6, index * 0.15)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl text-indigo-600">
                {iconMap[section.icon] || <FiShield />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{section.heading}</h3>
                {section.effectiveDate && (
                  <p className="text-sm text-slate-500 mt-1">{section.effectiveDate}</p>
                )}
              </div>
            </div>
            {section.description && (
              <p className="text-slate-600 text-sm leading-relaxed">{section.description}</p>
            )}
            {section.items && (
              <ul className="list-disc ml-6 text-slate-600 text-sm leading-relaxed space-y-2">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;

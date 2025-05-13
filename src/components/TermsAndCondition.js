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
      "Event management services",
      "A job portal for entrepreneurial opportunities and startup hiring",
      "Startup-friendly IT solutions including web/app development and digital marketing",
      "Commission-free quotation services based on startup budget",
      "An investment attraction page to attract local investors for startups",
    ],
    description:
      "TACTOS provides a digital platform for multiple services aimed at supporting startups, including business ideation, event management, job portals, IT solutions, and more.",
  },
  {
    icon: "shield",
    heading: "User Accounts",
    description:
      "To access certain features, you may be required to create an account. You agree to provide accurate, current, and complete information, maintain the confidentiality of your login credentials, and notify us immediately of any unauthorized use of your account. You are solely responsible for all activities under your account.",
  },
  {
    icon: "shield",
    heading: "User Responsibilities",
    items: [
      "Violate any applicable laws or regulations",
      "Upload or share content that is unlawful, harmful, defamatory, or infringing",
      "Interfere with the operation or security of the Platform",
      "Use bots, scrapers, or automated systems without our written consent",
    ],
    description:
      "You agree not to engage in any of the following prohibited actions while using the Platform.",
  },
  {
    icon: "shield",
    heading: "Intellectual Property",
    description:
      "All content on the Platform, including logos, text, graphics, software, and trademarks, is the property of TACTOS or its licensors. You may not copy, reproduce, distribute, or create derivative works without express permission. User-submitted content remains yours, but by submitting it, you grant TACTOS a non-exclusive, royalty-free license to use it for Platform operations and promotions.",
  },
  {
    icon: "shield",
    heading: "Startup Quotes and IT Services",
    description:
      "TACTOS provides startups with feature quotations based on their specified budget. These are non-binding estimates and are subject to revision upon further discussion. TACTOS serves as a third-party facilitator, ensuring that services are delivered within the agreed budget and timeline.",
    items: [
      "Help startups define their requirements clearly",
      "Connect them with service providers who can deliver accordingly",
      "Ensure that all communications, budget agreements, and deliverables are documented",
      "Monitor progress to prevent discrepancies",
      "Provide a platform for startups to attract funding opportunities",
    ],
  },
  {
    icon: "shield",
    heading: "Job Portal Services",
    description:
      "TACTOS facilitates connections between startups and job seekers through a curated job portal. Startups provide job openings to TACTOS, and we upload the listings. We are not liable for hiring decisions or actions taken by startups or job seekers.",
    items: [
      "Guarantee job placements or hiring outcomes",
      "Participate in the shortlisting or selection process",
      "Endorse or verify the accuracy of job descriptions or applicant credentials",
    ],
  },
  {
    icon: "shield",
    heading: "Paid Events",
    description:
      "TACTOS may offer access to paid events. All purchases are final, and no refunds will be issued for user-initiated cancellations. TACTOS reserves the right to cancel or reschedule events, providing full refunds in such cases.",
  },
  {
    icon: "shield",
    heading: "Platform Communications",
    description:
      "By registering on the Platform, you agree to receive communications from TACTOS, including newsletters, updates, promotional materials, and service-related notifications. You may opt-out of marketing emails at any time.",
  },
  {
    icon: "shield",
    heading: "Payment Gateways",
    description:
      "Payments for paid services may be processed through third-party gateways. TACTOS is not liable for any issues caused by these third-party processors, including errors, delays, or failures.",
  },
  {
    icon: "shield",
    heading: "Data Collection and Usage",
    description:
      "TACTOS collects necessary user data for registration and Platform operation. We do not collect sensitive personal information and do not share data with third parties for marketing or hiring purposes.",
  },
  {
    icon: "shield",
    heading: "Dispute Resolution",
    description:
      "In the event of any dispute related to these Terms or the Platform, the parties shall attempt to resolve it amicably. If unresolved, the matter shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996, with the venue in Tamil Nadu, India.",
  },
  {
    icon: "shield",
    heading: "No Guarantee of Uptime",
    description:
      "TACTOS aims to ensure the Platform is available at all times. However, we do not guarantee uninterrupted access and shall not be liable for any downtime or service interruptions due to technical issues, maintenance, or unforeseen circumstances.",
  },
  {
    icon: "shield",
    heading: "Termination",
    description:
      "We reserve the right to suspend or terminate your access to the Platform, without notice or liability, if we believe you have violated these Terms or acted in a way that may harm our users or reputation.",
  },
  {
    icon: "shield",
    heading: "Limitation of Liability",
    description:
      "To the maximum extent permitted by law, TACTOS and its affiliates shall not be liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the Platform.",
  },
  {
    icon: "shield",
    heading: "Indemnification",
    description:
      "You agree to indemnify and hold harmless TACTOS, its affiliates, and partners from any claims, damages, or legal costs arising from your use of the Platform or your violation of these Terms.",
  },
  {
    icon: "shield",
    heading: "Privacy",
    description:
      "Your use of the Platform is also governed by our [Privacy Policy] which outlines how we collect, use, and protect your data.",
  },
  {
    icon: "shield",
    heading: "Changes to Terms",
    description:
      "TACTOS may revise these Terms from time to time. Any changes will be effective immediately upon posting. Continued use of the Platform after changes implies acceptance of the revised Terms.",
  },
  {
    icon: "shield",
    heading: "Governing Law",
    description:
      "These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu.",
  },
  {
    icon: "shield",
    heading: "Contact Us",
    description:
      "For questions or concerns about these Terms, please contact us at:\nTACTOS Strategic Solutions\nEmail: tactosinfo@gmail.com\nPhone: +91 84385 01830\nWebsite: www.tactos.in",
  },
];

const TermsAndCondition = () => {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <SectionTitle title="Terms and Condition" subtitle="Effective from 4th May 2025" />
        <motion.div
          className="space-y-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {termsAndConditionsData.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp(0.6, index * 0.1)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl text-indigo-600">
                  {iconMap[section.icon.toLowerCase()] || <FiShield />}
                </div>
                <h3 className="text-lg font-bold text-slate-800">{section.heading}</h3>
              </div>
  
              {section.description && (
                <p className="text-slate-600 mb-4">{section.description}</p>
              )}
  
              {section.items && (
                <ul className="list-disc list-inside space-y-2 text-slate-600">
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
  

export default TermsAndCondition;

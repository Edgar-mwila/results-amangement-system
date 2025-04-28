// HelpDesk Component
import { createFileRoute } from '@tanstack/react-router';
import { Phone, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpDesk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Help & Support Center</h1>
          <p className="text-xl text-gray-600">We're here to help you succeed with our platform</p>
        </header>

        {/* Contact Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-start">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Phone Support</h3>
                <p className="text-2xl font-medium text-blue-600 mb-1">+1 (555) 123-4567</p>
                <p className="text-gray-600">Monday - Friday, 9AM - 5PM</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-start">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Email Support</h3>
                <p className="text-2xl font-medium text-blue-600 mb-1">support@example.com</p>
                <p className="text-gray-600">24/7 Response</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-50">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Quick Tips */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Quick Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Tip #{index + 1}</span>
                </div>
                <p className="text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// FAQ Data
const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Click on the 'Forgot Password' link on the login page and follow the instructions sent to your email."
  },
  {
    question: "How can I update my profile information?",
    answer: "Go to Settings > Profile and click on the 'Edit' button to update your information."
  },
  {
    question: "What should I do if I find an error in my results?",
    answer: "Contact your course instructor or administrator immediately with screenshots and details of the error."
  },
  // Add more FAQs as needed
];

// Tips Data
const tips = [
  "Always save your work regularly to prevent data loss",
  "Keep your login credentials secure and don't share them with others",
  "Clear your browser cache if you experience display issues",
  "Use the latest version of your browser for the best experience",
  "Enable notifications to stay updated with important announcements"
];

export const Route = createFileRoute('/help-desk')({
  component: HelpDesk
});

const FAQSection = ({ domain }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
                {domain.faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                        <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;

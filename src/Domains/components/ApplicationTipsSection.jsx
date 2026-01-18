const ApplicationTipsSection = ({ domain }) => {
    return (
        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-bright-blue">
            <h2 className="text-3xl font-bold mb-6">Application Tips for {domain.name}</h2>
            <ul className="space-y-4">
                {domain.applicationTips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <span className="text-bright-blue text-2xl mt-1">✓</span>
                        <p className="text-lg text-text-secondary">{tip}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationTipsSection;

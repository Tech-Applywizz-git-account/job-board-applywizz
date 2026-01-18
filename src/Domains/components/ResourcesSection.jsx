import { Link } from 'react-router-dom';

const ResourcesSection = ({ domain }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Resources & Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {domain.resources.map((resource, index) => (
                    <Link
                        key={index}
                        to="#"
                        className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-200 hover:border-bright-blue hover:scale-105 transition-all duration-300"
                    >
                        <div className="text-3xl mb-3">📖</div>
                        <h3 className="font-bold text-lg hover:text-bright-blue transition-colors">{resource}</h3>
                        <p className="text-sm text-bright-blue mt-2">Read more →</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ResourcesSection;

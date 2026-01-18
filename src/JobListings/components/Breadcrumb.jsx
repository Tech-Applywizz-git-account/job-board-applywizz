import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                    {item.link ? (
                        <Link
                            to={item.link}
                            className="text-bright-blue hover:underline font-medium"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-text-secondary font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;

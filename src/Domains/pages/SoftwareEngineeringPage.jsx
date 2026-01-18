import DomainPage from './DomainPage';
import { domains } from '../data/domainsData';

const SoftwareEngineeringPage = () => {
    const domain = domains.find(d => d.id === 'software-engineering');
    return <DomainPage domain={domain} />;
};

export default SoftwareEngineeringPage;

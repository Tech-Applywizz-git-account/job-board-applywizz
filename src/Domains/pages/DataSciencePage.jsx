import DomainPage from './DomainPage';
import { domains } from '../data/domainsData';

const DataSciencePage = () => {
    const domain = domains.find(d => d.id === 'data-science');
    return <DomainPage domain={domain} />;
};

export default DataSciencePage;

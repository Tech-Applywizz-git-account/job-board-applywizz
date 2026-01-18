import DomainPage from './DomainPage';
import { domains } from '../data/domainsData';

const ProductManagementPage = () => {
    const domain = domains.find(d => d.id === 'product-management');
    return <DomainPage domain={domain} />;
};

export default ProductManagementPage;

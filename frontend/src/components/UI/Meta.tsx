import { Helmet } from 'react-helmet';

export type MetaProps = {
  title: string;
  description?: string;
  keywords?: string;
};

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'ForeShop | Home',
  description: 'Best place to buy electronics at the best price',
  keywords: 'electronics, buy electronics',
};

export default Meta;

import { EntityList, EntityListConfiguration } from '@mulugeta/shared-table';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useTranslation } from 'react-i18next';
const ServiceList = () => {
  const { t } = useTranslation();
  const config: EntityListConfiguration = {
    title: "orders",
    listUrl: '/services/list',
    detailUrl: '/services/detail',
    newUrl: '/services/new',
    detailId: 'id',
    visibleColumn: [
      { key: 'name', name: 'Name', hasLocal: true },
      { key: 'code', name: 'Code' },
      { key: 'version', name: 'Version' },
    ],
    primaryColumn: {
      key: 'name',
      name: ' Name',
      hasLocal: true,
    },

  };




  const pagination = (data) => {
console.log(data);
  };


  const services=[{
    name:"mulugeta",
    code:"mu",
    version:"12"
  }]
  return (
    <>
      <EntityList
              paginationChange={pagination}
        config={config}
        items={services}
        viewMode="list"
        total={10}
        titleColumn={'name'}
        showSearchButton={true}
        showNewButton
        titleColumnHasLocal
            />
    </>
  );
};

export default ServiceList;

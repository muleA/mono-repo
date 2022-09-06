import { localPipe } from './models/local-pipe';
import {
  Button,
  Card,
  Checkbox,
  Input,
  LoadingOverlay,
  Popover,
  Table,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconFilter,
  IconPlus,
  IconSearch,
} from '@tabler/icons';
import { Pagination } from '@mulugeta/pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactI18NextChild, useTranslation } from 'react-i18next';
import { EntityListConfiguration } from './models/table_config';
import EmptyState from './components/empty_state';
import Header from './components/header';
import { useState, Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect } from 'react';
interface EntityListProps {
  config: EntityListConfiguration;
  viewMode: 'list' | 'new' | 'detail';
  items?: any[];
  selectedItem?: any;
  itemsLoading?: boolean;
  total: number;
  collectionQuery?: any;
  search?: any;
  filter?: any;
  titleColumn: string;
  paginationChange: any;
  showNewButton?: boolean;
  showSearchButton?: boolean;
  titleColumnHasLocal?: boolean;
}

export function EntityList(props: EntityListProps) {
  /* Hooks */
  const router = useRouter();
  const { page, perPage } = router.query;

  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page?.toString()) : 1
  );
  const [currentPageSize, setCurrentPageSize] = useState<number>(
    perPage ? parseInt(perPage?.toString()) : 10
  );
  const [overallSelectedItemIndex, setOverallSelectedItemIndex] = useState<
    number
  >(-1);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number>(-1);
  const [items, setItems] = useState(props.items);
  const [viewMode, setViewMode] = useState<'list' | 'new' | 'detail'>(
    props.viewMode
  );

  let headers, rows, filterOptions;
  let filterParam: any[] = [];
  const { t, i18n } = useTranslation();

  const childeView = (item: any, keys: string[]) => {
    if (keys.length && item) {
      keys.forEach((key: any) => {
        if (item[key] !== null && item[key] !== undefined) {
          item = item[key];
        } else {
          item = '';
        }
      });
    }

    return item;
  };



  if (props.config?.visibleColumn && viewMode === 'list') {
    headers = props.config?.visibleColumn.map((col:any) => {
      return (
        <th key={Array.isArray(col.key) ? col.key[0] : col.key}>
          <div className="flex">
            <div>
              {col.isTranslate ? t(col?.name ? col.name : '') : col?.name}
            </div>
          </div>
        </th>
      );
    });

    rows = props.items?.map((element, index) => (
      <tr key={index} className="group">
        {props.config?.visibleColumn.map((col:any) => {
          return (
            <td>
              {!Array.isArray(col.key)
                ? col.hasLocal
                  ? localPipe(element[col.key], i18n.language)
                  : element[col.key]
                : childeView(element, col.key)}
            </td>
          );
        })}
        <td
          className="invisible  cursor-pointer text-right group-hover:visible hover:visible w-4"
          onClick={() => {
            if (props.config?.routing) {
              props.config.routing(element);
            }
          }}
        >
          <Link
            href={`${props.config?.detailUrl}/${
              element[props.config?.detailId]
            }?page=${currentPage}&perPage=${currentPageSize}`}
          >
            <a>
              <IconChevronRight />
            </a>
          </Link>
        </td>
      </tr>
    ));

    if (props?.config?.filter?.length) {
      filterOptions = props.config.filter.map((option: any[]) => {
        return (
          <div className="w-full">
            <div className="border-b py-2 pl-4 font-bold">
              Filtered By {option[0].fieldName}
            </div>
            <div className="px-2" key={option[0].field}>
              {option.map((opt: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => {
                return (
                  <Checkbox
                    onChange={(event) => onFilter(event, opt)}
                    label={opt.name}
                    size="xs"
                    className="my-2"
                  />
                );
              })}
            </div>
          </div>
        );
      });
    }
  }

  if (props.config?.primaryColumn && viewMode !== 'list') {
    headers = <th>{props.config?.primaryColumn.name}</th>;
    const primaryCol = props.config?.primaryColumn.key;
    rows = props.items?.map((element, index) => {
      return (
        <tr key={index} className="group">
          <td
            className={`${
              props.selectedItem &&
              element[props.config.detailId] ===
                props.selectedItem[props.config.detailId]
                ? 'bg-[#0f766e] text-white'
                : ''
            } cursor-pointer `}
            onClick={() => {
              router.push(
                `${props.config.detailUrl}/${
                  element[props.config?.detailId]
                }?page=${currentPage}&perPage=${currentPageSize}`
              );
            }}
          >
            {!Array.isArray(primaryCol)
              ? props.config?.primaryColumn?.hasLocal
                ? localPipe(element[primaryCol], i18n.language)
                : element[primaryCol]
              : props.config?.primaryColumn?.hasLocal
              ? localPipe(childeView(element, primaryCol), i18n.language)
              : childeView(element, primaryCol)}
          </td>
        </tr>
      );
    });
  }


   useEffect(() => {
    if (props.selectedItem !== undefined) {
      props?.items?.map((element, index) => {
        if (
          element[props.config.detailId] ==
          props.selectedItem[props.config.detailId]
        ) {
          setSelectedDataIndex(index);
        }
        return element;
      });
    }
  }, [props.selectedItem]);

  useEffect(() => {
    if (props.selectedItem !== undefined) {
      if (
        viewMode === 'detail' &&
        props.selectedItem !== undefined &&
        page !== undefined &&
        perPage !== undefined &&
        selectedDataIndex !== -1
      ) {
        setOverallSelectedItemIndex(
          (currentPage - 1) * parseInt(perPage.toString()) + selectedDataIndex
        );
      }
    }
  }, [selectedDataIndex]);

  useEffect(() => {
    if (
      viewMode === 'detail' &&
      props.selectedItem !== undefined &&
      overallSelectedItemIndex !== -1 &&
      perPage !== undefined &&
      page !== undefined &&
      parseInt(perPage?.toString()) === currentPageSize
    ) {
      setCurrentPage(parseInt(page?.toString()));
    }
  }, [page]);



  useEffect(() => {
    if (
      viewMode === 'detail' &&
      props.selectedItem !== undefined &&
      overallSelectedItemIndex !== -1 &&
      perPage !== undefined &&
      parseInt(perPage?.toString()) !== currentPageSize
    ) {
      for (
        let newPage: number = Math.ceil(props.total / currentPageSize);
        newPage >= 1;
        newPage--
      ) {
        let newPageIdentified = false;
        for (let index = 0; index <= overallSelectedItemIndex; index++) {
          if (
            (newPage - 1) * currentPageSize + index ===
            overallSelectedItemIndex
          ) {
            newPageIdentified = true;
            setCurrentPage(newPage);
            router.push(
              `${props.config?.detailUrl}/${
                props.selectedItem[props.config?.detailId]
              }?page=${newPage}&perPage=${currentPageSize}`
            );
          }
        }
        if (newPageIdentified) {
          break;
        }
      }
    }
  }, [currentPageSize, overallSelectedItemIndex]);

  const onFilterOpened = () => {
    setOpened(!opened);
  };

  const onCloseHandler = () => {
    router.push(props.config?.listUrl ? props.config?.listUrl : '/');
  };

  const onPageIndexChange = (page: any, pageSize: any, currentPage: any) => {
    const request = {
      skip: +page,
      top: pageSize,
    };
    setCurrentPage(currentPage);
    setCurrentPageSize(pageSize);
    props.paginationChange(request);
  };

  const onFilter = (event: any, selectedField: any) => {
    // Adds and removes filter params into the query
    event.currentTarget.checked
      ? filterParam.push(selectedField)
      : (filterParam = filterParam.filter(
          (a) => a.value !== selectedField.value
        ));

    // groups the filter query by their filter key
    let filterQuery: any[] = [];
    const filterMap: { [key: string]: any[] } = {};
    filterParam.forEach((item) => {
      filterMap[item.field] = filterParam.filter(
        (query) => query?.field === item.field
      );
    });
    // constructs the filter query into array form the grouped object
    Object.keys(filterMap).forEach((key) => {
      filterQuery = [...filterQuery, filterMap[key]];
    });
    props.filter(filterQuery);
  };

  return (
    <div>
      <div className=" flex">
        <Card
          style={{ height: 'fit-content' }}
          shadow={'sm'}
          className={`${viewMode === 'list' ? 'w-full' : 'w-1/3'}`}
        >
          {/* title and new button */}

          <Card.Section className="mb-2 flex justify-between border-b px-4 py-2">
            <div className="text-lg">{props.config?.title}</div>
            {props.showNewButton && (
              <div>
                <Link href={props.config?.newUrl ? props.config?.newUrl : ''}>
                  <a>
                    <Button
                      type="submit"
                      className="btn btn-primary bg-primary hover:bg-primary-200"
                      size="xs"
                    >
                      <IconPlus className="mr-2" />
                      New
                    </Button>
                  </a>
                </Link>
              </div>
            )}
          </Card.Section>

          {/* action, search and filter  */}
          <Card.Section
            className={viewMode === 'list' ? 'flex w-full p-2' : 'p-2'}
          >
            <div className={viewMode === 'list' ? 'w-1/2' : 'hidden'}>


            </div>

            <div
              className={
                viewMode === 'list' ? 'flex w-1/2 justify-end ' : 'w-full'
              }
            >
              {props.showSearchButton && (
                <Input
                  className={viewMode === 'list' ? 'mr-2 w-full ' : 'mr-0 ml-0'}
                  size="xs"
                  onKeyUp={(event: any) => props.search(event.target.value)}
                  placeholder="search here"
                  rightSection={
                    <IconSearch className="inline-block" size={16} />
                  }
                  rightSectionWidth={40}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                />
              )}

              {props.config?.filter?.length && (
                <Popover
                  className={
                    viewMode === 'list'
                      ? 'h-7 border bg-white hover:bg-white'
                      : 'hidden'
                  }
                  opened={opened}
                  onClose={() => setOpened(false)}
                  target={
                    <div
                      onClick={onFilterOpened}
                      className="flex h-full items-center border  hover:cursor-pointer"
                    >
                      <IconFilter className="mx-1 flex" />
                      <span className="mx-1">Filter</span>
                      <IconChevronDown className="mx-1 flex" />
                    </div>
                  }
                >
                  {filterOptions}
                </Popover>
              )}
            </div>
          </Card.Section>

          {/* table */}

          <Card.Section className="px-4 py-2">
            <Table horizontalSpacing="sm">
              <thead>
                <tr>
                  {headers}
                  <th className={viewMode === 'list' ? 'w-1' : 'hidden'}></th>
                </tr>
              </thead>

              {props.itemsLoading && (
                <div>
                  <LoadingOverlay
                    visible={props.itemsLoading}
                    loaderProps={{
                      size: 'sm',
                      color: '#1d2861',
                      variant: 'oval',
                    }}
                    overlayOpacity={0.3}
                    overlayColor={'#1d2861'}
                  />
                </div>
              )}

              <tbody>{rows}</tbody>
            </Table>
          </Card.Section>
          {!props.items?.length && !props.itemsLoading && <EmptyState />}
          {/* pagination */}
          <Card.Section className="mt-4 mb-2 flex w-full justify-end">
            <Pagination
              total={props.total}
              pageSize={[5, 10, 20, 25, 30, 50]}
              onPaginationChange={onPageIndexChange}
              defaultPageSize={currentPageSize ? currentPageSize : 10}
              initialPage={page ? currentPage : 1}
            />
          </Card.Section>
          {/* )} */}
        </Card>

        {viewMode !== 'list' && (
          <div className="w-2/3">
            <Header
              onclose={onCloseHandler}
              title={
                viewMode === 'detail' && props.selectedItem !== undefined
                  ? props.titleColumnHasLocal
                    ? localPipe(
                        props.selectedItem[props.titleColumn],
                        i18n.language
                      )
                    : props.selectedItem[props.titleColumn]
                  : ''
              }
            />

            <div className="mt-2 ml-2">
              {(viewMode === 'new' || viewMode === 'detail') &&
                props.config?.sideComponent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EntityList;

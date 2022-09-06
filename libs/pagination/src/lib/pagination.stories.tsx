import { Badge, List, Text } from '@mantine/core';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { Pagination } from './pagination';
export default {
  title: 'Pagination/pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;
const Template: ComponentStory<typeof Pagination> = (args: any) => (
  <article>
    <Pagination {...args} />
    <section className="mt-10">
      <Text className="text-2xl font-medium">Pagination</Text>

      <Text className="m-2">#Have 3 property props</Text>
      <List type={'order'} size={'sm'}>
        <List.Item>
          total: total elements of the displayed elements total = '{20}'
        </List.Item>
        <List.Item>
          pageSize: array of page size options pageSize = {'[5, 10, 20]'}
        </List.Item>
        <List.Item>
          defaultPageSize: a number to specify the page size
        </List.Item>
      </List>
      <Text className="m-2">#Have one method props</Text>
      <List type={'order'} size={'sm'}>
        <List.Item>
          {' '}
          onPaginationChange : returns skip number and top when the page and
          pageSize number changes
        </List.Item>
      </List>
      <div className="tip-wrapper">
        <Badge color={'teal'} className="tip">
          Tip
        </Badge>{' '}
        total and onPaginationChange props are required
      </div>
    </section>
  </article>
);

export const Page = Template.bind({});

Page.args = {
  total: 10,
  defaultPageSize: 10,
  onPaginationChange: (skip: number, top: number) => {
    console.log(skip, top);
  },
};

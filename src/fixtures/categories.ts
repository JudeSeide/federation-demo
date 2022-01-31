import { isEmpty } from 'lodash';
import DataLoader from 'dataloader';

export type Category = {
    id: string;
    name: string;
};

export const data: Category[] = [
    {
        id: '1',
        name: 'shoes'
    },
    {
        id: '2',
        name: 'clothes'
    },
    {
        id: '3',
        name: 'accessories'
    },
    {
        id: '4',
        name: 'bags'
    },
    {
        id: '5',
        name: 'everything-else'
    }
];

export const categories = {
    find: async (id: string): Promise<Category | null> => {
        console.log('\x1b[33m', `Find category with id ${id}`);
        return data.find(category => category.id === id) || null;
    },
    findAll: async (ids?: string[]): Promise<(Category | null)[]> => {
        if (isEmpty(ids)) {
            console.log('\x1b[33m', 'Find all categories');
            return data;
        }

        console.log('\x1b[33m', 'Find all categories with ids', ids);
        return ids.map(id => data.find(category => category.id === id) || null);
    },
};

export const buildCategoryDataloader = () => new DataLoader<string, Category | null>(
    async (keys: ReadonlyArray<string>) => categories.findAll(keys as string[]),
);

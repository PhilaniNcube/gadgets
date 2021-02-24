import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Product = list({
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({ ui: { displayMode: 'textarea' } }),

    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    category: select({
      options: [
        { label: 'Bags', value: 'BAGS' },
        { label: 'Cell Phones', value: 'CELL PHONES' },
        { label: 'Earphones', value: 'EARPHONES' },
        { label: 'Flash Drives', value: 'FLASH DRIVES' },
        { label: 'Hard Drives', value: 'HARD DRIVES' },
        { label: 'Headphones', value: 'HEADPHONES' },
        { label: 'Keyboards', value: 'KEYBOARDS' },
        { label: 'Laptops', value: 'LAPTOPS' },
        { label: 'Mouse', value: 'MOUSE' },
        { label: 'SD Cards', value: 'SD CARDS' },
        { label: 'Speakers', value: 'SPEAKERS' },
        { label: 'Textooks', value: 'TEXTBOOKS' },
        { label: 'Tablets', value: 'TABLETS' },
        { label: 'TV', value: 'TV' },
        { label: 'Smartwatches', value: 'SMARTWATCHES' },
        { label: 'Uncategorized', value: 'UNCATEGORIZED' },
      ],
      defaultValue: 'UNCATEGORIZED',

      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    user: relationship({
      ref: 'User.product',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});

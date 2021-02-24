/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from '@keystone-next/fields';

import { list } from '@keystone-next/keystone/schema';
import moment from 'moment';
import { isSignedIn, rules } from '../access';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return `order is ${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    streetAddress: text(),
    city: text(),
    postalCode: integer(),
    funding: select({
      options: [
        { label: 'Funza', value: 'FUNZA' },
        { label: 'Nsfas', value: 'NSFAS' },
        { label: 'Motsepe', value: 'MOTSEPE' },
        { label: 'DWS', value: 'DWS' },
        { label: 'Bursary', value: 'BURSARY' },
        { label: 'Other', value: 'OTHER' },
      ],
    }),
    institution: select({
      options: [
        { label: 'CPUT', value: 'CPUT' },
        { label: 'CUT', value: 'CUT' },
        { label: 'DUT', value: 'DUT' },
        { label: 'MUT', value: 'MUT' },
        { label: 'NMU', value: 'NMU' },
        { label: 'NWU', value: 'NWU' },
        { label: 'Rhodes', value: 'RHODES' },
        { label: 'SMU', value: 'SMU' },
        { label: 'Sol Plaatje', value: 'SOL PLAATJE' },
        { label: 'Stellenbosch', value: 'STELLENBOSCH' },
        { label: 'TUT', value: 'TUT' },
        { label: 'UCT', value: 'UCT' },
        { label: 'UFH', value: 'UFH' },
        { label: 'UJ', value: 'UJ' },
        { label: 'UKZN', value: 'UKZN' },
        { label: 'UL', value: 'UL' },
        { label: 'UM', value: 'UM' },
        { label: 'UP', value: 'UP' },
        { label: 'UNISA', value: 'UNISA' },
        { label: 'UFS', value: 'UFS' },
        { label: 'UWC', value: 'UWC' },
        { label: 'WITS', value: 'WITS' },
        { label: 'VENDA', value: 'VENDA' },
        { label: 'UNIZULU', value: 'UNIZULU' },
        { label: 'VUT', value: 'VUT' },
        { label: 'WSU', value: 'WSU' },
        { label: 'TVET', value: 'TVET' },
        { label: 'OTHER', value: 'OTHER' },
      ],

      ui: {
        displayMode: 'segmented-control',
      },
    }),
    charge: text(),
    date: timestamp({
      defaultValue: moment().format('LLL'),
    }),
  },
});

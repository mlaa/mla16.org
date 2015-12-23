/* Filter data */

'use strict';

module.exports = function (Module) {

  Module.Data = Module.Data || {};

  Module.Data.filters = [
    {
      style: 'menu-head',
      title: 'Day'
    },
    {
      type: 'day',
      href: 'th',
      title: 'Thursday, 8 January'
    },
    {
      type: 'day',
      href: 'fr',
      title: 'Friday, 9 January'
    },
    {
      type: 'day',
      href: 'sa',
      title: 'Saturday, 10 January'
    },
    {
      type: 'day',
      href: 'su',
      title: 'Sunday, 11 January'
    },
    {
      style: 'menu-head',
      title: 'Time'
    },
    {
      type: 'tod',
      href: 'mor',
      title: 'Morning'
    },
    {
      type: 'tod',
      href: 'aft',
      title: 'Afternoon'
    },
    {
      type: 'tod',
      href: 'eve',
      title: 'Evening'
    },
    {
      type: 'tod',
      href: 'ln',
      title: 'Late-Night'
    },
    {
      style: 'menu-head',
      title: 'Location'
    },
    {
      type: 'venue',
      href: 'acc',
      title: 'Austin Convention Center'
    },
    {
      type: 'venue',
      href: 'jwm',
      title: 'JW Marriott'
    },
    {
      type: 'venue',
      href: 'eh',
      title: 'Exhibit Hall Theater (ACC)'
    },
    {
      style: 'menu-head',
      title: 'Session Type'
    },
    {
      type: 'type',
      href: 'aca',
      title: 'Connected Academics'
    },
    {
      type: 'type',
      href: 'pub',
      title: 'Open to the Public'
    },
    {
      type: 'type',
      href: 'soc',
      title: 'Social Event'
    },
    {
      type: 'type',
      href: 'spe',
      title: 'Special Event'
    },
    {
      type: 'type',
      href: 'pre',
      title: 'Presidential Theme'
    }
  ];

  Module.Data.categories = {
    'th':  'Thursday',
    'fr':  'Friday',
    'sa':  'Saturday',
    'su':  'Sunday',
    'mor': 'Morning',
    'aft': 'Afternoon',
    'eve': 'Evening',
    'ln':  'Late-Night',
    'acc': 'ACC',
    'jwm': 'JW Marriott',
    'eh':  'Exhibit Hall Theater (ACC)',
    'off': 'Elsewhere',
    'aca': 'Connected Academics',
    'pub': 'Open to the Public',
    'soc': 'Social Event',
    'spe': 'Special Event',
    'pre': 'Presidential Theme'
  };

};

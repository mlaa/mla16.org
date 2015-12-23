/* Menu data */

'use strict';

module.exports = function (Module) {

  Module.Data = Module.Data || {};

  // Section-level menus
  Module.Data.Menu = {
    main: [
      {
        id: 'saved',
        title: 'Saved sessions',
        icon: 'star'
      },
      {
        id: 'program/th',
        title: 'Thursday, 7 January',
        icon: 'calendar-empty'
      },
      {
        id: 'program/fr',
        title: 'Friday, 8 January',
        icon: 'calendar-empty'
      },
      {
        id: 'program/sa',
        title: 'Saturday, 9 January',
        icon: 'calendar-empty'
      },
      {
        id: 'program/su',
        title: 'Sunday, 10 January',
        icon: 'calendar-empty'
      },
      {
        id: 'filter',
        title: 'Filter by category',
        icon: 'filter'
      },
      {
        id: 'maps/home',
        title: 'Maps',
        icon: 'map'
      },
      {
        id: 'info/home',
        title: 'Information',
        icon: 'info-circled'
      },
      {
        id: 'program/eh',
        title: 'Exhibit Hall Theater',
        icon: 'youtube-play'
      },
      {
        title: '#mla16',
        href: 'https://twitter.com/hashtag/mla16',
        icon: 'twitter'
      },
      {
        title: 'Browse the Program at mla.org',
        href: 'https://apps.mla.org/program',
        icon: 'link-ext'
      }
    ],
    maps: [
      {
        type: 'menu-head',
        title: 'Area Maps'
      },
      {
        title: 'MLA Convention Google Map',
        href: 'https://www.google.com/maps/d/edit?mid=zuHDtMA_j6o0.kKf08kLc2RtE',
        icon: 'link-ext'
      },
      {
        type: 'menu-head',
        title: 'Austin Convention Center (ACC)'
      },
      {
        id: 'maps/acc-level-1',
        title: 'Level 1'
      },
      {
        id: 'maps/acc-level-3',
        title: 'Level 3'
      },
      {
        id: 'maps/acc-level-4',
        title: 'Level 4'
      },
      {
        id: 'maps/acc-exhibit-area',
        title: 'Exhibit Area, Ballroom D–G, level 4'
      },
      {
        type: 'menu-head',
        title: 'JW Marriott Austin'
      },
      {
        id: 'maps/marriott-level-2',
        title: 'Level 2'
      },
      {
        id: 'maps/marriott-level-3',
        title: 'Level 3'
      },
      {
        id: 'maps/marriott-level-4',
        title: 'Level 4'
      },
      {
        id: 'maps/marriott-level-5',
        title: 'Level 5'
      },
      {
        type: 'menu-head',
        title: 'Hilton Austin'
      },
      {
        id: 'maps/hilton-4th-floor',
        title: 'Fourth Floor'
      },
      {
        id: 'maps/hilton-lobby',
        title: 'Lobby'
      }
    ],
    info: [
      {
        type: 'subhead',
        title: 'General Information'
      },
      {
        id: 'info/locations',
        title: 'Convention Locations'
      },
      {
        id: 'info/daily',
        title: '<em>Convention Daily</em>'
      },
      {
        id: 'info/twitter',
        title: '<em>Twitter</em>'
      },
      {
        id: 'info/wifi',
        title: 'Wi-Fi Access',
        icon: 'wifi'
      },
      {
        id: 'info/hotel-wifi',
        title: 'Wi-Fi Access by Hotel Guests'
      },
      {
        id: 'info/weather',
        title: 'What to Do in a Weather or Other Emergency'
      },
      {
        type: 'subhead',
        title: 'Policies'
      },
      {
        id: 'info/taping',
        title: 'Audio- and Videotaping at Sessions'
      },
      {
        id: 'info/badges',
        title: 'Badges'
      },
      {
        id: 'info/canceling',
        title: 'Canceling Sessions'
      },
      {
        id: 'info/fragrance',
        title: 'Fragrance'
      },
      {
        id: 'info/guest-sessions',
        title: 'Guest Passes to Sessions'
      },
      {
        id: 'info/guest-exhibit-hall',
        title: 'Guest Passes to the Exhibit Hall'
      },
      {
        id: 'info/identification',
        title: 'Identification'
      },
      {
        id: 'info/in-absentia',
        title: 'Reading in Absentia'
      },
      {
        id: 'info/smoking',
        title: 'Smoking'
      },
      {
        type: 'subhead',
        title: 'MLA Registration and Welcome Centers'
      },
      {
        id: 'info/registration',
        title: 'About the MLA Registration and Welcome Centers'
      },
      {
        id: 'info/disabilities',
        title: 'Disabilities, Facilities and Services for Persons with'
      },
      {
        id: 'info/housing',
        title: 'Housing Desk'
      },
      {
        id: 'info/membership',
        title: 'Membership Desks'
      },
      {
        id: 'info/print-program',
        title: 'Print Copies of the Program'
      },
      {
        id: 'info/philadelphia',
        title: 'Philadelphia Information'
      },
      {
        type: 'subhead',
        title: 'MLA PubCentral'
      },
      {
        id: 'info/pubcentral',
        title: 'About MLA PubCentral'
      },
      {
        type: 'subhead',
        title: 'On-Site Resources'
      },
      {
        id: 'info/business-center',
        title: 'Business Center'
      },
      {
        id: 'info/childcare',
        title: 'Childcare'
      },
      {
        id: 'info/nursing',
        title: 'Nursing Mothers'
      },
      {
        id: 'info/bill-w',
        title: 'Friends of Bill W.'
      },
      {
        id: 'info/headquarters',
        title: 'Headquarters Office'
      },
      {
        id: 'info/lost-and-found',
        title: 'Lost and Found'
      },
      {
        id: 'info/lounges',
        title: 'Lounges'
      },
      {
        id: 'info/press-office',
        title: 'Press Office'
      },
      {
        id: 'info/shuttle-service',
        title: 'Shuttle Service'
      },
      {
        id: 'info/ready-rooms',
        title: 'Speaker Ready Rooms'
      },
      {
        id: 'info/transportation',
        title: 'Transportation in Austin'
      },
      {
        id: 'info/austin-info',
        title: 'Austin Information and Restaurant Reservations'
      },
      {
        id: 'info/whos-here',
        title: '“Who’s Here” Directory'
      },
      {
        type: 'subhead',
        title: 'Job Information Center'
      },
      {
        id: 'info/jobs',
        title: 'Job Information Center'
      },
      {
        type: 'subhead',
        title: 'Exhibits'
      },
      {
        id: 'info/exhibit-hall',
        title: 'Exhibit Hall'
      },
      {
        id: 'program/eh',
        title: 'Exhibit Hall Theater'
      },
      {
        type: 'subhead',
        title: 'Event Highlights'
      },
      {
        id: 'info/creative-conversations',
        title: 'Creative Conversations and Readings'
      },
      {
        id: 'info/excursions',
        title: 'Cultural Excursions'
      },
      {
        id: '692',
        title: 'MLA Awards Ceremony (Session 692)'
      },
      {
        id: '440',
        title: 'Presidential Address (Session 440)'
      },
      {
        id: '241',
        title: 'Presidential Plenary (Session 241)'
      },
      {
        type: 'subhead',
        title: 'Informational Sessions and Workshops'
      },
      {
        id: 'info/connected-academics',
        title: 'Connected Academics'
      },
      {
        id: 'info/celj',
        title: 'Council of Editors of Learned Journals'
      },
      {
        id: '80',
        title: 'Government Careers (Session 80)'
      },
      {
        id: '319',
        title: 'NEH Information (Session 319)'
      },
      {
        type: 'subhead',
        title: 'Governance'
      },
      {
        id: '571',
        title: 'Delegate Assembly (Session 571)'
      },
      {
        type: 'subhead',
        title: 'Emergencies'
      },
      {
        id: 'info/medical',
        title: 'Illness and Medical Emergencies'
      },
      {
        type: 'subhead',
        title: '2017 Convention'
      },
      {
        id: 'info/calls-for-papers',
        title: 'Calls for Papers'
      },
      {
        id: 'info/organizing-sessions',
        title: 'Organizing Sessions'
      }
    ]
  };

};

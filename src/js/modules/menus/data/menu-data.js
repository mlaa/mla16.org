/* Menu data */

'use strict';

module.exports = function (Module) {

  Module.Data = Module.Data || {};

  // Section-level menus
  Module.Data.Menu = {
    program: [
      {
        id: 'program/th',
        title: 'Thursday, 8 January',
        childClass: 'icon-calendar-empty'
      },
      {
        id: 'program/fr',
        title: 'Friday, 9 January',
        childClass: 'icon-calendar-empty'
      },
      {
        id: 'program/sa',
        title: 'Saturday, 10 January',
        childClass: 'icon-calendar-empty'
      },
      {
        id: 'program/su',
        title: 'Sunday, 11 January',
        childClass: 'icon-calendar-empty'
      },
      {
        id: 'filter',
        title: 'Filter by category',
        childClass: 'icon-filter'
      }
    ],
    people: [
      {
        id: 'people/A',
        title: 'A'
      },
      {
        id: 'people/B',
        title: 'B'
      },
      {
        id: 'people/C',
        title: 'C'
      },
      {
        id: 'people/D',
        title: 'D'
      },
      {
        id: 'people/E',
        title: 'E'
      },
      {
        id: 'people/F',
        title: 'F'
      },
      {
        id: 'people/G',
        title: 'G'
      },
      {
        id: 'people/H',
        title: 'H'
      },
      {
        id: 'people/I',
        title: 'I'
      },
      {
        id: 'people/J',
        title: 'J'
      },
      {
        id: 'people/K',
        title: 'K'
      },
      {
        id: 'people/L',
        title: 'L'
      },
      {
        id: 'people/M',
        title: 'M'
      },
      {
        id: 'people/N',
        title: 'N'
      },
      {
        id: 'people/O',
        title: 'O'
      },
      {
        id: 'people/P',
        title: 'P'
      },
      {
        id: 'people/Q',
        title: 'Q'
      },
      {
        id: 'people/R',
        title: 'R'
      },
      {
        id: 'people/S',
        title: 'S'
      },
      {
        id: 'people/T',
        title: 'T'
      },
      {
        id: 'people/U',
        title: 'U'
      },
      {
        id: 'people/V',
        title: 'V'
      },
      {
        id: 'people/W',
        title: 'W'
      },
      {
        id: 'people/X',
        title: 'X'
      },
      {
        id: 'people/Y',
        title: 'Y'
      },
      {
        id: 'people/Z',
        title: 'Z'
      }
    ],
    maps: [
      {
        type: 'menu-head',
        title: 'Area Maps'
      },
      {
        title: 'MLA Convention Google Map',
        href: 'https://www.google.com/maps/d/viewer?mid=zxKWBfmu02v4.kXVK9xfJ3Qhk'
      },
      {
        type: 'menu-head',
        title: 'Vancouver Convention Centre East'
      },
      {
        id: 'maps/vcc-east-convention',
        title: 'Convention Level'
      },
      {
        id: 'maps/vcc-east-meeting',
        title: 'Meeting Level'
      },
      {
        type: 'menu-head',
        title: 'Vancouver Convention Centre West'
      },
      {
        id: 'maps/vcc-west-1',
        title: 'Level 1'
      },
      {
        id: 'maps/vcc-exhibit-area',
        title: 'Exhibit Area, Level 1'
      },
      {
        id: 'maps/vcc-west-2',
        title: 'Level 2'
      },
      {
        id: 'maps/vcc-west-3',
        title: 'Level 3'
      },
      {
        type: 'menu-head',
        title: 'Fairmont Waterfront'
      },
      {
        id: 'maps/fairmont-waterfront',
        title: 'Lobby Level'
      }
    ],
    info: [
      {
        type: 'menu-head',
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
        title: 'Wi-Fi Access'
      },
      {
        id: 'info/weather',
        title: 'What to Do in a Weather or Other Emergency'
      },
      {
        type: 'menu-head',
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
        id: 'info/id',
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
        type: 'menu-head',
        title: 'MLA Registration and Welcome Center'
      },
      {
        id: 'info/registration',
        title: 'About the MLA Registration and Welcome Center'
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
        title: 'Membership Desk'
      },
      {
        id: 'info/austin',
        title: 'Austin Information'
      },
      {
        type: 'menu-head',
        title: 'MLA PubCentral'
      },
      {
        id: 'info/pubcentral',
        title: 'About MLA PubCentral'
      },
      {
        type: 'menu-head',
        title: 'On-Site Resources'
      },
      {
        id: 'info/business-center',
        title: 'Business Center'
      },
      {
        id: 'info/child-care',
        title: 'Child Care'
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
        id: 'info/internet-in-hotels',
        title: 'Internet Access by Hotel Guests'
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
        id: 'info/ready-room',
        title: 'Speaker Ready Room'
      },
      {
        id: 'info/transportation',
        title: 'Transportation in Vancouver'
      },
      {
        id: 'info/vancouver-information',
        title: 'Vancouver Information and Restaurant Reservations'
      },
      {
        id: 'info/whos-here',
        title: '“Who’s Here” Directory'
      },
      {
        type: 'menu-head',
        title: 'Job Information Center'
      },
      {
        id: 'info/jobs',
        title: 'Job Information Center'
      },
      {
        type: 'menu-head',
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
        id: 'info/pubcentral',
        title: 'MLA Exhibit Booth'
      },
      {
        type: 'menu-head',
        title: 'Event Highlights'
      },
      {
        id: 'info/creative-conversations',
        title: 'Creative Conversations'
      },
      {
        id: 'info/excursions',
        title: 'Cultural Excursions'
      },
      {
        id: '641',
        title: 'MLA Awards Ceremony (Session 641)'
      },
      {
        id: '406',
        title: 'Presidential Address (Session 406)'
      },
      {
        id: '219',
        title: 'Presidential Forum (Session 219)'
      },
      {
        type: 'menu-head',
        title: 'Informational Sessions and Workshops'
      },
      {
        id: 'info/celj',
        title: 'Council of Editors of Learned Journals'
      },
      {
        id: 'info/government-careers',
        title: 'Government Careers'
      },
      {
        id: 'info/neh',
        title: 'NEH Information'
      },
      {
        type: 'menu-head',
        title: 'Governance'
      },
      {
        id: 'info/delegate-assembly',
        title: 'Delegate Assembly'
      },
      {
        type: 'menu-head',
        title: 'Emergencies'
      },
      {
        id: 'info/medical',
        title: 'Illness and Medical Emergencies'
      },
      {
        type: 'menu-head',
        title: '2016 Convention'
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

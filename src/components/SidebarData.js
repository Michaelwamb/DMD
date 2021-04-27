import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dash',
    icon: <MdIcons.MdDashboard style={{marginLeft: 10}}/>,
    cName: 'nav-text'
  },
  {
    title: 'Imóveis',
    path: '/immobile',
    icon: <AiIcons.AiFillHome style={{marginLeft: 10}}/>,
    cName: 'nav-text'
  },
  {
    title: 'Locatários',
    path: '/tenants',
    icon: <MdIcons.MdPermContactCalendar style={{marginLeft: 10}}/>,
    cName: 'nav-text'
  },
];

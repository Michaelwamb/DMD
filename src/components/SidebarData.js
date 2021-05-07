import React from 'react';
// import * as FaIcons from 'react-icons/fa';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dash',
    icon: <MdIcons.MdDashboard style={{ marginLeft: 10 }} />,
    cName: 'nav-text'
  },
  {
    title: 'Imóveis',
    path: '/immobile',
    icon: <FaIcons.FaHome style={{ marginLeft: 10 }} />,
    cName: 'nav-text'
  },
  {
    title: 'Locatários',
    path: '/tenants',
    icon: <MdIcons.MdPermContactCalendar style={{ marginLeft: 10 }} />,
    cName: 'nav-text'
  },
  {
    title: 'Locações',
    path: '/location',
    icon: <FaIcons.FaBuilding style={{ marginLeft: 10 }} />,
    cName: 'nav-text'
  }
];

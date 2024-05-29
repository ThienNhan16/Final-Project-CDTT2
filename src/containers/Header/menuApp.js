export const adminMenu = [
  {
    //hệ thống
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   name: "menu.admin.crud",
      //   link: "/system/user-manage",
      // },

      {
        name: "menu.admin.crud-redux",
        link: "/system/manage-user",
      },

      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",

        // subMenus: [
        //     {
        //       name: "menu.system.system-administrator.user-manage",
        //       link: "/system/user-manage",
        //     },
        //     {
        //       name: "menu.system.system-administrator.user-redux",
        //       link: "/system/user-redux",
        //     },
        //   ],
      },

      // {
      //   name: "menu.admin.manage-admin",
      //   link: "/system/user-admin",
      // },

      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  // Quản lý phòng khám
  {
    name: "menu.admin.clinic",
    menus: [
      { name: "menu.admin.manage-clinic", link: "/system/manage-clinic" },
      { name: "menu.admin.update-clinic", link: "/system/update-clinic" },
    ],
  },

  // Quản lý chuyên khoa
  {
    name: "menu.admin.specialty",
    menus: [
      { name: "menu.admin.manage-specialty", link: "/system/manage-specialty" },
    ],
  },

  // Quản lý cẩm nang
  {
    name: "menu.admin.handbook",
    menus: [
      { name: "menu.admin.manage-handbook", link: "/system/manage-handbook" },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },

      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
      {
        name: "menu.doctor.manage-info",
        link: "/doctor/manage-info",
      },
      {
        name: "menu.doctor.manage-detail-info",
        link: "/doctor/manage-detail-info",
      },
    ],
  },
];

export default defineAppConfig({
  lazyCodeLoading: "requiredComponents",
  pages: [
    "pages/kowtow/index",
    "pages/history/index",
    "pages/travel/index",
    "pages/tease/index",
    "pages/my/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#0052d9",
    navigationBarTitleText: "Bo Fans",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    // custom: true,
    color: "#000000",
    selectedColor: "#0052d9",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "pages/kowtow/index",
        text: "磕",
        iconPath: "images/tab-bar/kowtow.png",
        selectedIconPath: "images/tab-bar/kowtow-active.png",
      },
      {
        pagePath: "pages/history/index",
        text: "史",
        iconPath: "images/tab-bar/history.png",
        selectedIconPath: "images/tab-bar/history-active.png",
      },
      {
        pagePath: "pages/travel/index",
        text: "游",
        iconPath: "images/tab-bar/travel.png",
        selectedIconPath: "images/tab-bar/travel-active.png",
      },
      {
        pagePath: "pages/tease/index",
        text: "逗",
        iconPath: "images/tab-bar/tease.png",
        selectedIconPath: "images/tab-bar/tease-active.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我",
        iconPath: "images/tab-bar/my.png",
        selectedIconPath: "images/tab-bar/my-active.png",
      },
    ],
  },
});

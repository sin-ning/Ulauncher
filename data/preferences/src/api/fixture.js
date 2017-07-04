export default function (url, params) {
  function isMatch (url, resource) {
    return url.indexOf(resource) !== -1
  }

  return new Promise(function (resolve, reject) {
    if (isMatch(url, '/get/all')) {
      resolve({
        'show_indicator_icon': true,
        'hotkey_show_app': 'Ctrl+Alt L',
        'autostart_allowed': true,
        'autostart_enabled': true,
        'theme_name': 'light',
        'version': '1.2.3'
      })
    } else if (isMatch(url, '/set/show-indicator-icon')) {
      console.log('/set/show-indicator-icon', params)
      setTimeout(resolve, 0) // preventDefault doesn't work unless resolution is done in the next event loop
    } else if (isMatch(url, '/set/autostart-enabled')) {
      console.log('/set/autostart-enabled', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/set/show-recent-apps')) {
      console.log('/set/show-recent-apps', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/set/theme-name')) {
      console.log('/set/theme-name', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/set/hotkey-show-app')) {
      console.log('/set/hotkey-show-app', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/open/web-url')) {
      console.log('/open/web-url', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/show/hotkey-dialog')) {
      console.log('/show/hotkey-dialog', params)
      setTimeout(resolve, 0)
      setTimeout(function () {
        window.onNotification(params.name, {displayValue: 'Ctrl+Alt+Space'})
      }, 300)
    } else if (isMatch(url, '/show/file-browser')) {
      console.log('/show/file-browser', params)
      setTimeout(resolve, 0)
      setTimeout(function () {
        window.onNotification(params.name,
          {value: `https://placeholdit.imgix.net/~text?txt=Icon&w=80&h=80`})
      }, 500)
    } else if (isMatch(url, '/shortcut/get-all')) {
      console.log('/shortcut/get-all', params)
      setTimeout(function () {
        resolve(_getShortcuts())
      }, 0)
    } else if (isMatch(url, '/shortcut/update')) {
      console.log('/shortcut/update', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/shortcut/delete')) {
      console.log('/shortcut/delete', params)
      setTimeout(resolve, 0)
    } else if (isMatch(url, '/shortcut/add')) {
      console.log('/shortcut/add', params)
      setTimeout(function () {
        resolve({...params, id: 'new-id-832923742'})
      }, 0)
    } else if (isMatch(url, '/extension/get-all')) {
      console.log('/extension/get-all', params)
      setTimeout(function () {
        resolve(_getExtensions())
      }, 0)
    } else {
      reject('Unknown resource')
    }
  })
}

function _getExtensions () {
  return [
    {
      url: 'https://github.com/ulauncher/ulauncher-timer',
      name: 'Timer',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      description: 'Countdown timer with notifications',
      developer_name: 'Aleksandr Gornostal',
      version: '1.2.3',
      preferences: [
        {
          id: 'keyword',
          type: 'keyword',
          name: 'My Timer',
          default_value: 'ti'
        }
      ]
    }
  ]
}

function _getShortcuts () {
  return [
    {
      id: '1ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Looooooong naaaaaaaaaaaaaaame',
      keyword: 'g',
      cmd: 'http://github.com/search?q=%s',
      is_default_search: true
    },
    {
      id: '2ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'gismeteo.ua',
      keyword: 'gismeteo.ua',
      cmd: 'http://www.gismeteo.ua/city/?gis20141120102952990=%s&sedddddddddddddddddddarchQueryData=%2758175%27'
    },
    {
      id: '3ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Maps',
      keyword: 'maps',
      cmd: 'https://www.google.com.ua/maps/search/%s?hl=en&source=opensearch',
      is_default_search: true
    },
    {
      id: '4ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Play',
      keyword: 'play',
      cmd: 'https://play.google.com/store/search?q=%s&utm_source=opensearch',
      is_default_search: true
    },
    {
      id: '5ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Gihub',
      keyword: 'g',
      cmd: 'http://github.com/search?q=%s'
    },
    {
      id: '6ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'gismeteo.ua',
      keyword: 'gismeteo.ua',
      cmd: 'http://www.gismeteo.ua/city/?gis20141120102952990=%s&searchQueryData=%2758175%27'
    },
    {
      id: '7ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Maps',
      keyword: 'maps',
      cmd: 'https://www.google.com.ua/maps/search/%s?hl=en&source=opensearch'
    },
    {
      id: '8ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Play',
      keyword: 'play',
      cmd: 'https://play.google.com/store/search?q=%s&utm_source=opensearch'
    },
    {
      id: '9ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Gihub',
      keyword: 'g',
      cmd: 'http://github.com/search?q=%s'
    },
    {
      id: '0ad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'gismeteo.ua',
      keyword: 'gismeteo.ua',
      cmd: 'http://www.gismeteo.ua/city/?gis20141120102952990=%s&searchQueryData=%2758175%27'
    },
    {
      id: 'aad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Maps',
      keyword: 'maps',
      cmd: 'https://www.google.com.ua/maps/search/%s?hl=en&source=opensearch'
    },
    {
      id: 'bad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Play',
      keyword: 'play',
      cmd: 'https://play.google.com/store/search?q=%s&utm_source=opensearch'
    },
    {
      id: 'cad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Gihub',
      keyword: 'g',
      cmd: 'http://github.com/search?q=%s'
    },
    {
      id: 'dad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'gismeteo.ua',
      keyword: 'gismeteo.ua',
      cmd: 'http://www.gismeteo.ua/city/?gis20141120102952990=%s&searchQueryData=%2758175%27'
    },
    {
      id: 'ead51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Maps',
      keyword: 'maps',
      cmd: 'https://www.google.com.ua/maps/search/%s?hl=en&source=opensearch'
    },
    {
      id: 'fad51010-04ee-44fc-81c4-ed6fb72cbf19',
      icon: 'https://assets-cdn.github.com/favicon.ico',
      name: 'Google Play',
      keyword: 'play',
      cmd: 'https://play.google.com/store/search?q=%s&utm_source=opensearch'
    }
  ]
}

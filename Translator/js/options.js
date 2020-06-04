
var state = {
  /* screenshort: {},
  closepage: {},
  copytext: {}, */
  original_language: [
    {id: 'chinese',title:'Chinese'},
    {id: 'japanese',title:'Japanese'},
    {id: 'english',title:'English'}
  ],
  translated_language: [
    {id: 'chinese',title:'Chinese'},
    {id: 'japanese',title:'Japanese'},
    {id: 'english',title:'English'}
  ]
}

chrome.storage.sync.get((config) => {
  state.original_language.forEach((item) => item.checked = item.id === config.original_language)
  state.translated_language.forEach((item) => item.checked = item.id === config.translated_language)
  m.redraw()
})
/* chrome.commands.getAll((commands) => {
  var command1 = commands.find((command1) => command1.name === 'screenshot')
  var command2 = commands.find((command2) => command2.name === 'closepage')
  var command3 = commands.find((command3) => command3.name === 'copytext')
  state.screenshort = command1.screenshort
  state.closepage = command2.closepage
  state.copytext = command3.copytext
  m.redraw()
}) */


var oncreate = {
  ripple: (vnode) => {
    mdc.ripple.MDCRipple.attachTo(vnode.dom)
  }
}

var onupdate = (item) => (vnode) => {
  if (vnode.dom.classList.contains('active') !== item.checked) {
    vnode.dom.classList.toggle('active')
  }
}

var events = {
  option: (name, item) => () => {
    state[name].forEach((item) => item.checked = false)
    item.checked = true
    chrome.storage.sync.set({[name]: item.id})
  }
}

m.mount(document.querySelector('main'), {
  view: () => [
    m('.bs-callout',
      m('h4.mdc-typography--headline5', 'Original Language'),
      state.original_language.map((item) =>
        m('label.s-label', {onupdate: onupdate(item)},
          m('.mdc-radio',
            m('input.mdc-radio__native-control', {
              type: 'radio', name: 'original_language',
              checked: item.checked && 'checked',
              onchange: events.option('original_language', item)
            }),
            m('.mdc-radio__background',
              m('.mdc-radio__outer-circle'),
              m('.mdc-radio__inner-circle'),
            ),
          ),
          m('span', m('em', item.icon), item.title)
        )
      )
    ),
    m('.bs-callout',
      m('h4.mdc-typography--headline5', 'Translated Language'),
      state.translated_language.map((item) =>
        m('label.s-label', {onupdate: onupdate(item)},
          m('.mdc-radio',
            m('input.mdc-radio__native-control', {
              type: 'radio', name: 'translated_language',
              checked: item.checked && 'checked',
              onchange: events.option('translated_language', item)
            }),
            m('.mdc-radio__background',
              m('.mdc-radio__outer-circle'),
              m('.mdc-radio__inner-circle'),
            ),
          ),
          m('span', m('em', item.icon), item.title)
        )
      )
    ),

    /* m('.bs-callout',
      m('h4.mdc-typography--headline5', 'Keyboard Shortcut'),

      state.screenshot &&
      m('p', 'screenshot ', m('code', state.screenshot)),
      !state.screenshot &&
      m('p', 'Screenshot :No Keyboard Shortcut set'),
      m('button.mdc-button mdc-button--raised s-button', {
        oncreate: oncreate.ripple,
//        onclick: events.button('screenshot')
        },
      ),
      state.closepage &&
      m('p', 'closepage ', m('code', state.closepage)),
      !state.closepage &&
      m('p', 'Closepage :No Keyboard Shortcut set'),
      m('button.mdc-button mdc-button--raised s-button', {
        oncreate: oncreate.ripple,
//        onclick: events.button('closepage')
        },
      ),
      state.copytext &&
      m('p', 'copytext ', m('code', state.copytext)),
      !state.copytext &&
      m('p', 'Copytext :No Keyboard Shortcut set'),
      m('button.mdc-button mdc-button--raised s-button', {
        oncreate: oncreate.ripple,
 //      onclick: events.button('copytext')
        },'Update'
      )
    ), */

  ]
})
